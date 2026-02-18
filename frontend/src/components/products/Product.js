import {Card, Col, Row, Nav, Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useCart} from "../cart/CartContext";

export default function ProductGrid({products}) {
    const {addToCart} = useCart()

    return (
        <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4 pb-5">
            {products.map((product) => (
                <Col key={product.id}>
                    <Card bg="dark" text="light">
                        <Nav.Link as={NavLink} to={`/product/details/${product.id}`}>
                            <Card.Img variant="top" src={product.cover
                                ? "/images/" + product.cover
                                : "/images/op_cover.jpeg"}
                                      style={{
                                          height: "400px",
                                          objectFit: "cover"
                                      }}/>
                        </Nav.Link>
                        <Card.Body>
                            <Card.Title
                                style={{
                                    minHeight: "50px",
                                    overflow: "hidden"
                                }}
                            >{product.title}</Card.Title>
                            <Card.Title>{product.price} €</Card.Title>
                            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
