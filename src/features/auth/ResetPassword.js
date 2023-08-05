import React, { useState, useEffect } from "react";
//import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
//import Card from "../../components/card/Card";
//import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
//import { resetPassword } from "../../services/authService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useResetPasswordMutation } from "./authApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const initialState = {
//   password: "",
//   matchPassword: "",
// };

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [resetPassword, { data, isLoading, isError, error }] = useResetPasswordMutation();
  //const [formData, setformData] = useState(initialState);
  //const { password, matchPassword } = formData;
  // const [formData, setFormData] = useState({
  //   password: "",
  //   matchPassword: "",
  //   });
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');
    
const [validPassword, setValidPassword] = useState(false);
const [validMatch, setValidMatch] = useState(false);
const [errMsg, setErrMsg] = useState("");
const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'matchPassword') {
      setMatchPassword(value);
    }
  };
  useEffect(() => {
    setValidPassword(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);
  
  useEffect(() => {
  setErrMsg("");
  }, [password, matchPassword]);
  
  const handleReset = async (e) => {
  e.preventDefault();
  if (!validPassword) {
  setErrMsg("Passwords must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 special character");
  } else if (!validMatch) {
  setErrMsg("Passwords do not match");
  } else {
  // const userData = {
  // password,
  try {
    await resetPassword({ password, resetToken });
    setSuccess(true);
    } catch (error) {
    console.log(error.message);
    }
   };
 
  }

  return (
    <div className="container">
    <div className="row">
    <div className="col-md-6 offset-md-3 mt-5">
    <div className="card">
    <div className="card-header">
    <h4 className="card-title">Reset Password</h4>
    </div>
    <div className="card-body">
    <form onSubmit={handleReset}>
    <div className="form-group">
    <label htmlFor="password">New Password</label>
    <input type="password"
        className="form-control"
        placeholder="Enter new password"
        required
        name="password"
        value={password}  
        onChange={handleInputChange}
    />
    </div>
    <div className="form-group">
    <label htmlFor="matchPassword">Confirm Password</label>
    <input
       type="password"
       className="form-control"
       placeholder="Confirm new password"
       required
       name="matchPassword"
       value={matchPassword}
       onChange={handleInputChange}
     />
    </div>
    {isLoading && (
    <div className="my-4">
    <PulseLoader color="#0d6efd" loading={isLoading} size={15} />
    </div>
    )}
    <button disabled={!validPassword || !validMatch ? true : false}>Reset</button>
    </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    
    )
};

export default ResetPassword;
