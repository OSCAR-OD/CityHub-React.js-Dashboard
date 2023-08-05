import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import styled from "styled-components";
//import { PrimaryButton } from "./CommonStyled";
import { useAddNewProductMutation } from "../users/productsApiSlice";
import "./Product.css";
const CreateProduct = () => {
  const [addNewProduct, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useAddNewProductMutation()
  const dispatch = useDispatch();
//  const { createStatus } = useSelector((state) => state.products);

  const [productImg, setProductImg] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    setProductImg(e.target.files[0]);
    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("brand", brand);
    // formData.append("price", price);
    // formData.append("desc", desc);
    // formData.append("image", productImg);
    // await addNewProduct({
    //   formData
    // });
    /////////////////
       await addNewProduct({
        name,
        brand,
        price,
        desc,
        image: productImg,
      })
      };

  return (
    <div className="create-product">
     <form onSubmit={handleSubmit} className="form" encType="multipart/form-data" >
   <h3>Create a Product</h3>
        <input  type="file" 
        name="image"
         onChange={handleProductImageUpload}
          required
        />
        <select name="brand" onChange={(e) => setBrand(e.target.value)} required>
          <option value="">Select Brand</option>
          <option value="iphone">iPhone</option>
          <option value="samsung">Samsung</option>
          <option value="xiomi">Xiomi</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
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
        <div className="image-preview">
        {productImg ? (
          <>
            <img src={productImg} alt="error!" />
          </>
        ) : (
          <p>Product image upload preview will appear here!</p>
        )}  
        </div>
        </div>
  );
};

export default CreateProduct;

// const StyledForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   max-width: 300px;
//   margin-top: 2rem;

//   select,
//   input {
//     padding: 7px;
//     min-height: 30px;
//     outline: none;
//     border-radius: 5px;
//     border: 1px solid rgb(182, 182, 182);
//     margin: 0.3rem 0;

//     &:focus {
//       border: 2px solid rgb(0, 208, 255);
//     }
//   }

//   select {
//     color: rgb(95, 95, 95);
//   }
// `;

// const StyledCreateProduct = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const ImagePreview = styled.div`
//   margin: 2rem 0 2rem 2rem;
//   padding: 2rem;
//   border: 1px solid rgb(183, 183, 183);
//   max-width: 300px;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 2rem;
//   color: rgb(78, 78, 78);

//   img {
//     max-width: 100%;
//   }
// `;
