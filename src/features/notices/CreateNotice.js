import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import styled from "styled-components";
//import { PrimaryButton } from "./CommonStyled";
import { useAddNewNoticeMutation } from "../notices/noticesApiSlice";
//import { useGetTeamsQuery } from "./teamsApiSlice"
import { selectAllTeams } from "../teams/teamsApiSlice"

//import "./Product.css";
import useAuth from "../../hooks/useAuth"

const CreateNotice = () => {

  const { email, isManager, isAdmin } = useAuth()

  const teams = useSelector(selectAllTeams)

const [addNewNotice, {
   isLoading,
   isSuccess,
   isError,
   error
}] = useAddNewNoticeMutation()
  const dispatch = useDispatch();
//  const { createStatus } = useSelector((state) => state.products);

  const [noticeFIle, setNoticeFIle] = useState("");
  //const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
 // const [noticeFIlePreview, setNoticeFIlePreview] = useState(null);
  const [teamId, setTeamId] = useState(teams.length > 0 ? teams[0].id : []);
  ////////////
  //old
//   const handleNoticeFileUpload = (e) => {
//     const reader = new FileReader();
//     const file = e.target.files[0];

//     //setNoticeFIle(e.target.files[0]);
//  //   setNoticeFIlePreview(URL.createObjectURL(e.target.files[0]));
//  //setNoticeFIlePreview(file.name);
//  // if (file && file.type === "application/pdf") {
//    // console.log("appli pdf");
//     // reader.readAsArrayBuffer(file);
// //   setNoticeFIlePreview("PDF file uploaded");
// // } else if (file && file.type === "image/jpeg" ||
// //       file.type === "image/jpg" ||
// //       file.type === "image/png" ) {
// //   setNoticeFIlePreview(file ? URL.createObjectURL(file) : null);
// //    }
// //    else{
// //     setNoticeFIlePreview("file type is not found");

// //    }
// if (file && file.type === "application/pdf") {
//   console.log("file is pdf");
//   // For PDF files, read the file as array buffer
//   reader.readAsArrayBuffer(file);
//   reader.onloadend = () => {
//     // setNoticeFIle(e.target.files[0]);
//      setNoticeFIle(reader.result);
//     };
// } else if (file && file.type === "application/msword" || file.type === "text/plain") {
//   // For MS Word and TXT files, read the file as text
//  console.log("mswrd or txt file");
//   reader.readAsText(file);
// }
// // reader.readAsDataURL(file);

// } else {
// setNoticeFIle("");
// }  

//  TransformFileData(file);
//   };

//    const TransformFileData = (file) => {
//      const reader = new FileReader();
      
//     };

//   //  const TransformFileData = (file) => {
//   //    const reader = new FileReader();
//   //      if (file) {
//   //      reader.readAsDataURL(file);
//   //      reader.onloadend = () => {
//   //       // setNoticeFIle(e.target.files[0]);
//   //        setNoticeFIle(reader.result);
//   //      };
//   //    } else {
//   //       setNoticeFIle("");
//   //     }  
//   //   };

////////////////
//docx no need
//new
const handleNoticeFileUpload = (e) => {
  const reader = new FileReader();
  const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      console.log("file is pdf");
      // For PDF files, read the file as array buffer
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        setNoticeFIle(reader.result);
      };
    } else if (file && file.type === "text/plain") {
      // For MS Word and TXT files, read the file as text
      console.log("txt file");
      reader.readAsText(file);
      reader.onloadend = () => {
        setNoticeFIle(reader.result);
      };
    } else if (
      file && 
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      console.log("image file");
      // For image files, read the file as data URL
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNoticeFIle(reader.result);
      };
    } else {
      setNoticeFIle("");
    }

};


  const onTeamIdChanged = e => setTeamId(e.target.value)
  const options = teams.map(team => {
     return (
       <option key={team.id} value={team.id}>
         {team.title}
      </option >
     )
 })
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("brand", brand);
    // formData.append("price", price);
    // formData.append("desc", desc);
    // formData.append("image", noticeFIle);
    // await addNewNotice({
    //   formData
    // });
    /////////////////
    //  brand,
       await addNewNotice({
        title,
        desc,
        file: noticeFIle,
        team:teamId
      })
      };

      return (
        <div className="create-notice">
         <form onSubmit={handleSubmit} className="form" encType="multipart/form-data" >
         {/* <form onSubmit={handleSubmit} className="form" encType="multipart/form-data" > */}
       <h3>Post a Notice</h3>
            <input  type="file" 
            name="file"
             onChange={handleNoticeFileUpload}
              required
            />
             <label className="form__label form__checkbox-container" htmlFor="notice-teamId">
                            Select Team:</label>
                        <select
                            id="teamId"
                            name="teamId"
                            className="form__select"
                            value={teamId}
                            onChange={onTeamIdChanged}
                        >
                            {options}
                        </select>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              name="desc"
              placeholder="Short Description"
              onChange={(e) => setDesc(e.target.value)}
              required
            />
    
            {/* <Button type="submit">
              {createStatus === "pending" ? "Submitting" : "Submit"}
            </Button> */}
             <button
                 className="icon-button"
                 title="Save"
                 onClick={handleSubmit}
            >Save</button>
            </form>
            {/* <div className="image-preview">
            {noticeFIle ? (
              <>
                <img src={noticeFIlePreview} alt="error!" />
                {/* <img src={noticeFIle} alt="error!" /> */}
         {/*</div>     </>
            ) : (
              <p>Notice image upload preview will appear here!</p>
            )}  
            </div> */}
            
            </div>
      );
    };
   
   export default CreateNotice;
    