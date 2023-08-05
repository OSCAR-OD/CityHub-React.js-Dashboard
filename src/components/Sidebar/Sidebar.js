import React from 'react'
import {useState, useEffect } from 'react'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket,
    faGauge,
    faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons"
 import './Sidebar.css'

const Sidebar = () => {

	const navigate = useNavigate()
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()
	const [activeItem, setActiveItem] = useState('dashboard');

	useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

	const handleItemClick = (item) => {
		setActiveItem(item);
	  };

	 return (
    <>
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            {/* <a href="#" className={`sidebar-nav-link${activeItem === 'dashboard' ? ' active' : ''}`} onClick={() => handleItemClick('dashboard')}> */}
            <Link to="/dash" className={`sidebar-nav-link${activeItem === 'dashboard' ? ' active' : ''}`} onClick={() => handleItemClick('dashboard')}>
            <div>
            <FontAwesomeIcon icon={faGauge} className="sb" />
                {/* <i className="fas fa-tachometer-alt"></i> */}
              </div>
              <span>
                Dashboard
              </span>
              </Link>
            {/* </a> */}
          </li>
          <li className="sidebar-nav-item">
            {/* <a href="#" className={`sidebar-nav-link${activeItem === 'item1' ? ' active' : ''}`} onClick={() => handleItemClick('item1')}> */}
            <Link to="/dash/editProfile" className={`sidebar-nav-link${activeItem === 'item2' ? ' active' : ''}`} onClick={() => handleItemClick('item2')}>
              <div>
                <FontAwesomeIcon icon={faUserGear} className="sb" />
              </div>
              <span>Profile</span>
            {/* </a> */}
            </Link>
          </li>
          <li className="sidebar-nav-item ">
          <Link to="/dash/teams" className={`sidebar-nav-link${activeItem === 'item3' ? ' active' : ''}`} onClick={() => handleItemClick('item3')}>
            {/* <Link to="/dash/editProfile" className={`sidebar-nav-link${activeItem === 'item2' ? ' active' : ''}`} onClick={() => handleItemClick('item2')}>
            */}

              <div>
              <FontAwesomeIcon icon={faPeopleGroup}  className="sb" />
              </div>
              <span>Teams</span>
            </Link> 
          </li>
          {/* Other sidebar items */}
          {/* ... */}
          <li className="sidebar-nav-item">
            {/* <a href="#" className="sidebar-nav-link"> */}
              
            <Link to="/" className={`sidebar-nav-link${activeItem === 'logout' ? ' active' : ''}`} onClick={() => handleItemClick('logout')}>
           
              <div>
                <FontAwesomeIcon icon={faRightFromBracket} className="sb" onClick={sendLogout} />
                {/* <i className="fas fa-book-open"></i> */}
              </div>
              <span>Logout</span>
      {/* </a> */}
      </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;