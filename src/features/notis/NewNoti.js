import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNotiForm from './NewNotiForm'

const NewNoti = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewNotiForm users={users} />

    return content
}
export default NewNoti