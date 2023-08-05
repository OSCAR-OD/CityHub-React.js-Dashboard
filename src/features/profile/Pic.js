import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "../users/usersApiSlice"
import { useNavigate } from "react-router-dom"
////duplicate of editUserForm(manager can edit this)
import { useDispatch } from "react-redux";
import ProductForm from "../../components/product/productForm/ProductForm";

const Pic = () => {
//const EditUserForm = ({ user }) => {
    const dispatch = useDispatch();

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(user.username)
  const [profilePic, setProfilePic] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
      };

      const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      };
      
      const savePic = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", productImage);
    
        console.log(...formData);
    
        await dispatch(createProduct(formData));
    
        navigate("/dashboard");
      };
   
    const content = (
        <>
        <div className="UserBox">
          <div className="left">
            <img
              src={
                profilePic
                  ? URL.createObjectURL(profilePic[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
          <form className="form" onSubmit={saveProduct}>
            {/* <form> */}
              <div className="formInput">
                <label htmlFor="ProfilePic">
                  Profile PIc: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="image"
                  //onChange={(e) => setProfilePic(e.target.ProfilePic)}
                 //  style={{ display: "none" }}
                  onChange={(e) => handleImageChange(e)}
                />
              </div>

              <div className="name">
              <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />
              </div>
              <button type="submit" onClick={savePic}>Send</button>
          
            </form>
            </div>
        </div>
        </>
    )

    return content
}
export default Pic