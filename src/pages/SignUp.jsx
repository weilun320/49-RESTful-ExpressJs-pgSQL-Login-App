import { useState } from "react";
import { Button, Card, Container, Form, Image } from "react-bootstrap";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="position-relative">
      <Image alt="mountain-bg" className="w-100 object-fit-cover" loading="lazy" src="./assets/mountain-bg.jpg" />
      <Container className="position-absolute top-0 start-50 translate-middle-x mt-3 mt-md-5">
        <Card className="mx-auto my-3 border-0">
          <Card.Body>
            <h2 className="mb-3">Sign Up</h2>
            <Form>
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
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
