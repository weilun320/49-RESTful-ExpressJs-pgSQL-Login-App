import { useEffect, useState } from "react";
import { Alert, Container, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
  const [isAuthorize, setIsAuthorize] = useState("");
  const location = useLocation();

  useEffect(() => {
    const successMessage = location.state?.successMessage || "";
    setLoginSuccessMessage(successMessage);
    const authorizeUsername = location.state?.username || "";
    setIsAuthorize(authorizeUsername);

    const timeoutId = setTimeout(() => {
      setLoginSuccessMessage("");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [location.state]);

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
            {isAuthorize ? `Welcome, ${isAuthorize}` : "Home Page"}
          </h1>
        </Container>
      </div>
    </>
  );
}
