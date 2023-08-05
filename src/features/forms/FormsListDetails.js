import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectFormById } from './formApiSlice'
//like team
const FormsListDetails = ({ formId }) => {

    const form = useSelector(state => selectFormById(state, formId))

    const navigate = useNavigate()
    //console.log("fname",form.billFirstName);
    if (form) {
        const created = new Date(form.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(form.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/forms/${formId}`)

        return (
            <tr className="table__row">
                <td className="table__cell form__status">
                    {form.completed
                        ? <span className="form__status--completed">Completed</span>
                        : <span className="form__status--open">Open</span>
                    }
                </td>
                <td className="table__cell form__created">{created}</td>
                <td className="table__cell form__updated">{updated}</td>
                <td className="table__cell form__title">{form.billFirstName}</td>
                <td className="table__cell form__username">
                   {form.emails}
                </td>
                {/* ok for single , but not for multiple emails, 
                //in form.name only 1 name is shows
                 <td className="table__cell form__username">{form.email}
                </td>
              */}
                {/* ok for single and multiple ids, but not mining full 
                <td className="table__cell form__username">{form.id}</td>
              */}
                {/* <td className="table__cell form__username">
                 {form.id.map((id, index) => (
                    <span key={index}>{id}{index !== form.id.length - 1 ? ', ' : ''}</span>
                    ))}
                </td> */}
                {/* <td className="table__cell form__username">
                 {form.email.map((email, index) => (
                    <span key={index}>{email}{index !== form.email.length - 1 ? ', ' : ''}</span>
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
export default FormsListDetails