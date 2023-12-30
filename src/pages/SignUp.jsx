import { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Form, Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SignUp({ API_URL }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = useContext(AuthContext).token;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleSignUp = (e) => {
    e.preventDefault();
    setResponseMessage(null);
    setIsLoading(true);

    if (!username || !password || !confirmPassword) {
      setResponseMessage({
        status: "error",
        message: "Please fill up all fields."
      });
      setIsLoading(false);

      return;
    }

    if (password !== confirmPassword) {
      setResponseMessage({
        status: "error",
        message: "Password must match Confirm Password."
      });
      setIsLoading(false);

      return;
    }

    fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (res.ok) {
          return res.json().then(data => ({ status: "success", message: data.message }));
        }
        else {
          return res.json().then(data => ({ status: "error", message: data.message }));
        }
      })
      .then(updatedResponseMessage => {
        setResponseMessage(updatedResponseMessage);
        setIsLoading(false);

        if (updatedResponseMessage && updatedResponseMessage.status === "success") {
          navigate("/login", { state: { successMessage: updatedResponseMessage.message } });
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="position-relative">
      <Image alt="mountain-bg" className="w-100 object-fit-cover" loading="lazy" src="./assets/mountain-bg.jpg" />
      <Container className="position-absolute top-0 start-50 translate-middle-x mt-3 mt-md-5">
        <Card className="mx-auto my-3 border-0">
          <Card.Body>
            <h2 className="mb-3">Sign Up</h2>
            <Form onSubmit={handleSignUp}>
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
              <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                />
              </Form.Group>
              {responseMessage && responseMessage.status === "error" &&
                <p className="text-danger">{responseMessage.message}</p>
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
                    Sign Up
                  </Button>
                )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
