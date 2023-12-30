import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RequireAuth from "./auth/RequireAuth";
import "./App.css";

const API_URL = "https://48-restful-expressjs-pgsql-login-api.vercel.app";

export function Layout({ token, setToken }) {
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      <Navbar bg="light" expand="md" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Login App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              {token ? (
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                  <Nav.Link as={Link} onClick={handleLogout}>Logout</Nav.Link>
                </>
              )
                : (
                  <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                  </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [authorizedUsername, setAuthorizedUsername] = useLocalStorage("authorizedUsername", null);

  return (
    <AuthContext.Provider value={{ token, setToken, authorizedUsername, setAuthorizedUsername }}>
      <BrowserRouter basename="/49-RESTful-ExpressJs-pgSQL-Login-App/">
        <Routes>
          <Route path="/" element={<Layout token={token} setToken={setToken} />}>
            <Route index element={<Home />} />
            <Route path="profile" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />
            <Route path="login" element={<Login API_URL={API_URL} />} />
            <Route path="signup" element={<SignUp API_URL={API_URL} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
