import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let isEmployee = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { email, name, roles } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')
        isEmployee = roles.includes('Employee')
        if (isEmployee) status = "Employee"
        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { email, name, roles, status, isManager, isAdmin, isEmployee }
    }

    return { email: '', name:'', roles: [], isManager, isAdmin, isEmployee, status }
}
export default useAuth