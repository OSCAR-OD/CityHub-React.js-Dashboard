import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'

const Note = ({ noteId }) => {

    const note = useSelector(state => selectNoteById(state, noteId))

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                    {note.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__title">{note.title}</td>
                <td className="table__cell note__username">
                   {note.emails}
                </td>
                {/* ok for single , but not for multiple emails, 
                //in note.name only 1 name is shows
                 <td className="table__cell note__username">{note.email}
                </td>
              */}
                {/* ok for single and multiple ids, but not mining full 
                <td className="table__cell note__username">{note.id}</td>
              */}
                {/* <td className="table__cell note__username">
                 {note.id.map((id, index) => (
                    <span key={index}>{id}{index !== note.id.length - 1 ? ', ' : ''}</span>
                    ))}
                </td> */}
                {/* <td className="table__cell note__username">
                 {note.email.map((email, index) => (
                    <span key={index}>{email}{index !== note.email.length - 1 ? ', ' : ''}</span>
                    ))}
                </td> */}
                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Note