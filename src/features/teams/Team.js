import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectTeamById } from './teamsApiSlice'

const Team = ({ teamId }) => {

    const team = useSelector(state => selectTeamById(state, teamId))

    const navigate = useNavigate()

    if (team) {
        const created = new Date(team.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const updated = new Date(team.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const handleEdit = () => navigate(`/dash/teams/${teamId}`)

        const teamEmailsString = team.emails.toString().replaceAll(',', ', ')

        return (
            <tr className="table__row">
                <td className="table__cell team__status">
                    {team.completed
                        ? <span className="team__status--completed">Completed</span>
                        : <span className="team__status--open">Active</span>
                    }
                </td>
                <td className="table__cell team__created">{created}</td>
                <td className="table__cell team__updated">{updated}</td>
                <td className="table__cell team__title">{team.title}</td>
                <td className="table__cell team__userEmail">
                   {/* {team.emails} */}
                   {teamEmailsString}
                </td>
                {/* ok for single , but not for multiple emails, 
                //in team.name only 1 name is shows
                 <td className="table__cell team__username">{team.email}
                </td>
              */}
                {/* ok for single and multiple ids, but not mining full 
                <td className="table__cell team__username">{team.id}</td>
              */}
                {/* <td className="table__cell team__username">
                 {team.id.map((id, index) => (
                    <span key={index}>{id}{index !== team.id.length - 1 ? ', ' : ''}</span>
                    ))}
                </td> */}
                {/* <td className="table__cell team__username">
                 {team.email.map((email, index) => (
                    <span key={index}>{email}{index !== team.email.length - 1 ? ', ' : ''}</span>
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
export default Team