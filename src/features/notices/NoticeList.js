import { useState, useEffect } from "react";
import { useGetNoticesForEmployeeQuery } from "./noticesApiSlice";
import Notice from "./Notice";
import useAuth from "../../hooks/useAuth";
import "./NoticesList.css";

const NoticesList = () => {
  const { email } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newNoticeCount, setNewNoticeCount] = useState(0);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllNotices, setShowAllNotices] = useState(false); // Track the state of showing all notices

  const {
    data: notices,
    isSuccess,
    isError,
    error,
   
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

  const handleDropdownToggle = () => {
    if (!isLoading) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleNoticeClick = (noticeId) => {
    setSelectedNotice(noticeId);
  };

  const handleShowAllNotices = () => {
    setShowAllNotices(true);
 //navigate to ush("/notices");see all notices
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  } else if (isSuccess && email) {
    const { ids, entities } = notices;

    let filteredIds = [...ids];

    // Sort the notice IDs based on creation date (newest to oldest)
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
        {displayedNoticeIds.map((noticeId) => (
          <div
            key={noticeId}
            className="dropdown-item"
            onClick={() => handleNoticeClick(noticeId)}
          >
            <div className="title">{entities[noticeId].title}</div>
            <div className="creation-date">
              Creation Date:{" "}
              {new Date(entities[noticeId].createdAt).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </div>
          </div>
        ))}
        {remainingNoticeCount > 0 && (
          <div className="show-all" onClick={handleShowAllNotices}>
            Show All ({remainingNoticeCount} more)
          </div>
        )}
      </>
    );
    content = (
      <>
        <button className="dropdown-toggle" onClick={handleDropdownToggle}>
          Show Notices
          {newNoticeCount > 0 && (
            <span className="new-notice-count">{newNoticeCount}</span>
          )}
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {dropdownContent}
          </div>
        )}
         {dropdownContent}
        {Object.values(entities).length > 0 ? (
          filteredIds.map((noticeId) => (
            <Notice key={noticeId} noticeId={noticeId} />
          ))
        ) : (
          <p>No notices found</p>
        )}
      </>
    );
  }

  return content;
};

export default NoticesList;

///////////////
//show all above
// import { useState, useEffect } from "react";
// import { useGetNoticesForEmployeeQuery } from "./noticesApiSlice";
// import Notice from "./Notice";
// import useAuth from "../../hooks/useAuth";
// import "./NoticesList.css";

// const NoticesList = () => {
//   const { email } = useAuth();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [newNoticeCount, setNewNoticeCount] = useState(0);
//   const [selectedNotice, setSelectedNotice] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     data: notices,
//     isSuccess,
//     isError,
//     error,
//   } = useGetNoticesForEmployeeQuery("noticesList", {
//     pollingInterval: 15000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true,
//   });

//   useEffect(() => {
//     if (isSuccess && notices && notices.entities) {
//       const newNotices = Object.values(notices.entities).filter(
//         (notice) => notice.isNew
//       );
//       setNewNoticeCount(newNotices.length);
//     }
//   }, [isSuccess, notices]);

//   const handleDropdownToggle = () => {
//     if (!isLoading) {
//       setIsDropdownOpen(!isDropdownOpen);
//     }
//   };

//   const handleNoticeClick = (noticeId) => {
//     setSelectedNotice(noticeId);
//   };
  
