import { useState, useEffect } from "react"
import { useUpdateNoticeMutation, useDeleteNoticeMutation } from "./noticesApiSlice"
//import  CreateNotice  from "./CreateNotice";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { selectAllEmployees } from '../employees/employeesApiSlice'
import { useSelector } from 'react-redux'
import useAuth from "../../hooks/useAuth"
import Modal from 'react-modal';
import Select from 'react-select';

Modal.setAppElement('#root');

const EditNoticeForm = ({ notice }) => {

    const { email, isManager, isAdmin } = useAuth()
    const employees = useSelector(selectAllEmployees)

    const [updateNotice, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoticeMutation()

    const [deleteNotice, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoticeMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(notice.title)
    const [category, setCategory] = useState(notice.category);
    const [description, setDescription] = useState(notice.description);
    const [completed, setCompleted] = useState(notice.completed)
    const [employeeId, setEmployeeId] = useState(notice.members)
   // const [userEmailsSelected, setUserEmailsSelected]= useState(notice.emails)
   // const [userEmailsSelected, setUserEmailsSelected]= useState([])
    const [employeeIdsSelected, setEmployeeIdsSelected]= useState(notice.members)
   
    const [showUserModal, setShowUserModal] = useState(false);

    useEffect(() => {
       if (isSuccess || isDelSuccess) {
            setTitle('')
            setCategory('')
            setDescription('')
            setEmployeeId('')
            setEmployeeIdsSelected([])
            navigate('/dash/notices')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    
    const created = new Date(notice.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(notice.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = employees.map((user) => ({
        value: user.id,
        label: user.email,
        id: user.id,
      }));

      const assignedEmployeesList = (
    <div>
      {employeeIdsSelected?.length > 0 ? (
        employeeIdsSelected.map((employeeId) => {
          const user = employees.find((user) => user.id === employeeId);
          return (
            <div key={employeeId}>
              <span>{user.email}</span>
              {isAdmin || isManager ? (
                <button
                  className="delete-btn"
                  onClick={() => handleUnselectUser(employeeId)}
                >
                  x
                </button>
              ) : null}
            </div>
          );
        })
      ) : (
        <div>No employees assigned</div>
      )}
    </div>
  );
const handleUserSelection = (selectedOptions) => {
    const selectedEmployees = selectedOptions.map((selectedOption) => selectedOption.value);
    setEmployeeIdsSelected(selectedEmployees);
    };

    const handleUnselectUser = (employeeIds) => {
       setEmployeeIdsSelected((prev) => prev.filter((singleId) => singleId !== employeeIds));
        };

        const handleNotice = () =>{
           navigate(`/dash/notices/noticeList`); 
          // <CreateNotice />

           }

            // <Notice key={noticeId} noticeId={noticeId} />
      
      const canSave = [title, description, employeeId].every(Boolean) && !isLoading

        const onSaveNoticeClicked = async (e) => {
            if (canSave) {
                await updateNotice({ id: notice.id, title, description, category, members: employeeIdsSelected,  completed })
            }
        }
    
        const onDeleteNoticeClicked = async () => {
            await deleteNotice({ id: notice.id })
        }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteNoticeClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>
           <button
               className="icon-button table__button"
               onClick={handleNotice} >
                {/* // <CreateNotice noticeId={notice.id} />  */}
               <FontAwesomeIcon icon={<button
               className="icon-button table__button"
               onClick={handleNotice} >
               <FontAwesomeIcon icon={faPenToSquare} />
             </button>} />
             </button> 
                    
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Notice #{notice.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveNoticeClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="notice-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="notice-title"
                    name="title"
                    type="description"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="notice-category">
                Category:</label>
                <select name="category" onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="iphone">Cleaning Service</option>
          <option value="samsung">Dish Washing Service</option>
          <option value="xiomi">Cooking Service</option>
            </select>

                <label className="form__label" htmlFor="notice-description">
                    Description:</label>
                <textarea
                    className={`form__input form__input--description ${validDescriptionClass}`}
                    id="notice-description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="notice-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="notice-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <div className="form-item">
                        <label htmlFor="notice-assigned-employees">Assigned employees:</label>
                        <button onClick={() => setShowUserModal(true)}>Assign employees</button>
                        </div>
                        {assignedEmployeesList}
                        

{showUserModal && (
    <Modal
      isOpen={showUserModal}
      onRequestClose={() => setShowUserModal(false)}
    >    <h2>Assign employees</h2>
    <Select
      options={options}
      isMulti
      closeMenuOnSelect={false}
      onChange={handleUserSelection}
      defaultValue={options.filter((option) =>
        employeeIdsSelected.includes(option.value)
      )}
    />
    <button onClick={() => setShowUserModal(false)}>Close</button>
  </Modal>
)}

                    </div>
             
             
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditNoticeForm
