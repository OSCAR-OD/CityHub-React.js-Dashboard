import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTeamById } from './teamsApiSlice'
//import { selectAllTeams } from '../teams/teamsApiSlice'
import EditTeamForm from './EditTeamForm'
import useAuth from "../../hooks/useAuth";

const EditTeam = () => {
    const { id } = useParams()

    const team = useSelector(state => selectTeamById(state, id))
    const employee = useAuth()

    //  const teams = useSelector(selectAllTeams)

    const content = team && employee.email ? <EditTeamForm team={team} /> : <p>Loading...</p>

    return content
}
export default EditTeam