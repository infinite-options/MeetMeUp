import "../App.css";
import backgroundImage from "../Assets/Images/accountSetup1Login.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Checkbox, FormGroup, FormControlLabel, TextField, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleSignUp from "./GoogleSignUp";
import { GoogleLogin } from "@react-oauth/google";

export default function AccountSetup1Login() {
  localStorage.clear(); // NOTE: do not put this outside of a function!!!

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/accountSetup7Summary`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataLogin({
      ...formDataLogin,
      [name]: value,
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (formDataLogin.email === "" || formDataLogin.password === "") {
      setErrorMessage("Please fill out all fields");
      window.alert("Please Fill out all the fields");
      return;
    }

    const saltUrl = "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/AccountSalt/MMU";
    const loginUrl = "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/Login/MMU";

    try {
      setShowSpinner(true);
      const saltResponse = await axios.post(saltUrl, { email: formDataLogin.email });
      const saltObject = saltResponse.data;

      if (saltObject.code === 200) {
        let hashAlg = saltObject.result[0].password_algorithm;
        let salt = saltObject.result[0].password_salt;

        if (hashAlg && salt) {
          switch (hashAlg) {
            case "SHA256":
              hashAlg = "SHA-256";
              break;
            default:
              break;
          }

          const saltedPassword = formDataLogin.password + salt;
          const encoder = new TextEncoder();
          const data = encoder.encode(saltedPassword);

          const hashedBuffer = await crypto.subtle.digest(hashAlg, data);
          const hashArray = Array.from(new Uint8Array(hashedBuffer));
          const hashedPassword = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
          const password = hashedPassword;
          console.log(password);
          const loginResponse = await axios.post(
            loginUrl,
            {
              email: formDataLogin.email,
              password: hashedPassword,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          console.log("Login successful:", loginResponse.data);
          console.log("ACTUAL USER ID", loginResponse.data.result.user_uid);
          localStorage.setItem("user_uid", loginResponse.data.result.user_uid); //IMPORTANT FOR SETTING THE ID TO ACTUAL ID AND NOT USE OLD ONE
          localStorage.setItem("user_email_id", loginResponse.data.result.user_email_id); // DONT FORGET EMAIL ID!!
          localStorage.setItem("phone_number", loginResponse.data.result.user_phone_number); //Setting this to view it in account details
          navigate(`/accountSetup7Summary`);
        } else {
          throw new Error("Hash algorithm or salt is missing.");
        }
      } else {
        window.alert("User does not exist.");
        setShowSpinner(false);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response && error.response.status === 401) {
        window.alert("Invalid credentials. Please try again.");
      } else {
        window.alert("An error occurred. Please try again later.");
      }
      setShowSpinner(false);
    }
  };

  const handleSubmitCreate = (e) => {
    console.log(e);
  };

  const [showEmailInput, setShowEmailInput] = useState(false);
  const [retrieveEmail, setRetrieveEmail] = useState('');

  const handleRetrieveClick = () => {
    console.log('Retrieve clicked, showing email input');
    setShowEmailInput(true);
  };

  const handleEmailChange = (e) => {
    console.log('Email changed:', e.target.value);
    setRetrieveEmail(e.target.value);
  };

  const handleRetrieveSubmit = async (e) => {
    console.log('handleRetrieveSubmit called - event:', e);
    e.preventDefault();
    console.log('Email submitted for retrieval:', retrieveEmail);
    try {
      const response = await axios.post(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/SetTempPassword/MMU",
        { email: retrieveEmail }
      );
      console.log('API Response:', response.data);
  
      if (response.data.message === "A temporary password has been sent") {
        alert('Password reset instructions have been sent to your email.');
      } else if (response.data.message === "No such email exists") {
        alert('No account found with this email address. Please check and try again.');
      } else {
        alert('Unable to process your request. Please try again later.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`An error occurred: ${error.response.data.message || 'Please try again later.'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response received from the server. Please check your internet connection and try again.');
      } else {
        console.error('Error setting up request:', error.message);
        alert('An error occurred while setting up the request. Please try again later.');
      }
    }
  
    setShowEmailInput(false);
    setRetrieveEmail('');
  };

  console.log('showEmailInput:', showEmailInput);

  return (
    <div className='App'>
      <div className='red-overlay' />
      <Box sx={{ marginLeft: "15%", marginRight: "15%" }}>
        <Grid container size={12} sx={{ textAlign: "center" }}>
          <Grid size={12} container justifyContent='center'>
            <img src={backgroundImage} alt='accountSetup1Login' />
          </Grid>
          <div className='rounded-box'>
            <div className='title-text' style={{ fontFamily: "Inria Sans" }}>
              meet me up
            </div>
            <div className='header-text' style={{ fontFamily: "Lexend" }}>
              Let’s get you out there
            </div>

            <Box component='form' onSubmit={handleSubmitLogin} sx={{ "& > :not(style)": { m: 2, width: 0.9 } }} autoComplete='off'>
              <TextField required onChange={handleChange} name='email' label='Email' type='email' variant='outlined' />
              <TextField required onChange={handleChange} name='password' label='Password' type='password' autoComplete='current-password' />
              <Button
                onClick={handleSubmitLogin}
                variant='contained'
                type='submit'
                sx={{
                  backgroundColor: "#E4423F",
                  maxWidth: "131px",
                  borderRadius: "41px",
                  boxShadow: "none",
                  textTransform: "none",
                  fontSize: "18px",
                  fontFamily: "Lexend",
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/google-login")}
                variant='contained'
                type='submit'
                sx={{
                  backgroundColor: "#E4423F",
                  maxWidth: "131px",
                  borderRadius: "41px",
                  boxShadow: "none",
                  textTransform: "none",
                  fontSize: "18px",
                  fontFamily: "Lexend",
                }}
              >
                Google Login
              </Button>

              <div className='sub-header-text'>
                Forgot password?
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  {!showEmailInput && (
                    <div className='red-text' onClick={handleRetrieveClick} style={{ cursor: 'pointer' }}>Retrieve here</div>
                  )}
                  

                  {showEmailInput && (
                    <form onSubmit={handleRetrieveSubmit} onClick={() => console.log('Form clicked')}>
                      <TextField
                        type="email"
                        value={retrieveEmail}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        required
                        sx={{
                          mr: 1,
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#E4423F',
                            },
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ backgroundColor: '#E4423F' }}
                        onClick={(e) => {
                          console.log('Submit button clicked');
                          handleRetrieveSubmit(e);
                        }}
                      >
                        Submit
                      </Button>
                    </form>
                  )}
                </Box>
                
              </div>


              <Grid container justifyContent='center' size={12}>
                <hr style={{ width: "90%", borderStyle: "solid", borderColor: "#CECECE" }} />
              </Grid>
            </Box>
            <div className='header-text' style={{ fontFamily: "Lexend", fontWeight: "semibold" }}>
              Not with us yet?
            </div>
            <div className='sub-header-text' style={{ marginLeft: "5%", marginRight: "5%", fontFamily: "DM Sans", fontSize: "14px" }}>
              Diam pulvinar pharetra nulla dolor nullam. Neque aliquam est amet scelerisque. Massa aenean.
            </div>
            <Box component='form' onSubmit={handleSubmitCreate} action='/accountSetup2Create' autoComplete='off' sx={{ "& > :not(style)": { m: 2, width: 0.9 } }}>
              <Button
                variant='contained'
                type='submit'
                sx={{
                  backgroundColor: "#E4423F",
                  maxWidth: "202px",
                  borderRadius: "41px",
                  marginTop: "20px",
                  boxShadow: "none",
                  textTransform: "none",
                  fontSize: "18px",
                  fontFamily: "Lexend",
                }}
              >
                Create Account
              </Button>
            </Box>
            <Box component='form' onSubmit={handleSubmitCreate} action='/googleSignUp' autoComplete='off' sx={{ "& > :not(style)": { m: 2, width: 0.9 } }}>
              <Button
                variant='contained'
                type='submit'
                sx={{
                  backgroundColor: "#E4423F",
                  maxWidth: "202px",
                  borderRadius: "41px",
                  marginTop: "20px",
                  boxShadow: "none",
                  textTransform: "none",
                  fontSize: "18px",
                  fontFamily: "Lexend",
                }}
              >
                Google SignUp
              </Button>
            </Box>
          </div>
        </Grid>
      </Box>
    </div>
  );
}
