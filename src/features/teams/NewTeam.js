import { useSelector } from 'react-redux'
import { selectAllEmployees } from '../employees/employeesApiSlice'
import NewTeamForm from './NewTeamForm'

const NewTeam = () => {
    const employees = useSelector(selectAllEmployees)

    if (!employees?.length) return <p>Not Currently Available</p>

    const content = <NewTeamForm employees={employees} />

    return content
}
export default NewTeam