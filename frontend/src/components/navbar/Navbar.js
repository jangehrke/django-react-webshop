import {NavLink, useNavigate} from "react-router-dom";
import {Container, Nav, NavDropdown, Navbar, Button} from "react-bootstrap";
import {useFetch} from "../../hooks/useApi";
import {useCart} from "../cart/CartContext";
import {useAuth} from "../../AuthContext";

const NavBarCategories = () => {
    const {data: categories = []} = useFetch('/categories/');
    return (
        <>
            <Nav.Link as={NavLink} to="category">Categories</Nav.Link>
            <NavDropdown title="Mangas" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="product/">
                    All
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                {categories.map(category => (
                    <NavDropdown.Item as={NavLink} to={`/product/${category.slug}`} key={category.id}>
                        {category.name}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        </>
    )
}

const NavBarUserArea = () => {
    const {user, logout} = useAuth();
    const {openCart} = useCart();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <>
            <Button variant={"warning"} onClick={openCart} className="m-1">Cart</Button>
            {user
                ? <Button onClick={logout} variant="danger" className="m-1">Logout</Button>
                : <Button onClick={handleLogin} variant="success" className="m-1">Login</Button>
            }
        </>
    )
}

// Main NavbarLayout
const NavbarLayout = () => {
    return (
        <Navbar expand="sm" bg="dark" data-bs-theme="dark" sticky="top">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="product/">Manga Webshop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="flex-grow-1"/>
                    <Nav className="flex-grow-1">
                        <NavBarCategories/>
                    </Nav>
                    <Nav>
                        <NavBarUserArea/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavbarLayout;