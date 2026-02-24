import {useFetch} from "../../hooks/useApi";
import {useParams} from "react-router-dom";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useCart} from "../cart/CartContext";


export function ProductDetails() {
    const {product_id} = useParams();
    const {data: product = {}} = useFetch(`product/${product_id}`);
    const {addToCart, isInCart} = useCart()

    const inCart = isInCart(product.id);

    return (
        <Container className="my-5">
            <Row className="align-items-center">
                <Col md={5} className="mb-4">
                    <Card className="border-0">
                        <Card.Img src={
                            product.cover
                                ? "/images/" + product.cover
                                : "/images/op_cover.jpeg"}
                                  className="p-3"
                                  style={{objectFit: "contain", height: "600px", border: "1px solid black"}}
                        />
                    </Card>
                </Col>
                <Col md={7}>
                    <h1 className="display-5 fw-bold">{product.title}</h1>
                    <h3 className="mb-4">{product.price} €</h3>
                    <p className="text-muted mb-4">{product.description}</p>
                    <Button
                        onClick={() => addToCart(product)}
                        variant={inCart ? "danger" : "success"}
                        disabled={inCart}
                    >
                        {inCart ? "Already in Cart" : "Add To Cart"}
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}