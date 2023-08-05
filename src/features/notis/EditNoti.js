import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notisApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditNotiForm from './EditNotiForm'

const EditNoti = () => {
    const { id } = useParams()

    const note = useSelector(state => selectNoteById(state, id))
    const users = useSelector(selectAllUsers)

    const content = note && users ? <EditNotiForm note={note} users={users} /> : <p>Loading...</p>

    return content
}
export default EditNoti