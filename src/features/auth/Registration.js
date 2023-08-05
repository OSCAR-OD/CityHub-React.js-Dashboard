import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
//import { setCredentials } from './authSlice'
import { useRegisterMutation} from './authApiSlice'
//import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './auth.css'
const name_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register = () => {
    //useTitle('Employee Registration')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [register, {data, isLoading, isError,
        error }] = useRegisterMutation();
    const emailRef = useRef();
    const errRef = useRef();
    const nameRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(name_REGEX.test(name));
    }, [name])
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(password_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [name, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = name_REGEX.test(name);
        const v3 = EMAIL_REGEX.test(email);
        const v2 = password_REGEX.test(password);
        if (!v1 || !v2|| !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        else {
           await register({
            name,
            email,
            password
        });
           setSuccess(true);
             setName('');
             setEmail('');
             // setJobtitle('');
             // setAddress('');
             // setPhone('');
             setPassword('');
             setMatchPassword('');
             navigate('/');
            //  if(resp == "No user found"){
            //      navigate('/');
            //  }else{
            //      navigate('/dashboard');
            //  }
        //  })
        //   .catch (err=>{
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 409) {
        //         setErrMsg('namename Taken');
        //     } else {
        //         setErrMsg('Register Failed')
        //     }
        //     errRef.current.focus();
        // });
        
    }
    }
    
 const content = (
    <div className="Appk">
          <section className="Appk-section">

   {/* <section className="public"> */}
    <header>
        <h1>User Registration</h1>
     </header>
       <main className="Registration">
      {/* <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>*/}
        <form className="Appk-form" onSubmit={handleSubmit} > 
        <label htmlFor="username">
          Username:
          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
         </label>
          <input type="text"
                id="name"
                ref={nameRef}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
        />
            <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter and no space is allowed.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p>

           <label htmlFor="email">
            Email:
          <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
        </label>
           <input
             type="email" 
               id="email"
                   ref={emailRef}
                   autoComplete="off"
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
                   required
                   aria-invalid={validEmail ? "false" : "true"}
                   aria-describedby="emailnote"
                   onFocus={() => setEmailFocus(true)}
                   onBlur={() => setEmailFocus(false)}
               />
          <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                must be a valid Email address.<br />
            </p>               

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="passwordnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_password">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>
                        <input type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        <br />
                        <button disabled={!validName || !validPassword || !validMatch ? true : false}>Sign Up</button>
                    </form>
              </main>
              <footer className="footer">
              <Link to="/" className="footer-link">Back to Home</Link>
              <Link to="/" className="footer-link">Login</Link>
               </footer>
           
            </section>
            </div>
        )
    return content
}

export default Register;
////////////////////////
