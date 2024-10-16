import React, { useRef, useState } from "react";
import { FaFacebook, FaFacebookF, FaGithub, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import "./Login.css";
// import logo from "../../../public/cheech.png"
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../firebase"

const Login = () => {
    // // State to toggle between 'signIn' and 'signUp'
    const [isSignIn, setIsSignIn] = useState(true);

    // // Handler functions to toggle the state
    const handleSignUpClick = () => setIsSignIn(false);
    const handleSignInClick = () => setIsSignIn(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigate()

    const emailRef = useRef();
    const fullNameRef = useRef();
    const passwordRef = useRef();


    // const history = useHistory();

    const handleSignup = (e) => {
        navigation('/home')
    };

    const handleSignInWithGoogle = async () => {
        try {
            const response = await signInWithGoogle();
            if (!response) {
                setError('Sign-in was canceled. Please try again.');
                return;
            }
            console.log(response);
            navigation('/home');
        } catch (error) {
            console.error('Error during sign-in:', error);
            setError('An error occurred during sign-in. Please try again.');
        }
    };
    
    return (
        <div className="login">
            <div className={`container ${!isSignIn ? "right-panel-active" : ""}`}>
                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form action="#">
                    <button type="button" className="login-with-google-btn" style={{display:"flex", backgroundColor:"#0E435C", borderColor:"#0E435C"}} onClick={handleSignInWithGoogle}>
                        <FaGooglePlusG style={{fontSize:"18px", marginTop:"22px",marginRight:"10px", color:"white"}} className="icon"/><p>Sign In with Google</p> 
                        </button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form action="#">
                        <button type="button" className="login-with-google-btn" style={{display:"flex", backgroundColor:"#0E435C", borderColor:"#0E435C"}} onClick={handleSignInWithGoogle}>
                        <FaGooglePlusG style={{fontSize:"18px", marginTop:"22px",marginRight:"10px", color:"white"}} className="icon"/><p>Sign in with Google</p> 
                        </button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className="login-overlay-container">
                    <div className="login-overlay">
                        <div className="login-overlay-panel login-overlay-left">
                            {/* <Link to={"/"}><img src={logo} alt="aja-pose-logo" className="logo" style={{ width: "100px" }} /></Link> */}
                            <h1 style={{ color: "white" }} className="welcome">Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={handleSignInClick}>
                                {/* onClick={handleSignInClick} */}
                                Sign In
                            </button>
                        </div>
                        <div className="login-overlay-panel login-overlay-right">
                            {/* <Link to={"/"}><img src={logo} alt="aja-pose-logo" className="logo" style={{ width: "100px" }} /></Link> */}
                            <div style={{ color: "white" }} className="hey">Hello Peter<h1 className="wave" style={{ fontSize: "x-large" }}>👋🏾</h1></div>
                            <p>Please enter your personal details and start journey with us</p>
                            <button className="ghost" onClick={handleSignUpClick}>
                                {/* onClick={handleSignUpClick} */}
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
