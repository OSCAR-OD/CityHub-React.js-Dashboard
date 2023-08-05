
// //ok but edit click e just first name show hoi
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { useSelector } from 'react-redux'
// import { useMarkNoticeAsViewedMutation, selectNoticeById } from "./noticesApiSlice";

// const Notice = ({ noticeId }) => {
//   const notice = useSelector((state) => selectNoticeById(state, noticeId));
//   const [isModalOpen, setIsModalOpen] = useState(false); // Track the state of the modal
//   const [markNoticeAsViewed] = useMarkNoticeAsViewedMutation();

//   if (notice) {
//     const handleEdit = () => {
//       markNoticeAsViewed(noticeId); // Mark the notice as viewed
//       setIsModalOpen(true); // Open the modal when the notice is clicked
//     };

//     return (
//       <div className="notice">
//         <div className="notice-header">
//           <button className="edit-button" onClick={handleEdit}>
//             <FontAwesomeIcon icon={faPenToSquare} />
//           </button>
//         </div>
//         <div className="notice-content">
//           <h3>{notice.title}</h3>
//           <p>{notice.content}</p>
//           {/* Display other notice details */}
//         </div>
//         {isModalOpen && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3>{notice.title}</h3>
//               <p>{notice.content}</p>
//               {/* Display other notice details */}
//               <button onClick={() => setIsModalOpen(false)}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   } else return null;
// };

// export default Notice;
// ///
// //chek
// // import React, { useState } from "react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// // import { useSelector } from 'react-redux'
// // import { useMarkNoticeAsViewedMutation, selectNoticeById } from "./noticesApiSlice";

// // const Notice = ({ noticeId }) => {
// //   const notice = useSelector((state) => selectNoticeById(state, noticeId));
// //   const [isModalOpen, setIsModalOpen] = useState(false); // Track the state of the modal
// //   const [markNoticeAsViewed] = useMarkNoticeAsViewedMutation();

// //   if (notice) {
// //     const handleEdit = (e) => {
// //       e.preventDefault();
// //       markNoticeAsViewed(noticeId); // Mark the notice as viewed
// //       setIsModalOpen(true); // Open the modal when the notice is clicked
// //     };
// //     // const handleModalClose = () => {
// //     //     setIsModalOpen(false); // Close the modal
// //     //   };

// //     return (
// //       <>
// //         <tr className="table__row">
// //           {/* Notice table cells */}
// //           {/* ... */}
// //           <td className="table__cell">
// //             <button className="icon-button table__button" onClick={handleEdit}>
// //               <FontAwesomeIcon icon={faPenToSquare} />
// //             </button>
// //           </td>
// //         </tr>
// //         {isModalOpen && (
// //           <div className="modal">
// //             <div className="modal-content">
// //               <h3>{notice.title}</h3>
// //               <p>{notice.content}</p>
// //               {/* Display other notice details */}
// //               <button onClick={() => setIsModalOpen(false)}>Close</button>
// //             </div>
// //           </div>
// //         )}
// //       </>
// //     );
// //   } else return null;
// // };

// // export default Notice;
// ////////
// ///////////
// //ok
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
// // import { useNavigate } from 'react-router-dom'

// // import { useSelector } from 'react-redux'
// // import { selectNoticeById, useMarkNoticeAsViewedMutation } from './noticesApiSlice';

// // const Notice = ({ noticeId  }) => {

// //     //const notice = useSelector(state => selectNoticeById(state, noticeId))
// //     const notice = useSelector(state => selectNoticeById(state, noticeId));
// //      const navigate = useNavigate()
// //      const [isModalOpen, setIsModalOpen] = useState(false); // Track the state of the modal
// //      const [markNoticeAsViewed] = useMarkNoticeAsViewedMutation();

// //      if (notice) {
// //         // const created = new Date(notice.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

// //         // const updated = new Date(notice.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

// //         const handleEdit = () => {
// //             markNoticeAsViewed(noticeId); // Mark the notice as viewed
// //         //    navigate(`/dash/notices/${noticeId}`)
// //         }
// //         return (
// //         <>
// //             <tr className="table__row">
// //                 <td className="table__cell notice__status">
// //                     {notice.completed
// //                         ? <span className="notice__status--completed">Completed</span>
// //                         : <span className="notice__status--open">Open</span>
// //                     }
// //                 </td>
// //                 <td className="table__cell notice__created">{created}</td>
// //                 <td className="table__cell notice__updated">{updated}</td>
// //                 <td className="table__cell notice__title">{notice.title}</td>
// //                 <td className="table__cell notice__userEmail">
// //                    {notice.emails}
// //                 </td>
// //                 {/* ok for single , but not for multiple emails, 
// //                 //in notice.name only 1 name is shows
// //                  <td className="table__cell notice__username">{notice.email}
// //                 </td>
// //               */}
// //                 {/* ok for single and multiple ids, but not mining full 
// //                 <td className="table__cell notice__username">{notice.id}</td>
// //               */}
// //                 {/* <td className="table__cell notice__username">
// //                  {notice.id.map((id, index) => (
// //                     <span key={index}>{id}{index !== notice.id.length - 1 ? ', ' : ''}</span>
// //                     ))}
// //                 </td> */}
// //                 {/* <td className="table__cell notice__username">
// //                  {notice.email.map((email, index) => (
// //                     <span key={index}>{email}{index !== notice.email.length - 1 ? ', ' : ''}</span>
// //                     ))}
// //                 </td> */}
// //                 <td className="table__cell">
// //                     <button
// //                         className="icon-button table__button"
// //                         onClick={handleEdit}
// //                     >
// //                         <FontAwesomeIcon icon={faPenToSquare} />
// //                     </button>
// //                 </td>
// //             </tr>
// //         </>
// //           {isModalOpen && selectedNotice && (
// //             <div className="modal">
// //               <div className="modal-content">
// //                 <h3>{entities[selectedNotice].title}</h3>
// //                 <p>{entities[selectedNotice].content}</p>
// //                 {/* Display other notice details */}
// //                 <button onClick={handleModalClose}>Close</button>
// //               </div>
// //             </div>
// //           )}
// //         )

// //     } else return null
// // }
// // export default Notice