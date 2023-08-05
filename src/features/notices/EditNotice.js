import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoticeById } from './noticesApiSlice'
//import { selectAllNotices } from '../notices/noticesApiSlice'
import EditNoticeForm from './EditNoticeForm'
import useAuth from "../../hooks/useAuth";

const EditNotice = () => {
    const { id } = useParams()

    const notice = useSelector(state => selectNoticeById(state, id))
    const employee = useAuth()

    //  const notices = useSelector(selectAllNotices)

    const content = notice && employee.email ? <EditNoticeForm notice={notice} /> : <p>Loading...</p>

    return content
}
export default EditNotice