import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'
import './auth.css'
const Login = () => {
    const emailRef = useRef();
//    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()
////
const navigate = useNavigate()
const dispatch = useDispatch()

// useEffect(() => {
//     if (profileData) {
//       // Extract the image URL from the profile data
//       const imageUrl = profileData.image

//       // Dispatch the action to set the profile pic in the store
//       dispatch(setProfilePic({ imageUrl }))
//     }
//   }, [profileData, dispatch])


  
    const [login, { isLoading }] = useLoginMutation()

    // useEffect(() => {
    //     userRef.current.focus()
    // }, [])

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
           // dispatch(setProfilePic({ accessToken }))
           
        //    const imageUrl = profileData ? profileData.image : null;
        //    dispatch(setProfilePic({ imageUrl }));
       
            setEmail('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing email or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <div className="Appk bgcolor">
        {/* <section>
             */}
        <section className="Appk-section">

       {/* <section classemail="public"> */}
            <header>
                <h1>Login</h1>
            </header>
            <main classemail="login">
                <p ref={errRef} classemail={errClass} aria-live="assertive">{errMsg}</p>
                <p>
                    Manager:pdo@employee.cityhub.com
                <br/>
                password:12345678Aa@
                <br/>
                You can signup also.
                </p>
                <form className="Appk-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">email:</label>
                <input
                type="text" id="email"
                 ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                  />
                    {/* <input
                        classemail="form__input"
                        type="text"
                        id="email"
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    /> */}

                    <label htmlFor="password">Password:</label>
             <input
             type="password" id="password"
             onChange={(e) => setPassword(e.target.value)}
             value={password}
             required
             />
                    {/* <input
                        classemail="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    /> */}
                    <button classemail="form__submit-button">Sign In</button>


                    <label htmlFor="persist" classemail="form__persist">
                        <input
                            type="checkbox"
                            classemail="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device( Login for a single time. )
                    </label>
                </form>
                 
            </main>
            <footer className= "footer" >
                <Link to="/" className="footer-link" >Back to Home</Link>
                <Link to="/registration" className="footer-link" >Sign Up</Link>
            </footer>
            {/* <footer classsName= "footer" >
                <Link to="/" className="footer-link" >Back to Home</Link>
                <Link to="/registration" className="footer-link" >Sign Up</Link>
            </footer> */}
        </section>
        </div>
    )

    return content
}
export default Login