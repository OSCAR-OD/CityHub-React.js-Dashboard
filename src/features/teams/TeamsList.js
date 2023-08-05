// import { Link } from 'react-router-dom'
import { useGetTeamsQuery } from "./teamsApiSlice"
import Team from "./Team"
import useAuth from "../../hooks/useAuth"

const TeamsList = () => {

    const { email, isManager, isAdmin } = useAuth()

    const {
        data: teams,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTeamsQuery('teamsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true

    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = teams

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
           // filteredIds = ids.filter(teamId => entities[teamId].email === email)
         //  filteredIds = ids.filter(teamId => email.includes(entities[teamId].email))
         filteredIds = ids.filter(teamId => entities[teamId].emails.includes(email))
        }

        const tableContent = ids?.length && filteredIds.map(teamId => <Team key={teamId} teamId={teamId} />)

        content = (
            // <section className="welcome">
            // {(isManager || isAdmin) &&<p><Link to="/dash/teams/addteam">Add New Team</Link></p>}
           
            <table className="table table--teams">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th team__status">Status</th>
                        <th scope="col" className="table__th team__created">Created</th>
                        <th scope="col" className="table__th team__updated">Updated</th>
                        <th scope="col" className="table__th team__title">Title</th>
                        <th scope="col" className="table__th team__userEmail">Email</th>
                        <th scope="col" className="table__th team__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
            // </section>
        )
    }

    return content
}
export default TeamsList