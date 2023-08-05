import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import Modal from 'react-modal';
import Select from 'react-select';

const NewNoteForm = ({ users }) => {
    const user = useAuth();
    const [addNewNote, {
    isLoading,
    isSuccess,
    isError,
    error
    }] = useAddNewNoteMutation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userIds, setUserIds] = useState([users[0].id]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    useEffect(() => {
        if (isSuccess) {
            setTitle('');
            setText('');
            setUserIds([users[0].id]);
            navigate('/dash/notes');
        }
    }, [isSuccess, navigate, users]);
    
    const onTitleChanged = e => setTitle(e.target.value);
    const onTextChanged = e => setText(e.target.value);
    const onUserIdChanged = selectedOptions => {
        setUserIds(selectedOptions.map(option => option.value));
    };
    const canSave = [title, text, ...userIds].every(Boolean) && userIds.length >= 2 && !isLoading;
    
    const onSaveNoteClicked = async e => {
        e.preventDefault();
        if (canSave) {
            await addNewNote({
                user: userIds,
                title,
                text
            });
        }
    };
    
    const options = users.map(user => ({
        value: user.id,
        label: user.email
    }));
    
    const errClass = isError ? "errmsg" : "offscreen";
    const validTitleClass = !title ? "form__input--incomplete" : "";
    const validTextClass = !text ? "form__input--incomplete" : "";
    
    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
    
            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>New Note</h2>
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
                    Text:
                </label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
    
                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:
                </label>
                <div>
                    <button onClick={() => setModalIsOpen(true)}>Assign Users</button>
                    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                        <Select className="Select" 
                            isMulti
                            options={options}
                            value={userIds.map(id => options.find(option => option.value === id))}
                            onChange={onUserIdChanged}
                        />
                        <button onClick={() => setModalIsOpen(false)}>Done</button>
                    </Modal>
                </div>
            </form>
        </>
    );
    return <div className="note-form">{content}</div>;
    };
    
    export default NewNoteForm;