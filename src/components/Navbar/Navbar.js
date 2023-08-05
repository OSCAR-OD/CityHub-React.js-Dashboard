import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentTheme, setTheme } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faBars,
	faMoon,
	faSun,
	faMagnifyingGlass,
	faBell,
	faUserGear,
    } from "@fortawesome/free-solid-svg-icons"
	import { useGetNoticesForEmployeeQuery } from "../../features/notices/noticesApiSlice";
	import Notice from "../../features/notices/Notice";
  import { useGetProfileQuery} from '../../features/users/usersApiSlice'
  import { setProfilePic } from '../../features/auth/authSlice'

  import useAuth from "../../hooks/useAuth";
  import { useNavigate } from 'react-router-dom'

const Navbar = () => {
	const { email } = useAuth();
	const [selectedNotice, setSelectedNotice] = useState(null);
	const [newNoticeCount, setNewNoticeCount] = useState(0);
  const [showAllNotices, setShowAllNotices] = useState(false); // Track the state of showing all notices

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data: profileData, isError: isProfileError } = useGetProfileQuery()
  const defaultImageUrl = "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-27.jpg";
  const imageUrl = profileData ? profileData.image : defaultImageUrl;

  useEffect(() => {
    if (profileData) {
      // Extract the image URL from the profile data
      //const defaultImageUrl = "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-27.jpg";
  
     // const imageUrl = profileData.imageUrl
      //const imageUrl = profileData ? profileData.image : defaultImageUrl;

      //https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-27.jpg
      // Dispatch the action to set the profile pic in the store
      dispatch(setProfilePic({ imageUrl }))
    }
  }, [profileData, dispatch])

