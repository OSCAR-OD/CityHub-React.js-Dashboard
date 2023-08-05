import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import styled from "styled-components";
//import { PrimaryButton } from "./CommonStyled";
import { useAddNewPostMutation } from "../posts/postsApiSlice";

//import "./Product.css";
import useAuth from "../../hooks/useAuth"

const CreatePost = () => {

  const { email, isManager, isAdmin } = useAuth()

const [addNewPost, {
   isLoading,
   isSuccess,
   isError,
   error
}] = useAddNewPostMutation()
  const dispatch = useDispatch();
//  const { createStatus } = useSelector((state) => state.products);

  const [postFIle, setPostFIle] = useState("");
  //const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
 // const [postFIlePreview, setPostFIlePreview] = useState(null);

  const handlePostFileUpload = (e) => {
  const reader = new FileReader();
  const file = e.target.files[0];

    if (
      file && 
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      console.log("image file");
      // For image files, read the file as data URL
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostFIle(reader.result);
      };
    } else {
      setPostFIle("");
    }

};


  // const onTeamIdChanged = e => setTeamId(e.target.value)
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   await addNewPost({
        title,
        desc,
        file: postFIle,
      })
      };

      return (
        <div className="create-post">
         <form onSubmit={handleSubmit} className="form" encType="multipart/form-data" >
         {/* <form onSubmit={handleSubmit} className="form" encType="multipart/form-data" > */}
       <h3>Post a Post</h3>
            <input  type="file" 
            name="file"
             onChange={handlePostFileUpload}
              required
            />
          
            <input
              type="text"
              name="title"
              placeholder="Title"
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
      <button
                 className="icon-button"
                 title="Save"
                 onClick={handleSubmit}
            >Save</button>
            </form>
            </div>
      );
    };
   
   export default CreatePost;
    