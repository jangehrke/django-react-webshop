import {NavLink} from "react-router-dom";
import {Container, Nav, NavDropdown, Navbar, Button} from "react-bootstrap";
import {useFetch} from "../../hooks/useApi";
import {useCart} from "../cart/CartContext";
import {useAuth} from "../../AuthContext";


const NavbarLayout = () => {
    const {data: categories = [], error} = useFetch('/categories/');
    const {user, logout} = useAuth();
    const {openCart} = useCart();
    return (
        <Navbar expand="sm" bg="dark" data-bs-theme="dark" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Manga Webshop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
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
                    </Nav>
                    <Nav>
                        <Button onClick={openCart}>Cart</Button>
                        {user
                            ? <Button onClick={logout}>Logout</Button>
                            : <Nav.Link as={NavLink} to="login">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavbarLayout;