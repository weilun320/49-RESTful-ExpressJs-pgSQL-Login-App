import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css";

const API_URL = "https://48-restful-expressjs-pgsql-login-api.vercel.app";

export function Layout() {
  return (
    <>
      <Navbar bg="light" expand="md" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Login App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login API_URL={API_URL} />} />
          <Route path="signup" element={<SignUp API_URL={API_URL} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