const {
    data: notices,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useGetNoticesForEmployeeQuery("noticesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess && notices && notices.entities) {
      const newNotices = Object.values(notices.entities).filter(
        (notice) => notice.isNew
      );
      setNewNoticeCount(newNotices.length);
    }
  }, [isSuccess, notices]);

	const [notificationExpanded, setNotificationExpanded] = useState(false);
	const [userMenuExpanded, setUserMenuExpanded] = useState(false);
  
	const handleNotificationToggle = () => {
		setNotificationExpanded(!notificationExpanded);
		setUserMenuExpanded(false);
	  };
	
	  const handleUserMenuToggle = () => {
		setUserMenuExpanded(!userMenuExpanded);
		setNotificationExpanded(false);
	  }
	  const collapseSidebar= ()=> {
		document.body.classList.toggle('sidebar-expand');
	  }
     const mode = useSelector(selectCurrentTheme);
	 
	  useEffect(() => {
		document.body.className = mode;
	  }, [mode]);

  function handleToggleTheme() {
			const newTheme = mode === 'light' ? 'dark' : 'light';
			dispatch(setTheme(newTheme));
		  }
		  const handleNoticeClick = (noticeId) => {
			setSelectedNotice(noticeId);
      navigate(`/dash/notices/${noticeId}`)
      setNotificationExpanded(!notificationExpanded);
   
    };
      const handleShowAllNotices = () => {
        //for showing all notices in the dropdown with setShowAllNotices
       // setShowAllNotices(true);
     navigate ("/dash/teams/noticeList");
     setNotificationExpanded(!notificationExpanded);
    };
      if (isLoading) {
        return <p>Loading...</p>;
      }
		  else if (isSuccess && email) {
			const { ids, entities } = notices;
			const filteredIds = [...ids];
     
      filteredIds.sort((a, b) => {
        const noticeA = entities[a];
        const noticeB = entities[b];
        return noticeB.createdAt - noticeA.createdAt;
      });
      filteredIds.reverse();
      
    const displayedNoticeIds = showAllNotices ? filteredIds : filteredIds.slice(0, 6);
    const remainingNoticeCount = filteredIds.length - displayedNoticeIds.length;

    const dropdownContent = (
      <>
        {displayedNoticeIds.length > 0 ? (
          displayedNoticeIds.map((noticeId) => (
            <li className="dropdown-menu-item" key={noticeId}>
              <a href="#" className="dropdown-menu-link" onClick={() => handleNoticeClick(noticeId)}>
                <div>
                  <FontAwesomeIcon icon={faSun} className="nv" />
                </div>
                <span>{entities[noticeId].title}</span>
              </a>
            </li>
          ))
        ) : (
          <li className="dropdown-menu-item">
            <span>No Notice found</span>
          </li>
        )}
    
        {remainingNoticeCount > 0 && (
          <div className="show-all" onClick={handleShowAllNotices}>
            Show All ({remainingNoticeCount} more)
          </div>
        )}
      </>
    );
// 			const dropdownContent =(
//       <>
//       {displayedNoticeIds.map((noticeId) => (
       
//  //filteredIds.length > 0 ? (
//   //filteredIds.map((noticeId) => (
// 	<li className="dropdown-menu-item" key={noticeId}>
// 	<a href="#" className="dropdown-menu-link" onClick={() => handleNoticeClick(noticeId)}>
// 	  <div>
// 		<FontAwesomeIcon icon={faSun} className="nv" />
// 	  </div>
// 	  <span>{entities[noticeId].title}</span>
// 	</a>
//   </li>
// 	 ))}
//    {remainingNoticeCount > 0 && (
//      <div className="show-all" onClick={handleShowAllNotices}>
//        Show All ({remainingNoticeCount} more)
//      </div>
//    )}
//  </>
// );
		  
    return (
        <>
        <div className="navbar">
		
		<ul className="navbar-nav">
			<li className="nav-item">
				<a className="nav-link">
				<FontAwesomeIcon icon={faBars}  onClick={collapseSidebar} className="nv" />
					</a>
			</li>
			<li className="nav-item">
				<img src="img/CITYHUB.png" alt="CITYHUB" className="logo logo-light" />
				<img src="img/CITYHUB.png" alt="CITYHUB" className="logo logo-dark" />
			</li>
		</ul>
		<form className="navbar-search">
			<input type="text" name="Search" className="navbar-search-input" placeholder="What you looking for..." />
			<FontAwesomeIcon icon={faMagnifyingGlass} className="nv"/>
				</form>
				<ul className="navbar-nav nav-right">
			<li className="nav-item mode">
			 <a className="nav-link" href="#" onClick={handleToggleTheme} >
			 {mode === "light" ? (
				<FontAwesomeIcon icon={faMoon} className="nv" />
      ) : (
			<FontAwesomeIcon icon={faSun} className="nv" />
	  	)}
			</a>
			</li>
			
		<li className="nav-item avt-wrapper">
       <a className="nav-link"  onClick={handleNotificationToggle}
             >
				<FontAwesomeIcon icon={faBell} 
				/>
          {newNoticeCount > 0 && (
            <span className="navbar-badge">{newNoticeCount}</span>
          )}
			{/* <span class="navbar-badge">15</span> */}
      </a>
	

        {notificationExpanded && (
      <ul id="user-menu-notification" className="dropdown-menu" style={{ display: 'block' }}>
        {dropdownContent}
	 </ul>
        )} 
      {/* </div> */}
    </li>
	<li className="nav-item avt-wrapper">
      <div className="avt dropdown" role="button" tabIndex="0">
        <img
          src={imageUrl}
          alt="User image"
          className="dropdown-toggle"
		  //onToggle={handleUserMenuToggle}
		  //onClick={handleDropdownClose}
          onClick={handleUserMenuToggle}
        />

        {userMenuExpanded && (
          <ul id="user-menu" className="dropdown-menu" style={{ display: 'block' }}>
            <li className="dropdown-menu-item">
              <a className="dropdown-menu-link">
                <div>
                  <FontAwesomeIcon icon={faSun} className="nv" />
                </div>
                <span>Profile</span>
              </a>
            </li>
            <li className="dropdown-menu-item">
              <a href="#" className="dropdown-menu-link">
                <div>
                  <FontAwesomeIcon icon={faSun} className="nv" />
                </div>
                <span>Settings</span>
              </a>
            </li>
            <li className="dropdown-menu-item">
              <a href="#" className="dropdown-menu-link">
                <div>
                  <FontAwesomeIcon icon={faSun} className="nv" />
                </div>
                <span>Payments</span>
              </a>
            </li>
            <li className="dropdown-menu-item">
              <a href="#" className="dropdown-menu-link">
                <div>
                  <FontAwesomeIcon icon={faSun} className="nv" />
                </div>
                <span>Projects</span>
              </a>
            </li>
            <li className="dropdown-menu-item">
              <a href="#" className="dropdown-menu-link">
                <div>
                  <FontAwesomeIcon icon={faSun} className="nv" />
                </div>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </li>
		</ul>
	</div>
    </>
    );
		}
}

export default Navbar
