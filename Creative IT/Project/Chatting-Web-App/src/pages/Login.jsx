import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import LoginImage from "../assets/Login.png";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import GoogleImg from "../assets/Google.png";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { userDetails } from "../slices/userInfoSlice";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#11175D",
  },

  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#11175D",
    },
  },
  width: "424px",
  marginBottom: "33px",
});

const CssButton = styled(Button)({
  width: "424px",
  height: "55px",
  borderRadius: "9px",
  background: "#5F35F5",
  padding: "19px 0px",
  fontSize: "21px",
  fontFamily: '"Open Sans", sans-serif',
  textTransform: "capitalize",
  marginTop: "15px",
});
const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let dispatch = useDispatch()
  let [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [forgetEmail, setForgetEmail]= useState("")
  let [forgetEmailError, setForgetEmailError]= useState("")
  let [forgetUI, setForgetUI] = useState(false)
  let navigate = useNavigate();

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  let handlePassword = (password) => {
    setPassword(password.target.value);
    setPasswordError("");
  };
  let handleSignIn = () => {
    if (!email) {
      setEmailError("* Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("Enter a valid email");
      }
    }
    if (!password) {
      setPasswordError("* Password is required");
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError("Ensures at least one lowercase letter");
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("Ensures at least one uppercase letter");
    } else if (!/(?=.*\d)/.test(password)) {
      setPasswordError("Ensures at least one digit");
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      setPasswordError("Ensures at least one special character");
    } else if (!/([A-Za-z\d@$!%*?&]{8,}$)/.test(password)) {
      setPasswordError("Ensures the password is at least 8 characters long");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          if (user.user.emailVerified) {
            dispatch(userDetails(user.user))
            localStorage.setItem("userinfo",JSON.stringify(user.user))

            toast.success("Login Successful!");
            navigate("/pages/home");
          } else {
            toast.error("Email is not varified!");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Email & Password incorrect!");
          }else if (errorCode.includes("auth/too-many-requests")) {
            toast.error("Try again later!");
          }
        });
    }
  };
  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/pages/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };
  let handleForgetPassword = () => {
    setForgetUI(true)
  };
  let handleForgetEmail=(e)=>{
    setForgetEmail(e.target.value);
    setForgetEmailError("");
  }
  let handleForgetPasswordButton=()=>{
    if(!forgetEmail){
      setForgetEmailError("*Email is required")
    }else{
      sendPasswordResetEmail(auth, forgetEmail)
        .then(() => {
          toast.success("Email Sent. Please Check your email.");
          setTimeout(()=>{
            setForgetUI(false)
          },3000)
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/too-many-requests")) {
            toast.error("Try again later!");
          }
        });
    }
  }
  let handleBackToLogin=()=>{
    setForgetUI(false)
  }


  return (
    <>
      <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
      />
      
      {
        forgetUI 
        ? 
        <div className="forgetPasswordUI">
          <div className="forgetPasswordBox">
            {forgetEmailError && <p className="errorMessage">{forgetEmailError}</p>}
            <CssTextField onChange={handleForgetEmail} value={forgetEmail} id="outlined-basic" label="Email Address" variant="outlined"/>
            <div className="buttonBox">
              <CssButton onClick={handleBackToLogin} variant="contained">Back to Login</CssButton>
              <CssButton onClick={handleForgetPasswordButton} variant="contained">Send Code</CssButton>
            </div>
          </div>
        </div>
        :
        <Grid container>
        <Grid size={6}>
          <div className="reg-content-box">
            <div className="reg-content">
              <h2>Login to your account!</h2>
              <p className="paragraph">Free register and you can enjoy it</p>
              
              {emailError && <p className="errorMessage">{emailError}</p>}
              <CssTextField
                onChange={handleEmail}
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
              />
              {passwordError && <p className="errorMessage">{passwordError}</p>}
              <div className="logPasswordField">
                <CssTextField
                  onChange={handlePassword}
                  type={showPassword ? "text" : "password"}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="logEyeIcon"
                >
                  {showPassword ? <LuEye /> : <LuEyeClosed />}
                </div>
              </div>
              <CssButton onClick={handleSignIn} variant="contained">
                Login to Continue
              </CssButton>
              <div onClick={handleGoogle} className="loginType">
                <img src={GoogleImg} alt="" />
                <p>Login with Google</p>
              </div>
              <p onClick={handleForgetPassword} className="log-para3">
                Forget Password?
              </p>
              <p className="log-para2">
                Don’t have an account ?{" "}
                <Link to="/">
                  <span>Sign Up</span>
                </Link>
              </p>
            </div>
          </div>
        </Grid>
        <Grid size={6}>
          <img className="log-image" src={LoginImage} alt="" />
        </Grid>
        </Grid>
      }
      
    </>
  );
};

export default Login;
