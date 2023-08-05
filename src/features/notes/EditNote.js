import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
//import { selectAllUsers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'
import useAuth from "../../hooks/useAuth";

const EditNote = () => {
    const { id } = useParams()

    const note = useSelector(state => selectNoteById(state, id))
    const user = useAuth()

    //  const users = useSelector(selectAllUsers)

    const content = note && user.email ? <EditNoteForm note={note} /> : <p>Loading...</p>

    return content
}
export default EditNote