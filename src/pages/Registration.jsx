<<<<<<< HEAD
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import RegistrationImage from "../assets/Registration.png";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile,} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#11175D",
  },

  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#11175D",
    },
  },
  width: "60%",
  marginBottom: "33px",
});

const CssButton = styled(Button)({
  width: "60%",
  borderRadius: "86px",
  background: "#5F35F5",
  padding: "19px 0px",
  fontSize: "20px",
  fontFamily: '"Nunito", sans-serif',
  textTransform: "capitalize",
  marginTop: "17px",
});

const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [emailError, setEmailError] = useState("");
  let [nameError, setNameError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [loader, setLoader] = useState(false);
  const db = getDatabase();
  

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  let handleName = (name) => {
    setName(name.target.value);
    setNameError("");
  };
  let handlePassword = (password) => {
    setPassword(password.target.value);
    setPasswordError("");
  };
  let handleSignUp = () => {
    if (!email) {
      setEmailError("* Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("Enter a valid email");
      }
    }
    if (!name) {
      setNameError("* Name is required");
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
      setLoader(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/let-s-chat-b1344.firebasestorage.app/o/Profile.png?alt=media&token=f7ea04f8-d664-4b73-8f58-08cd86f295eb",
          }).then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              setEmail("");
              setName("");
              setPassword("");
              toast.success("Registration Success!");
              setLoader(false);
              setTimeout(() => {
                navigate("/login");
              }, 3000);
              console.log(user);
              
            });
          }).then(()=>{
            set(ref(db, 'userlist/' + user.user.uid), {
              username: user.user.displayName,
              email: user.user.email,
              photo: user.user.photoURL
            });
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
        });
    }
  };

  return (
    <Grid container>
      <Grid size={6}>
        <div className="reg-content-box">
          <div className="reg-content">
            <h2>Get started with easily register</h2>
            <p className="paragraph">Free register and you can enjoy it</p>
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
            {emailError && <p className="errorMessage">{emailError}</p>}
            <CssTextField
              value={email}
              onChange={handleEmail}
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
            />
            {nameError && <p className="errorMessage">{nameError}</p>}
            <CssTextField
              value={name}
              onChange={handleName}
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
            />
            {passwordError && <p className="errorMessage">{passwordError}</p>}
            <div className="regPasswordField">
              <CssTextField
                value={password}
                onChange={handlePassword}
                type={showPassword ? "text" : "password"}
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="regEyeIcon"
              >
                {showPassword ? <LuEye /> : <LuEyeClosed />}
              </div>
            </div>
            {loader ? (
              <CssButton onClick={handleSignUp} variant="contained">
                <Oval
                  visible={true}
                  height="40"
                  width="40"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </CssButton>
            ) : (
              <CssButton onClick={handleSignUp} variant="contained">
                Sign Up
              </CssButton>
            )}
            <p className="para2">
              Already have an account ?{" "}
              <Link to="/login">
                <span>Sign In</span>
              </Link>
            </p>
          </div>
        </div>
      </Grid>
      <Grid size={6}>
        <img className="reg-image" src={RegistrationImage} alt="" />
      </Grid>
    </Grid>
  );
};

export default Registration;
=======
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import RegistrationImage from "../assets/Registration.png";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile,} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#11175D",
  },

  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#11175D",
    },
  },
  width: "60%",
  marginBottom: "33px",
});

const CssButton = styled(Button)({
  width: "60%",
  borderRadius: "86px",
  background: "#5F35F5",
  padding: "19px 0px",
  fontSize: "20px",
  fontFamily: '"Nunito", sans-serif',
  textTransform: "capitalize",
  marginTop: "17px",
});

const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [emailError, setEmailError] = useState("");
  let [nameError, setNameError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [loader, setLoader] = useState(false);
  const db = getDatabase();
  

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  let handleName = (name) => {
    setName(name.target.value);
    setNameError("");
  };
  let handlePassword = (password) => {
    setPassword(password.target.value);
    setPasswordError("");
  };
  let handleSignUp = () => {
    if (!email) {
      setEmailError("* Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("Enter a valid email");
      }
    }
    if (!name) {
      setNameError("* Name is required");
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
      setLoader(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/let-s-chat-b1344.firebasestorage.app/o/Profile.png?alt=media&token=f7ea04f8-d664-4b73-8f58-08cd86f295eb",
          }).then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              setEmail("");
              setName("");
              setPassword("");
              toast.success("Registration Success!");
              setLoader(false);
              setTimeout(() => {
                navigate("/login");
              }, 3000);
              console.log(user);
              
            });
          }).then(()=>{
            set(ref(db, 'userlist/' + user.user.uid), {
              username: user.user.displayName,
              email: user.user.email,
              photo: user.user.photoURL
            });
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
        });
    }
  };

  return (
    <Grid container>
      <Grid size={6}>
        <div className="reg-content-box">
          <div className="reg-content">
            <h2>Get started with easily register</h2>
            <p className="paragraph">Free register and you can enjoy it</p>
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
            {emailError && <p className="errorMessage">{emailError}</p>}
            <CssTextField
              value={email}
              onChange={handleEmail}
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
            />
            {nameError && <p className="errorMessage">{nameError}</p>}
            <CssTextField
              value={name}
              onChange={handleName}
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
            />
            {passwordError && <p className="errorMessage">{passwordError}</p>}
            <div className="regPasswordField">
              <CssTextField
                value={password}
                onChange={handlePassword}
                type={showPassword ? "text" : "password"}
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="regEyeIcon"
              >
                {showPassword ? <LuEye /> : <LuEyeClosed />}
              </div>
            </div>
            {loader ? (
              <CssButton onClick={handleSignUp} variant="contained">
                <Oval
                  visible={true}
                  height="40"
                  width="40"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </CssButton>
            ) : (
              <CssButton onClick={handleSignUp} variant="contained">
                Sign Up
              </CssButton>
            )}
            <p className="para2">
              Already have an account ?{" "}
              <Link to="/login">
                <span>Sign In</span>
              </Link>
            </p>
          </div>
        </div>
      </Grid>
      <Grid size={6}>
        <img className="reg-image" src={RegistrationImage} alt="" />
      </Grid>
    </Grid>
  );
};

export default Registration;
>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
