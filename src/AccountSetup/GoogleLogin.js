import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserDoesNotExistModal from "./UserDoesNotExistModal";


const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function GoogleLogin(props) {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [userDoesntExist, setUserDoesntExist] = useState(false);

  async function handleCallBackResponse(response) {
    try {
      
      const userObject = jwtDecode(response.credential);
      const emailAddress = userObject.email;
  

      if (emailAddress) {

        const url = `https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UserSocialLogin/MMU/${emailAddress}`;
        const serverResponse = await axios.get(url, {
          params: {
            id_token: response.credential, 
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
  

        console.log("Server Response:", serverResponse);
  

        if (serverResponse.data && serverResponse.data.code === 200) {
          setNewEmail(emailAddress); 
          setLoginSuccessful(true);
          setUserDoesntExist(false); 
          navigate("/accountSetup2Create"); 
        } else {
          setUserDoesntExist(true); 
        }
      }
    } catch (error) {
      console.error("Error handling Google login:", error);
      setUserDoesntExist(true); 
    }
  }

  useEffect(() => {
    /* global google */
    if (window.google) {
      
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCallBackResponse,
      });

     
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "pill",
      });
    }
  }, []);


  const onCancelModal = () => {
    setUserDoesntExist(false);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">

      {
        <UserDoesNotExistModal
          isOpen={userDoesntExist}
          onCancel={onCancelModal}
          email={newEmail}
        />
      }
      <Row className="m-5">Google Login</Row>
      {loginSuccessful ? (
        <div>Login Successful! Redirecting...</div>
      ) : (
        <Row>
          <Col></Col>
          <Col>
            <div id="signInDiv"></div>
            {showSpinner && (
              <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <ReactBootStrap.Spinner animation="border" role="status" />
              </div>
            )}
          </Col>
          <Col></Col>
        </Row>
      )}
    </Container>
  );
}

export default GoogleLogin;