//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   let content;

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   } else if (isError) {
//     content = <p className="errmsg">{error?.data?.message}</p>;
//   } else if (isSuccess && email) {
//     const { ids, entities } = notices;
//    // const filteredIds = [...ids];

//     const filteredIds = [...ids].sort((a, b) => {
//       const noticeA = entities[a];
//       const noticeB = entities[b];
//       return noticeB.createdAt - noticeA.createdAt;
//     });

//     const displayedNoticeIds = showAllNotices ? filteredIds : filteredIds.slice(0, 6);
// const remainingNoticeCount = filteredIds.length - displayedNoticeIds.length;

//     const dropdownContent =
//     ({displayedNoticeIds.map((noticeId) => (
   
//     // filteredIds.length > 0 ? (
//       //  filteredIds.map((noticeId) => (
        
//       <div
//             key={noticeId}
//             className="dropdown-item"
//             onClick={() => handleNoticeClick(noticeId)}
//           >
//             <div className="title">{entities[noticeId].title}</div>
//             <div className="creation-date">
//               Creation Date:{" "}
//               {new Date(entities[noticeId].createdAt).toLocaleString("en-US", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//                 hour: "numeric",
//                 minute: "numeric",
//                 second: "numeric",
//               })}
//             </div>
//           </div>
//         ))}
//         {remainingNoticeCount > 0 && (
//           <div className="show-all" onClick={handleShowAllNotices}>
//             Show All ({remainingNoticeCount} more)
//           </div>
//         )}
//       ) : (
//         <div className="dropdown-item">
//           No notices found
//         </div>
//       );

//     content = (
//       <>
//         <button className="dropdown-toggle" onClick={handleDropdownToggle}>
//           Show Notices
//           {newNoticeCount > 0 && (
//             <span className="new-notice-count">{newNoticeCount}</span>
//           )}
//         </button>
//         {isDropdownOpen && (
//           <div className="dropdown-menu">
//             {dropdownContent}
//           </div>
//         )}
//         {Object.values(entities).length > 0 ? (
//           filteredIds.map((noticeId) => (
//             <Notice key={noticeId} noticeId={noticeId} />
//           ))
//         ) : (
//           <p>No notices found</p>
//         )}
//       </>
//     );
//   }

//   return content;
// };

// export default NoticesList;
/////////
// //ok, lets update
// import { useState, useEffect } from "react";
// import { useGetNoticesForEmployeeQuery } from "./noticesApiSlice";
// import Notice from "./Notice";
// import useAuth from "../../hooks/useAuth";
// import "./NoticesList.css";

// const NoticesList = () => {
//   const { email } = useAuth();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [newNoticeCount, setNewNoticeCount] = useState(0);
//   const [selectedNotice, setSelectedNotice] = useState(null);


//   const {
//     data: notices,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetNoticesForEmployeeQuery("noticesList", {
//     pollingInterval: 15000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true,
//   });


//   useEffect(() => {
//     if (isSuccess && notices && notices.entities) {
//       const newNotices = Object.values(notices.entities).filter(
//         (notice) => notice.isNew
//       );
//       setNewNoticeCount(newNotices.length);
//     }
//   }, [isSuccess, notices]);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleNoticeClick = (noticeId) => {
//     setSelectedNotice(noticeId);
   
//     };



//   let content;

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   } else if (isError) {
//     content = <p className="errmsg">{error?.data?.message}</p>;
//   } else if (isSuccess && email) {
//     const { ids, entities } = notices;
//     const filteredIds = [...ids];

//     const dropdownContent =
//       filteredIds.length > 0 ? (
//         filteredIds.map((noticeId) => (
//           <tr key={noticeId} className="dropdown-item" onClick={() => handleNoticeClick(noticeId)}>
//             <td>Title: {entities[noticeId].title}</td>
//             <td>
//               Creation Date:{" "}
//               {new Date(entities[noticeId].createdAt).toLocaleString("en-US", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//                 hour: "numeric",
//                 minute: "numeric",
//                 second: "numeric",
//               })}
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr className="dropdown-item">
//           <td colSpan="2">No notices found</td>
//         </tr>
//       );

//     content = (
//       <>
//         <button className="dropdown-toggle" onClick={handleDropdownToggle}>
//           Show Notices
//           {newNoticeCount > 0 && (
//             <span className="new-notice-count">{newNoticeCount}</span>
//           )}
//         </button>
//         {isDropdownOpen && (
//           <table className="dropdown-menu">
//             <tbody>{dropdownContent}</tbody>
//           </table>
//         )}
//         {Object.values(entities).length > 0 ? (
//           filteredIds.map((noticeId) => (
//             <Notice key={noticeId} noticeId={noticeId} />
//           ))
//         ) : (
//           <p>No notices found</p>
//         )}

      
//       </>
//     );
//   }

//   return content;
// };

// export default NoticesList;
////////////
//lastly
// import { useState, useEffect } from "react";
// import { useGetNoticesForEmployeeQuery, useMarkNoticeAsViewedMutation } from "./noticesApiSlice";
// import Notice from "./Notice";
// import useAuth from "../../hooks/useAuth";
// import "./NoticesList.css";

// const NoticesList = () => {
//   const { email } = useAuth();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [newNoticeCount, setNewNoticeCount] = useState(0);
//   const [selectedNotice, setSelectedNotice] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Track the state of the modal

//   const {
//     data: notices,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetNoticesForEmployeeQuery("noticesList", {
//     pollingInterval: 15000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true,
//   });

//   const [markNoticeAsViewed] = useMarkNoticeAsViewedMutation();

//   useEffect(() => {
//     if (isSuccess && notices && notices.entities) {
//       const newNotices = Object.values(notices.entities).filter(
//         (notice) => notice.isNew
//       );
//       setNewNoticeCount(newNotices.length);
//     }
//   }, [isSuccess, notices]);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleNoticeClick = (noticeId) => {
//     setSelectedNotice(noticeId);
//     markNoticeAsViewed(noticeId); // Mark the notice as viewed
//     setIsModalOpen(true); // Open the modal when a notice is clicked
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false); // Close the modal
//   };

