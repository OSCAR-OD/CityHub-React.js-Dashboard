import { Outlet } from 'react-router-dom'
//import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import Sidebar from './Sidebar/Sidebar'
import Navbar from './Navbar/Navbar'
const DashLayout = () => {
    return (
        <>
            {/* <DashHeader /> */}
            <Sidebar />
            <Navbar />
            <div className="overlay-scrollbar wrapper" >
                <Outlet />
                <DashFooter />
            </div>
          
        </>
    )
}
export default DashLayout