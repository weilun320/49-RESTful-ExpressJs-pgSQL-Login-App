import { Container, Image } from "react-bootstrap";

export default function Home() {
  return (
    <div className="position-relative">
      <Image alt="home-bg" className="w-100 object-fit-cover" loading="lazy" src="./assets/home-bg.jpg" />
      <Container className="position-absolute top-50 start-50 translate-middle text-center">
        <h1 className="text-light title">
          Home Page
        </h1>
      </Container>
    </div>
  );
}
