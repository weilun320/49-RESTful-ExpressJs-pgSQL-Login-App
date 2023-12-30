import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, Image, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login({ API_URL }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [signUpSuccessMessage, setSignUpSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const successMessage = location.state?.successMessage || "";
    setSignUpSuccessMessage(successMessage);

    const timeoutId = setTimeout(() => {
      setSignUpSuccessMessage("");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [location.state]);

  const handleLogin = (e) => {
    e.preventDefault();
    setResponseMessage("");
    setIsLoading(true);

    if (!username || !password) {
      setResponseMessage("Please fill up all fields.");
      setIsLoading(false);

      return;
    }

    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (res.ok) {
          return res.json().then(data => {
            return data.token;
          });
        }
        else {
          return res.json().then(data => data.token);
        }
      })
      .then(authData => {
        if (authData) {
          fetch(`${API_URL}/username`, {
            method: "GET",
            headers: { "Authorization": authData }
          })
            .then(res => {
              if (res.ok) {
                return res.json().then(data => data.username);
              }
            })
            .then(updatedData => {
              navigate("/", { state: { successMessage: "User login successfully", username: updatedData } });
            })
            .catch(error => console.error(error));
        }
        else {
          setResponseMessage("Username or password incorrect");
          setIsLoading(false);
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      {signUpSuccessMessage && (
        <Alert className="text-center mb-0" variant="success">
          {signUpSuccessMessage}
        </Alert>
      )}
      <div className="position-relative">
        <Image alt="mountain-bg" className="w-100 object-fit-cover" loading="lazy" src="./assets/mountain-bg.jpg" />
        <Container className="position-absolute top-0 start-50 translate-middle-x mt-3 mt-md-5">
          <Card className="mx-auto my-3 border-0">
            <Card.Body>
              <h2 className="mb-3">Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter username"
                    type="text"
                    value={username}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    value={password}
                  />
                </Form.Group>
                {responseMessage &&
                  <p className="text-danger">{responseMessage}</p>
                }
                {isLoading ? (
                  <>
                    <Spinner
                      animation="border"
                      as="span"
                      className="me-2"
                      size="sm"
                      role="status"
                      variant="primary"
                    />
                    <span>Loading...</span>
                  </>
                )
                  : (
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  )}
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
