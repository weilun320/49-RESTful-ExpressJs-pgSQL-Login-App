import { useContext, useEffect, useState } from "react";
import { Alert, Container, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
  const [isAuthorize, setIsAuthorize] = useState("");

  const { token, authorizedUsername } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const successMessage = location.state?.successMessage || "";
    setLoginSuccessMessage(successMessage);
    const authorizeUsername = location.state?.username || "";

    if (authorizeUsername) {
      setIsAuthorize(authorizeUsername);
    }
    else {
      setIsAuthorize(authorizedUsername);
    }

    const timeoutId = setTimeout(() => {
      setLoginSuccessMessage("");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [authorizedUsername, location.state]);

  return (
    <>
      {loginSuccessMessage && (
        <Alert className="text-center mb-0" variant="success">
          {loginSuccessMessage}
        </Alert>
      )}
      <div className="position-relative">
        <Image alt="home-bg" className="w-100 object-fit-cover" loading="lazy" src="./assets/home-bg.jpg" />
        <Container className="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="text-light title">
            {token ? `Welcome, ${isAuthorize}` : "Home Page"}
          </h1>
        </Container>
      </div>
    </>
  );
}
