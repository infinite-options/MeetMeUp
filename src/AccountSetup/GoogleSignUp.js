import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import axios from "axios";
import { formatPhoneNumber } from "./helper";
import UserAlreadyExistsModal from "./UserAlreadyExistsModal";
import "./GoogleSignUp.css";
import GoogleSignUpIcon from "../Assets/Images/googlesignupIcon.webp"

let CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
let CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const GOOGLE_LOGIN = process.env.REACT_APP_GOOGLE_LOGIN;
let SCOPES =
  "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

function GoogleSignup(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socialId, setSocialId] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [accessExpiresIn, setAccessExpiresIn] = useState("");
  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const [isGoogleApiReady, setIsGoogleApiReady] = useState(false);

  const codeClientRef = useRef(null);

  const getAuthorizationCode = () => {
    if (codeClientRef.current) {
      codeClientRef.current.requestCode();
    } else {
      console.error("Code Client not initialized");
    }
  };

  useEffect(() => {
    const loadGoogleApi = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleApiReady(true);
      document.body.appendChild(script);
    };

    loadGoogleApi();
  }, []);

  useEffect(() => {
    if (isGoogleApiReady) {
      codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          if (tokenResponse && tokenResponse.code) {
            const auth_code = tokenResponse.code;
            const authorization_url =
              "https://accounts.google.com/o/oauth2/token";

            const details = {
              code: auth_code,
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              redirectUri: "postmessage",
              grant_type: "authorization_code",
            };

            const formBody = Object.keys(details)
              .map(
                (key) =>
                  encodeURIComponent(key) +
                  "=" +
                  encodeURIComponent(details[key])
              )
              .join("&");

            fetch(authorization_url, {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=UTF-8",
              },
              body: formBody,
            })
              .then((response) => response.json())
              .then((data) => {
                const at = data["access_token"];
                const rt = data["refresh_token"];
                const ax = data["expires_in"];

                setAccessToken(at);
                setRefreshToken(rt);
                setAccessExpiresIn(ax);

                axios
                  .get(
                    `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${at}`
                  )
                  .then((response) => {
                    const userData = response.data;
                    console.log("userdata:", userData)
                    const e = userData["email"];
                    console.log('email:', e);
                    const si = userData["id"];

                    setEmail(e);
                    setSocialId(si);


                    const socialGoogle = async () => {
                      const user = {
                        email: e,
                        password: GOOGLE_LOGIN,
                        phone_number: phoneNumber,
                        google_auth_token: at,
                        google_refresh_token: rt,
                        social_id: si,
                        access_expires_in: "3599",
                      };

                      axios
                        .post(
                          "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UserSocialSignUp/MMU",
                          user
                        )
                        .then((response) => {
                          if (response.data.message === "User already exists") {
                            setUserAlreadyExists(true);
                          } else {
                            setSignupSuccessful(true);
                          }
                        });
                    };
                    socialGoogle();
                  })
                  .catch((error) => {
                    console.error("Error fetching user info:", error);
                  });
              })
              .catch((error) => {
                console.error("Error fetching tokens:", error);
              });
          }
        },
      });
    }
  }, [isGoogleApiReady, firstName, lastName, phoneNumber]);

  const onCancel = () => {
    setUserAlreadyExists(false);
  };


  return (
    <Container >
      <UserAlreadyExistsModal
        isOpen={userAlreadyExists}
        onCancel={onCancel}
        email={email}
      />
      <Row className="SignUpTitle">Google Signup</Row>
      {signupSuccessful ? (
        <div>
          <Row>
            <div className="d-flex flex-column justify-content-start mt-5">
              <div className="text-center">
                <p className="signUpSuccessful">Signup Successful</p>
                <Button
                  variant="primary"
                  onClick={() => navigate("/accountSetup1Login")}
                  className="mb-4"
                  style={{ textTransform: "none", borderRadius: "50px", padding: '15px', cursor: 'pointer', display: 'flex', backgroundColor: 'White' }}
                >
                  Login
                </Button>
              </div>
            </div>
          </Row>
        </div>
      ) : (
        <Row className="w-100">
          <Col></Col>
          <Col>
            <Form style={{ marginTop: '150px' }}>
              <Row>
                <Col>
                  <Form.Group className="firstName" controlId="formFirstName">
                    <Form.Label className="label">First Name</Form.Label>
                    <Form.Control
                      style={{
                        borderRadius: '10px',
                        padding: '10px'
                      }}
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="lastName" controlId="formLastName">
                    <Form.Label className="label">Last Name</Form.Label>
                    <Form.Control
                      style={{
                        borderRadius: '10px',
                        padding: '10px'
                      }}
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="phoneNumber" controlId="formPhoneNumber">
                <Form.Label className="label">Phone Number</Form.Label>
                <Form.Control
                  style={{
                    borderRadius: '10px',
                    padding: '10px'
                  }}
                  placeholder="(xxx)xxx-xxxx"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(formatPhoneNumber(e.target.value))
                  }
                />
              </Form.Group>
            </Form>
            <div id="signUpDiv" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <Button
                className="btn btn-outline-dark"
                onClick={() => getAuthorizationCode()}
                role="button"
                style={{ textTransform: "none", borderRadius: "50px", padding: '15px', cursor: 'pointer', display: 'flex', backgroundColor: 'White' }}
              >
                <img
                  width="20px"
                  style={{ marginBottom: "3px", marginRight: "5px" }}
                  alt="Google sign-in"
                  src={GoogleSignUpIcon}
                />
                Sign Up with Google
              </Button>
            </div>
            {/* <div id="signUpDiv" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <Button
                role="button"
                style={{ textTransform: "none", borderRadius: "15px", padding: '10px',width:'60px', cursor: 'pointer', display: 'flex', backgroundColor: 'White' }}
              >
                
                Login
              </Button>
            </div> */}
          </Col>
          <Col></Col>
        </Row>
      )}
    </Container>
  );
}

export default GoogleSignup;

