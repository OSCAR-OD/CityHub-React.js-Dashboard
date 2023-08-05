import { useState, useEffect } from "react"
//import { useUpdateProfileMutation, useDeleteUserMutation } from "../users/usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import useAuth from "../../hooks/useAuth"
import { useGetProfileQuery, useUpdateProfileMutation } from "../users/usersApiSlice";
////duplicate of editUserForm(manager can edit this)
import { useDispatch } from "react-redux";
import "./Profile.css";
const NAME_REGEX = /^[A-z]{3,20}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const EditProfile = () => {
 
  const { data:getProfile,
   isLoading,
    isSuccess,
    isError,
    error
} = useGetProfileQuery();

    const navigate = useNavigate();
    const user = useAuth()
 
    const dispatch = useDispatch();

    const [updateProfile, {
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
     }] = useUpdateProfileMutation()

    // const [deleteUser, {
    //     isSuccess: isDelSuccess,
    //     isError: isDelError,
    //     error: delerror
    // }] = useDeleteUserMutation()

    const [name, setName] = useState('');
    //const [name, setName] = useState(getProfile?.name || '');
    const [validName, setValidName] =  useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState('')
    //const [active, setActive] = useState(getProfile.active)
 //  const [profileImage, setProfileImage] = useState(user.profileImage || '');
 const [profileImage, setProfileImage] = useState('');
 
    useEffect(() => {
        setValidName(NAME_REGEX.test(name))
    }, [name])

    // useEffect(() => {
    //     setValidPassword(PASSWORD_REGEX.test(password))
    // }, [password])

    useEffect(() => {
      if (isSuccess && getProfile) {
        setName(getProfile.name || '');
        setRoles(getProfile.roles || '');
        setProfileImage(getProfile.image|| '');
      }
    }, [isSuccess, getProfile]);

   
    const onNameChanged = e => setName(e.target.value)
   // const onPasswordChanged = e => setPassword(e.target.value)

    const handleImageChange = (e) => {
      const file = e.target.files[0];
          TransformFileData(file);
      };

      const TransformFileData = (file) => {
        const reader = new FileReader();
    
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setProfileImage(reader.result);
          };
        } else {
          setProfileImage("");
        }
      };

    let canSave
 
  // if (password) {
  //   // canSave = [roles.length, validName, validPassword].every(Boolean) && !isLoading
  //   canSave = [ validName, validPassword].every(Boolean) && !isLoading
  //  }
  if(profileImage) {
     canSave = [validName, profileImage].every(Boolean) && !isLoading
 }
 else {
   canSave = [validName, profileImage].every(Boolean) && !isLoading
}
const onSaveProfileClicked = async (e) => {
  e.preventDefault();
 // setIsLoading(true);
 try {
  // console.log("name", name);
    
  // Handle Image upload
 // let imageURL;
  // if (
  //   profileImage &&
  //   (profileImage.type === "image/jpeg" ||
  //     profileImage.type === "image/jpg" ||
  //     profileImage.type === "image/png")
  // ) {
     await updateProfile({ name, image: profileImage})

    //}
 
} catch (error) {
  console.log(error);
 // setIsLoading(false);
 // toast.error(error.message);
}
  
}


    // const options = Object.values(ROLES).map(role => {
    //     return (
    //         <option
    //             key={role}
    //             value={role}

    //         > {role}</option >
    //     )
    // })

    

    //const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const errClass = (isError ) ? "errmsg" : "offscreen"
    const validUserClass = !validName ? 'form__input--incomplete' : ''
    const validPasswordClass = password && !validPassword ? 'form__input--incomplete' : ''
   // const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

   // const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
   const errContent = (error?.data?.message ) ?? ''

   let content

   if (isLoading) content = <p>Loading...</p>
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
        }
        if (isSuccess) {
     content = (
        <>
            <p className={errClass}>{errContent}</p>
            {/* <form className="form" onSubmit={e => e.preventDefault()}> */}
           
            <div className="UserBox">
            <div className="left">
          <form className="form" onSubmit={e => e.preventDefault()}>
         
          {/* <form className="form" onSubmit={e => e.preventDefault()}> */}
            {/* <form> */}
       
            <div>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
              {/* <button className="--btn --btn-primary">Edit Profile</button> */}
            </div>
          
              {/* <button onClick={handleClick}>Send</button> */}
          <div className="form__title-row">
                    <h2>Edit Profile</h2>
            
                </div>
                <label className="form__label" htmlFor="name">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                {/* <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPasswordClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                /> */}
        <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveProfileClicked}
                            disabled={!canSave}
                        >
                           Update
                            {/* <FontAwesomeIcon icon={faSave} /> */}
                        </button>
                        {/* <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button> */}
                    </div>
                          </form>
            </div>
        

          <div className="right">
          {/* <img src={user?.photo} alt="profilepic" />
           */}
           <img
            src={
              profileImage
                ? profileImage
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
              alt=""
            />
           {/* <input type="file" 
           name="image" 
           onChange={handleImageChange} 
           required
           /> */}
          
          {/* <img
              src={
                profileImage
                  ? getProfile?.profileImage
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> */}
          {/* <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
           /> */}

          </div>
          </div>
        </>
    )
              }
    return content
}
export default EditProfile