import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { selectAllUsers } from '../users/usersApiSlice'
import { useSelector } from 'react-redux'
import useAuth from "../../hooks/useAuth"
import Modal from 'react-modal';
import Select from 'react-select';

const EditNoteForm = ({ note }) => {

    const { email, isManager, isAdmin } = useAuth()
    const users = useSelector(selectAllUsers)

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)
   // const [userEmailsSelected, setUserEmailsSelected]= useState(note.emails)
   // const [userEmailsSelected, setUserEmailsSelected]= useState([])
    const [userIdsSelected, setUserIdsSelected]= useState(note.user)
   
    const [showUserModal, setShowUserModal] = useState(false);

    useEffect(() => {
       if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            setUserIdsSelected([])
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    
    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map((user) => ({
        value: user.id,
        label: user.email,
        id: user.id,
      }));
//original
//   const assignedUsersList = (
//     <div>
//     {userEmailsSelected?.length > 0 ? (
//     userEmailsSelected.map((userEmail) => (
//     <div key={userEmail}>
//     <span>{userEmail}</span>
//     {isAdmin || isManager ? (
//     <button
//     className="delete-btn"
//     onClick={() => handleUnselectUser(userEmail)}
//     >
//     x
//     </button>
//     ) : null}
//     </div>
//     ))
//     ) : (
//     <div>No users assigned</div>
//     )}
//     </div>
//     );

/////////////////
//   const assignedUsersList = (
//     <div>
//     {userIdsSelected?.length > 0 ? (
//     userIdsSelected.map((userId) => (
//     <div key={userId}>
//     <span>{userEmail}</span>
//     {isAdmin || isManager ? (
//     <button
//     className="delete-btn"
//     onClick={() => handleUnselectUser(userEmail)}
//     >
//     x
//     </button>
//     ) : null}
//     </div>
//     ))
//     ) : (
//     <div>No users assigned</div>
//     )}
//     </div>
//     );
///////////////////
const assignedUsersList = (
    <div>
      {userIdsSelected?.length > 0 ? (
        userIdsSelected.map((userId) => {
          const user = users.find((user) => user.id === userId);
          return (
            <div key={userId}>
              <span>{user.email}</span>
              {isAdmin || isManager ? (
                <button
                  className="delete-btn"
                  onClick={() => handleUnselectUser(userId)}
                >
                  x
                </button>
              ) : null}
            </div>
          );
        })
      ) : (
        <div>No users assigned</div>
      )}
    </div>
  );
// const assignedUsersList = (
//     <div>
//       {users.map((user) => {
//         if (user.id === note.user) {
//           return (
//             <div key={user.id}>
//               <span>{user.email}</span>
//             </div>
//           )
//         }
//       })}
//     </div>
//   );

// const assignedUsersList = (
//     <div>
//       {userEmailsSelected?.length > 0 ? (
//         userEmailsSelected.map((userEmail) => {
//           const user = users.find((user) => user.id === userEmail);
//           return (
//             <div key={userEmail}>
//               {/* <span>{user.email}</span>
//               */}
//               <span>{userEmail}</span>
             
             
//               {isAdmin || isManager ? (
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleUnselectUser(userEmail)}
//                 >
//                   x
//                 </button>
//               ) : null}
//             </div>
//           );
//         })
//       ) : (
//         <div>No users assigned</div>
//       )}
//     </div>
//   );

//   const handleUserSelection = (selectedOptions) => {
//     const selectedUsers = selectedOptions.map((selectedOption) => selectedOption.value);
//     setUserEmailsSelected(selectedUsers);
//     };

//     const handleUnselectUser = (userEmail) => {
//        setUserEmailsSelected((prev) => prev.filter((email) => email !== userEmail));
//         };
///////////////////////////////////
const handleUserSelection = (selectedOptions) => {
    const selectedUsers = selectedOptions.map((selectedOption) => selectedOption.value);
    setUserIdsSelected(selectedUsers);
    };

    const handleUnselectUser = (userIds) => {
       setUserIdsSelected((prev) => prev.filter((singleId) => singleId !== userIds));
        };

    // const handleUnselectUser = (userEmail) => {
    //     setUserEmailsSelected((prev) => {
    //       const updatedSelectedUsers = prev.filter((userId) => {
    //         const user = users.find((user) => user.id === userId);
    //         return user.email !== userEmail;
    //    // return email !== userEmail;
            
    //     });
    //       return updatedSelectedUsers;
    //     });
    //   };
        const canSave = [title, text, userId].every(Boolean) && !isLoading

        const onSaveNoteClicked = async (e) => {
            if (canSave) {
                await updateNote({ id: note.id, user: userIdsSelected, title, text, completed })
            }
        }
    
        const onDeleteNoteClicked = async () => {
            await deleteNote({ id: note.id })
        }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Note #{note.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="note-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="note-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="note-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="note-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="note-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <div className="form-item">
                        <label htmlFor="note-assigned-users">Assigned users:</label>
                        <button onClick={() => setShowUserModal(true)}>Assign users</button>
                        </div>
                        {assignedUsersList}
                        

{showUserModal && (
    <Modal
      isOpen={showUserModal}
      onRequestClose={() => setShowUserModal(false)}
    >    <h2>Assign users</h2>
    <Select
      options={options}
      isMulti
      closeMenuOnSelect={false}
      onChange={handleUserSelection}
      defaultValue={options.filter((option) =>
        userIdsSelected.includes(option.value)
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

export default EditNoteForm