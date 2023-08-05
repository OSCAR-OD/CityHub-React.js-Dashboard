import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewTeamMutation } from "./teamsApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import Modal from 'react-modal';
import Select from 'react-select';

const NewTeamForm = ({ employees }) => {
    const employee = useAuth();
    const [addNewTeam, {
    isLoading,
    isSuccess,
    isError,
    error
    }] = useAddNewTeamMutation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
   const [category, setCategory] = useState("");
   const [description, setDescription] = useState('');
   const [employeeIds, setEmployeeIds] = useState([employees[0].id]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    useEffect(() => {
        if (isSuccess) {
            setTitle('');
            setDescription('');
            setCategory('');
            setEmployeeIds([employees[0].id]);
            navigate('/dash/teams');
        }
    }, [isSuccess, navigate, employees]);
    
    const onTitleChanged = e => setTitle(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onEmployeeIdChanged = selectedOptions => {
        setEmployeeIds(selectedOptions.map(option => option.value));
    };

    const canSave = [title, category,description, ...employeeIds].every(Boolean) && employeeIds.length >= 2 && !isLoading;
    
    const onSaveTeamClicked = async e => {
        e.preventDefault();
        if (canSave) {
            await addNewTeam({
                title,
                category,
                description,
                members: employeeIds,
            });
        }
    };
    
    const options = employees.map(employee => ({
        value: employee.id,
        label: employee.email
    }));
    
    const errClass = isError ? "errmsg" : "offscreen";
    const validTitleClass = !title ? "form__input--incomplete" : "";
    const validDescriptionClass = !description ? "form__input--incomplete" : "";
    
    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
    
            <form className="form" onSubmit={onSaveTeamClicked}>
                <div className="form__title-row">
                    <h2>New Team</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:
                </label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />
    
                 <label className="form__label" htmlFor="text">
                   Catagory
                </label>
            <select name="category" onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="iphone">Cleaning Service</option>
          <option value="samsung">Dish Washing Service</option>
          <option value="xiomi">Cooking Service</option>
        </select>

        <label className="form__label" htmlFor="description">
                description
                </label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />
                <label className="form__label form__checkbox-container" htmlFor="employeename">
                    ASSIGNED TO:
                </label>
                <div>
                    <button onClick={() => setModalIsOpen(true)}>Assign Employees</button>
                    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                        <Select className="Select" 
                            isMulti
                            options={options}
                            value={employeeIds.map(id => options.find(option => option.value === id))}
                            onChange={onEmployeeIdChanged}
                        />
                        <button onClick={() => setModalIsOpen(false)}>Done</button>
                    </Modal>
                </div>
            </form>
        </>
   );
 
    return <div className="team-form">{content}</div>;
    };
    
    export default NewTeamForm;