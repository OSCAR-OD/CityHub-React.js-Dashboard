import { store } from '../../app/store'
//import { notesApiSlice } from '../notes/notesApiSlice'
import { employeesApiSlice } from '../employees/employeesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { teamsApiSlice } from '../teams/teamsApiSlice';
import { noticesApiSlice } from '../notices/noticesApiSlice';
import { formApiSlice } from '../forms/formApiSlice';

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
       // console.log('subscribing')
       // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        //const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getProfile.initiate())
        const employees = store.dispatch(employeesApiSlice.endpoints.getEmployees.initiate())
        const teams = store.dispatch(teamsApiSlice.endpoints.getTeams.initiate())
        const notices = store.dispatch(noticesApiSlice.endpoints.getNoticesForEmployee.initiate())
        const forms = store.dispatch(formApiSlice.endpoints.getForms.initiate())
       
        
        return () => {
        //    notes.unsubscribe()
            users.unsubscribe()
            employees.unsubscribe()
            teams.unsubscribe()
            notices.unsubscribe()  
            forms.unsubscribe()         
        }
    }, [])

    return <Outlet />
}
export default Prefetch
