import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Dashboard = () => {

    const { name, isManager, isAdmin, isEmployee } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {name}!</h1>
             <p><Link to="/dash/forms">View Forms</Link></p>
             <p><Link to="/dash/editProfile">View Profile</Link></p>
             {(isManager || isAdmin || isEmployee) && <p><Link to="/dash/teams">View Teams</Link></p>}
             {(isManager || isAdmin) &&<p><Link to="/dash/teams/new">Add New Team</Link></p>}
             {(isManager || isAdmin) && <p><Link to="/dash/users">View Users</Link></p>}
             {(isManager || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}
             {(isManager || isAdmin) && <p><Link to="/dash/employees">View employees</Link></p>}
             {(isManager || isAdmin) && <p><Link to="/dash/employees/new">Add New Employee</Link></p>}
             {(isManager || isAdmin) && <p><Link to="/dash/posts/createPost">Create Post</Link></p>}
        </section>
    )

    return content
}
export default Dashboard