import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from './authApiSlice';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { data, isLoading, isError, error }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email");
    }

    const userData = {
      email,
    };

    try {
      const response = await forgotPassword(userData).unwrap();
      toast.success(response.message);
      setEmail("");
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="btn btn-primary btn-block">
            Get Reset Email
          </button>
          
          <div className="links">
            <p>
              <Link to="/">- Home</Link>
            </p>
            <p>
              <Link to="/login">- Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;

// import React, { useState } from "react";
// //import styles from "./auth.module.scss";
// //import { AiOutlineMail } from "react-icons/ai";
// //import Card from "../../components/card/Card";
// //import { useRegisterMutation} from './authApiSlice'
// //import { forgotPassword, validateEmail } from "../../services/authService";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { useForgotPasswordMutation } from './authApiSlice';
// const Forgot = () => {
//   const [email, setEmail] = useState("");
//   // const [validEmail, setValidEmail] = useState(false);
//   // const [emailFocus, setEmailFocus] = useState(false);
//   const [forgotPassword, {data, isLoading, isError,
//     error }] = useForgotPasswordMutation();

//   const forgot = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       return toast.error("Please enter an email");
//     }

//     // if (!validateEmail(email)) {
//     //   return toast.error("Please enter a valid email");
//     // }

//     const userData = {
//       email,
//     };

//     await forgotPassword(userData);
//     setEmail("");
//   };

//   return (
//     <div className={`container ${styles.auth}`}>
     
//         <div className={styles.form}>
//           <div className="--flex-center">
//             {/* <AiOutlineMail size={35} color="#999" />
//            */}
//           </div>
//           <h2>Forgot Password</h2>

//           <form onSubmit={forgot}>
           
//             <input
//               type="email"
//                placeholder="Email"
//                required
//                name="email"
//                value={email}
//                onChange={(e) => setEmail(e.target.value)}
//             />

//             <button type="submit" className="--btn --btn-primary --btn-block">
//               Get Reset Email
//             </button>
//            <div>
//             {/* <div className={styles.links}> */}
//               <p>
//                 <Link to="/">- Home</Link>
//               </p>
//               <p>
//                 <Link to="/login">- Login</Link>
//               </p>
//             </div>
//           </form>
//         </div>
 
//     </div>
//   );
// };

// export default Forgot;