//   let content;

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   } else if (isError) {
//     content = <p className="errmsg">{error?.data?.message}</p>;
//   } else if (isSuccess && email) {
//     const { ids, entities } = notices;
//     const filteredIds = [...ids];

//     const dropdownContent =
//       filteredIds.length > 0 ? (
//         filteredIds.map((noticeId) => (
//           <tr key={noticeId} className="dropdown-item" onClick={() => handleNoticeClick(noticeId)}>
//             <td>Title: {entities[noticeId].title}</td>
//             <td>
//               Creation Date:{" "}
//               {new Date(entities[noticeId].createdAt).toLocaleString("en-US", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//                 hour: "numeric",
//                 minute: "numeric",
//                 second: "numeric",
//               })}
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr className="dropdown-item">
//           <td colSpan="2">No notices found</td>
//         </tr>
//       );

//     content = (
//       <>
//         <button className="dropdown-toggle" onClick={handleDropdownToggle}>
//           Show Notices
//           {newNoticeCount > 0 && (
//             <span className="new-notice-count">{newNoticeCount}</span>
//           )}
//         </button>
//         {isDropdownOpen && (
//           <table className="dropdown-menu">
//             <tbody>{dropdownContent}</tbody>
//           </table>
//         )}
//         {Object.values(entities).length > 0 ? (
//           filteredIds.map((noticeId) => (
//             <Notice key={noticeId} noticeId={noticeId} />
//           ))
//         ) : (
//           <p>No notices found</p>
//         )}

//         {isModalOpen && selectedNotice && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3>{entities[selectedNotice].title}</h3>
//               <p>{entities[selectedNotice].content}</p>
//               {/* Display other notice details */}
//               <button onClick={handleModalClose}>Close</button>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }

//   return content;
// };

// export default NoticesList;

/////////////
//best
// import { useState, useEffect } from "react";
// import { useGetNoticesForEmployeeQuery } from "./noticesApiSlice";
// import Notice from "./Notice";
// import useAuth from "../../hooks/useAuth";
// import "./NoticesList.css";

// const NoticesList = () => {
//   const { email } = useAuth();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [newNoticeCount, setNewNoticeCount] = useState(0);

//   const {
//     data: notices,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetNoticesForEmployeeQuery("noticesList", {
//     pollingInterval: 15000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true,
//   });

//   useEffect(() => {
//     if (isSuccess && notices && notices.entities) {
//       const newNotices = Object.values(notices.entities).filter(
//         (notice) => notice.isNew
//       );
//       setNewNoticeCount(newNotices.length);
//     }
//   }, [isSuccess, notices]);

//   let content;

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   } else if (isError) {
//     content = <p className="errmsg">{error?.data?.message}</p>;
//   } else if (isSuccess && email) {
//     const { ids, entities } = notices;
//     const filteredIds = [...ids];

//     const handleDropdownToggle = () => {
//       setIsDropdownOpen(!isDropdownOpen);
//     };

//     const dropdownContent =
//       filteredIds.length > 0 ? (
//         filteredIds.map((noticeId) => (
//           <tr key={noticeId} className="dropdown-item">
//             <td>Title: {entities[noticeId].title}</td>
//             <td>
//               Creation Date:{" "}
//               {new Date(entities[noticeId].createdAt).toLocaleString("en-US", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//                 hour: "numeric",
//                 minute: "numeric",
//                 second: "numeric",
//               })}
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr className="dropdown-item">
//           <td colSpan="2">No notices found</td>
//         </tr>
//       );

//     content = (
//       <>
//         <button className="dropdown-toggle" onClick={handleDropdownToggle}>
//           Show Notices
//           {newNoticeCount > 0 && (
//             <span className="new-notice-count">{newNoticeCount}</span>
//           )}
//         </button>
//         {isDropdownOpen && (
//           <table className="dropdown-menu">
//             <tbody>{dropdownContent}</tbody>
//           </table>
//         )}
//         {Object.values(entities).length > 0 ? (
//           filteredIds.map((noticeId) => (
//             <Notice key={noticeId} noticeId={noticeId} />
//           ))
//         ) : (
//           <p>No notices found</p>
//         )}
//       </>
//     );
//   }

//   return content;
// };

// export default NoticesList;
/////
//v gddddd
// import { useState, useEffect } from "react";
// import { useGetNoticesForEmployeeQuery } from "./noticesApiSlice";
// import Notice from "./Notice";
// import useAuth from "../../hooks/useAuth";
// import "./NoticesList.css";

// const NoticesList = () => {
//   const { email } = useAuth();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [newNoticeCount, setNewNoticeCount] = useState(0);

//   const {
//     data: notices,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetNoticesForEmployeeQuery("noticesList", {
//     pollingInterval: 15000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true,
//   });

//   useEffect(() => {
//     if (isSuccess && notices && notices.entities) {
//       const newNotices = Object.values(notices.entities).filter(
//         (notice) => notice.isNew
//       );
//       setNewNoticeCount(newNotices.length);
//     }
//   }, [isSuccess, notices]);

//   let content;

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   } else if (isError) {
//     content = <p className="errmsg">{error?.data?.message}</p>;
//   } else if (isSuccess && email) {
//     const { ids, entities } = notices;
//     filteredIds = [...ids];

//     const handleDropdownToggle = () => {
//       setIsDropdownOpen(!isDropdownOpen);
//     };

//     const dropdownContent =
//       ids.length > 0 ? (
//         ids.map((noticeId) => (
//           <tr key={noticeId} className="dropdown-item">
//             <td>Title: {entities[noticeId].title}</td>
//             <td>
//               Creation Date:{" "}
//               {new Date(entities[noticeId].createdAt).toLocaleString("en-US", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//                 hour: "numeric",
//                 minute: "numeric",
//                 second: "numeric",
//               })}
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr className="dropdown-item">
//           <td colSpan="2">No notices found</td>
//         </tr>
//       );

//       content = (
//         <>
//           <button className="dropdown-toggle" onClick={handleDropdownToggle}>
//             Show Notices
//             {newNoticeCount > 0 && (
//               <span className="new-notice-count">{newNoticeCount}</span>
//             )}
//           </button>
//           {isDropdownOpen && (
//             <table className="dropdown-menu">
//               <tbody>{dropdownContent}</tbody>
//             </table>
//           )}
//           {Object.values(entities).length > 0 ? (
//             Object.values(entities).map((notice) => (
//               <Notice key={notice.id} noticeId={notice.id} />
//             ))
//           ) : (
//             <p>No notices found</p>
//           )}
//         </>
//       );
//   }

//   return content;
// };

// export default NoticesList;
//////////////
//ok but only first 2 comes
// import { useState, useEffect } from "react";
// import { useGetNoticesForEmployeeQuery } from "./noticesApiSlice";
// import Notice from "./Notice";
// import useAuth from "../../hooks/useAuth";
// import "./NoticesList.css";

// const NoticesList = () => {
//   const { email } = useAuth();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [newNoticeCount, setNewNoticeCount] = useState(0);

//   const {
//     data: notices,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetNoticesForEmployeeQuery("noticesList", {
//     pollingInterval: 15000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true,
//   });

//   useEffect(() => {
//     if (isSuccess && notices && notices.entities) {
//       const newNotices = Object.values(notices.entities).filter(
//         (notice) => notice.isNew
//       );
//       setNewNoticeCount(newNotices.length);
//     }
//   }, [isSuccess, notices]);

//   let content;

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   } else if (isError) {
//     content = <p className="errmsg">{error?.data?.message}</p>;
//   } else if (isSuccess && email) {
//     const { ids, entities } = notices;

//     const handleDropdownToggle = () => {
//       setIsDropdownOpen(!isDropdownOpen);
//     };

//     const dropdownContent =
//       ids.length > 0 ? (
//         ids.map((noticeId) => (
//           <div key={noticeId} className="dropdown-item">
//             <p>Title: {entities[noticeId].title}</p>
//             <p>
//               Creation Date:{" "}
//               {new Date(entities[noticeId].createdAt).toLocaleString("en-US", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//                 hour: "numeric",
//                 minute: "numeric",
//                 second: "numeric",
//               })}
//             </p>
//           </div>
//         ))
//       ) : (
//         <div className="dropdown-item">No notices found</div>
//       );

//     content = (
//       <div>
//         <button className="dropdown-toggle" onClick={handleDropdownToggle}>
//           Show Notices
//           {newNoticeCount > 0 && (
//             <span className="new-notice-count">{newNoticeCount}</span>
//           )}
//         </button>
//         {isDropdownOpen && (
//           <div className="dropdown-menu" style={{ display: "block" }}>
//             {dropdownContent}
//           </div>
//         )}
//         {Object.values(entities).length > 0 ? (
//           Object.values(entities).map((notice) => (
//             <Notice key={notice.id} noticeId={notice.id} />
//           ))
//         ) : (
//           <p>No notices found</p>
//         )}
//       </div>
//     );
//   }

//   return content;
// };

// export default NoticesList;
// /////////
//ok
// import { useState, useEffect } from "react";
// import { useGetNoticesForEmployeeQuery } from "./noticesApiSlice";
// import Notice from "./Notice";
// import useAuth from "../../hooks/useAuth";
// import "./NoticesList.css";

// const NoticesList = () => {
//   const { email } = useAuth();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [newNoticeCount, setNewNoticeCount] = useState(0);

//   const {
//     data: notices,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetNoticesForEmployeeQuery("noticesList", {
//     pollingInterval: 15000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true,
//   });

//   useEffect(() => {
//     if (isSuccess && notices) {
//       const newNotices = Object.values(notices.entities).filter(
//         (notice) => notice.isNew
//       );
//       setNewNoticeCount(newNotices.length);
//     }
//   }, [isSuccess, notices]);

//   let content;

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   } else if (isError) {
//     content = <p className="errmsg">{error?.data?.message}</p>;
//   } else if (isSuccess && email) {
//     const { ids, entities } = notices;
//     let filteredIds = [...ids];

//     const handleDropdownToggle = () => {
//       setIsDropdownOpen(!isDropdownOpen);
//     };

//     const dropdownContent =
//       ids.length > 0 ? (
//         filteredIds.map((noticeId) => (
//           <div key={noticeId} className="dropdown-item">
//             <p>Title: {entities[noticeId].title}</p>
//             <p>
//               Creation Date:{" "}
//               {new Date(entities[noticeId].createdAt).toLocaleString(
//                 "en-US",
//                 {
//                   day: "numeric",
//                   month: "long",
//                   year: "numeric",
//                   hour: "numeric",
//                   minute: "numeric",
//                   second: "numeric",
//                 }
//               )}
//             </p>
//           </div>
//         ))
//       ) : (
//         <div className="dropdown-item">No notices found</div>
//       );

//     content = (
//       <div>
//         <button className="dropdown-toggle" onClick={handleDropdownToggle}>
//           Show Notices
//           {newNoticeCount > 0 && (
//             <span className="new-notice-count">{newNoticeCount}</span>
//           )}
//         </button>
//         {isDropdownOpen && (
//           <div className="dropdown-menu" style={{ display: "block" }}>
//             {dropdownContent}
//           </div>
//         )}
//         {Array.isArray(notices) && notices.length > 0 ? (
//           notices.map((notice) => (
//             <Notice key={notice.id} noticeId={notice.id} />
//           ))
//         ) : (
//           <p>No notices found</p>
//         )}
//       </div>
//     );
//   }

//   return content;
// };

// export default NoticesList;

///
//very good
// import { useState } from "react";
// import { useGetNoticesForEmployeeQuery } from "./noticesApiSlice";
// import Notice from "./Notice";
// import useAuth from "../../hooks/useAuth";
// import "./NoticesList.css";

// const NoticesList = () => {
//   const { email } = useAuth();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const {
//     data: notices,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetNoticesForEmployeeQuery("noticesList", {
//     pollingInterval: 15000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true,
//   });

//   let content;

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   } else if (isError) {
//     content = <p className="errmsg">{error?.data?.message}</p>;
//   } else if (isSuccess && email) {
//     const { ids, entities } = notices;
//     let filteredIds = [...ids];

//     const handleDropdownToggle = () => {
//       setIsDropdownOpen(!isDropdownOpen);
//     };

//     const dropdownContent =
//       ids.length > 0 ? (
//         filteredIds.map((noticeId) => (
//           <div key={noticeId} className="dropdown-item">
//             <p>Title: {entities[noticeId].title}</p>
//             <p>Creation Date: {new Date(entities[noticeId].createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</p>
//           </div>
//         ))
//       ) : (
//         <div className="dropdown-item">No notices found</div>
//       );

//     content = (
//       <div>
//         <button className="dropdown-toggle" onClick={handleDropdownToggle}>
//           Show Notices
//         </button>
//         {isDropdownOpen && (
//           <div className="dropdown-menu" style={{ display: "block" }}>
//             {dropdownContent}
//           </div>
//         )}
//         {Array.isArray(notices) && notices.length > 0 ? (
//           notices.map((notice) => (
//             <Notice key={notice.id} noticeId={notice.id} />
//           ))
//         ) : (
//           <p>No notices found</p>
//         )}
//       </div>
//     );
//   }

//   return content;
// };

// export default NoticesList;

////
//okk
// import { useGetNoticesForEmployeeQuery } from "./noticesApiSlice"
// import Notice from "./Notice"
// import useAuth from "../../hooks/useAuth"

// const NoticesList = () => {

//     const { email } = useAuth()

//     const {
//         data: notices,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     } = useGetNoticesForEmployeeQuery('noticesList', {
//         pollingInterval: 15000,
//         refetchOnFocus: true,
//         refetchOnMountOrArgChange: true

//     })

//     let content

//     if (isLoading) {
//         content = <p>Loading...</p>;
//       } else if (isError) {
//         content = <p className="errmsg">{error?.data?.message}</p>;
//       }else if (isSuccess ) {
//        //&& email
//        const { ids, entities } = notices
//        let filteredIds
//        filteredIds = [...ids];

//        const tableContent =
       
//         ids.length > 0 ? (
//           filteredIds.map((noticeId) => (

//             <Notice key={noticeId} noticeId={noticeId} />
//           ))
//         ) : (
//           <tr>
//             <td colSpan="6">No notices found</td>
//           </tr>
//         );
  
//       content = (
//         <table className="table table--notices">
//           <thead className="table__thead">
//             <tr>
//               <th scope="col" className="table__th team__status">Status</th>
//               <th scope="col" className="table__th team__created">Created</th>
//               <th scope="col" className="table__th team__updated">Updated</th>
//               <th scope="col" className="table__th team__title">Title</th>
//               <th scope="col" className="table__th team__edit">Edit</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableContent}
//           </tbody>
//         </table>
//       );
//     }
  
//     return content;
//   };
  
//   export default NoticesList;