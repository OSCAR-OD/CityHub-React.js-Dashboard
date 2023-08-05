import { Routes, Route } from 'react-router-dom'
import Registration from './features/auth/Registration';
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Dashboard from './pages/Dashboard'
//user
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditProfile from './features/profile/EditProfile'
import CreateProduct from './features/profile/CreateProduct'
///employee
import EmployeesList from './features/employees/EmployeesList'
import EditEmployee from './features/employees/EditEmployee'
import NewEmployeeForm from './features/employees/NewEmployeeForm'

///teams
import TeamsList from './features/teams/TeamsList'
import EditTeam from './features/teams/EditTeam'
import NewTeam from './features/teams/NewTeam'

//notice
import CreateNotice from './features/notices/CreateNotice'
import NoticeList from './features/notices/NoticeList'
import EditNotice from './features/notices/EditNotice'

///posts
import CreatePost from './features/posts/CreatePost'

/////
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
//form
import FormHome from "./components/Form/FormHome"
import FormsList from './features/forms/FormsList'
import FormDetails from './features/forms/FormDetails'
//import NewTeam from './features/teams/NewTeam'

// import NultiPageForm from './features/forms/NewForm'
// import MultiPageForm from './features/gforms/Form'

//import TeamsPage from './pages/TeamsPage'
import Forgot from './features/auth/Forgot';
import ResetPassword from './features/auth/ResetPassword';

//sidebar

function App() {
  return (
    <Routes>
       <Route path="/" element={<Layout />}>
          {/* public routes */}
        <Route index element={<Login />} />
        {/* <Route path="login" element={<Login />} /> */}

      
        <Route path="registration" element={<Registration />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="resetPassword/:resetToken" element={<ResetPassword />} />
       
        {/* <Route path="MewForm" element={<NultiPageForm />} />
        <Route path="NewForm" element={<MultiPageForm />} />
        <Route path="forms" element={<FormHome />} />
                  */}
                  
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
        
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

               <Route index element={<Dashboard />} />
                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                <Route path="manager">
                    {/* <Route index element={<UsersList />} />
                    */}
                    {/* <Route path=":id" element={<EditUser />} />
                    <Route path="addUser" element={<NewUserForm />} /> */}
                  {/* <Route index element={<NewTeam />} />
                   */}
                    <Route path="addTeam" element={<NewTeam />} />
                    <Route path="usersList" element={<UsersList />} />
                   
                   </Route>
                </Route>
                {/* employee */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="employees">
                    <Route index element={<EmployeesList />} />
                    <Route path=":id" element={<EditEmployee />} />
                    <Route path="newemployee" element={<NewEmployeeForm />} />
               </Route>

                </Route>

             
                <Route path="editProfile" element={<EditProfile />} />
                <Route path="createProduct" element={<CreateProduct />} />
                
               <Route path="teams">
                  <Route index element={<TeamsList />} />
                  <Route path=":id" element={<EditTeam />} />
                <Route path="noticeList" element={<NoticeList />} /> 
                
                 </Route>
                 
                 <Route path="notices">
                 <Route path="createNotice" element={<CreateNotice />} /> 
                 <Route path=":id" element={<EditNotice />} />
                 
                 </Route>

                 <Route path="posts">
                 <Route path="createPost" element={<CreatePost />} /> 
                 {/* <Route path=":id" element={<EditNotice />} />
                  */}
                 </Route>
              
                <Route path="forms">
                <Route index element={<FormHome />} />
                <Route path="formsList" element={<FormsList />} /> 
                {/* <Route path="formDetails" element={<FormDetails />} /> 
             */}
              <Route path=":id" element={<FormDetails />} /> 
            
                
                  </Route> 

                  

              </Route>{/* End Dash */}
            </Route>
      
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;
