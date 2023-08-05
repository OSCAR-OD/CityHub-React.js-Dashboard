// import { useState, useEffect } from "react";
// import { useGetPostsQuery } from "./postsApiSlice";
// import Post from "./Post";
// import useAuth from "../../hooks/useAuth";
// import "./PostsList.css";

// const PostList = () => {
//   const { email } = useAuth();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [newPostCount, setNewPostCount] = useState(0);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showAllPosts, setShowAllPosts] = useState(false); // Track the state of showing all posts

//   const {
//     data: posts,
//     isSuccess,
//     isError,
//     error,
   
//   } = useGetPostsForEmployeeQuery("postsList", {
//     pollingInterval: 15000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true,
//   });

//   useEffect(() => {
//     if (isSuccess && posts && posts.entities) {
//       const newPosts = Object.values(posts.entities).filter(
//         (notice) => notice.isNew
//       );
//       setNewPostCount(newPosts.length);
//     }
//   }, [isSuccess, posts]);

//   const handleDropdownToggle = () => {
//     if (!isLoading) {
//       setIsDropdownOpen(!isDropdownOpen);
//     }
//   };

//   const handlePostClick = (noticeId) => {
//     setSelectedPost(noticeId);
//   };

//   const handleShowAllPosts = () => {
//     setShowAllPosts(true);
//  //navigate to ush("/posts");see all posts
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
//     const { ids, entities } = posts;

//     let filteredIds = [...ids];

//     // Sort the notice IDs based on creation date (newest to oldest)
//     filteredIds.sort((a, b) => {
//       const noticeA = entities[a];
//       const noticeB = entities[b];
//       return noticeB.createdAt - noticeA.createdAt;
//     });
//     filteredIds.reverse();

//     const displayedPostIds = showAllPosts ? filteredIds : filteredIds.slice(0, 6);
//     const remainingPostCount = filteredIds.length - displayedPostIds.length;

//     const dropdownContent = (
//       <>
//         {displayedPostIds.map((noticeId) => (
//           <div
//             key={noticeId}
//             className="dropdown-item"
//             onClick={() => handlePostClick(noticeId)}
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
//         {remainingPostCount > 0 && (
//           <div className="show-all" onClick={handleShowAllPosts}>
//             Show All ({remainingPostCount} more)
//           </div>
//         )}
//       </>
//     );
//     content = (
//       <>
//         <button className="dropdown-toggle" onClick={handleDropdownToggle}>
//           Show Posts
//           {newPostCount > 0 && (
//             <span className="new-notice-count">{newPostCount}</span>
//           )}
//         </button>
//         {isDropdownOpen && (
//           <div className="dropdown-menu">
//             {dropdownContent}
//           </div>
//         )}
//          {dropdownContent}
//         {Object.values(entities).length > 0 ? (
//           filteredIds.map((noticeId) => (
//             <Post key={noticeId} noticeId={noticeId} />
//           ))
//         ) : (
//           <p>No posts found</p>
//         )}
//       </>
//     );
//   }

//   return content;
// };

// export default PostsList;

// ///////////////