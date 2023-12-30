import { useContext } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { authorizedUsername } = useContext(AuthContext);

  return (
    <div className="position-relative">
      <Image alt="home-bg" className="w-100 object-fit-cover" loading="lazy" src="./assets/home-bg.jpg" />
      <Container className="position-absolute top-0 start-50 translate-middle-x mt-3 mt-md-5">
        <h2 className="my-3 text-center text-light">Profile</h2>
        <Card className="mx-auto my-3 border-0">
          <Card.Body>
            <Card.Title>Account Details</Card.Title>
            <Card.Text>Username: <strong>{authorizedUsername}</strong></Card.Text>
            <Card.Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
