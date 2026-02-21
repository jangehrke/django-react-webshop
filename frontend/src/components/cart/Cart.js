import Modal from 'react-bootstrap/Modal';
import {useCart} from "./CartContext";
import {Button, Col, Row} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";

function Cart() {
    const { cartOpen, closeCart, cart, decreaseQuantity, increaseQuantity} = useCart();
    const navigate = useNavigate();

    function totalPriceItem(unit_price, quantity) {
        return unit_price * quantity;
    }
    const totalPriceCart = cart.reduce((prev, curr) => prev + curr.quantity * curr.unit_price, 0);

    function handleCheckout() {
        closeCart();
        navigate("/checkout")
    }

    return (
        <Modal
            size="lg"
            show={cartOpen}
            onHide={closeCart}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Shopping Cart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cart.length === 0 && <p>Empty</p>}
                {cart.length > 0 && (
                    <Row className="fw-bold border-bottom pb-2 mb-2 align-items-center">
                        <Col className="text-center">Product</Col>
                        <Col className="text-center">Qty</Col>
                        <Col className="text-center"> </Col>
                        <Col className="text-end">Unit Price</Col>
                        <Col className="text-end">Total</Col>
                    </Row>
                )}
                {cart.map((item) => (
                    <Row key={item.id} className="align-items-center py-2">
                        <Col className="text-center">{item.product.title}</Col>
                        <Col className="text-center">{item.quantity}</Col>
                        <Col className="text-left">
                            <Button variant="outline-danger" size="sm" onClick={() => decreaseQuantity(item)}>-</Button>
                            <Button variant="outline-success" size="sm" onClick={() => increaseQuantity(item)}>+</Button>
                        </Col>
                        <Col className="text-end">{item.unit_price} €</Col>
                        <Col className="text-end">{totalPriceItem(item.quantity,  item.unit_price).toFixed(2)} €</Col>

                        <hr/>
                    </Row>
                ))
                }
                <Row className="mt-3 align-items-center">
                    <Col className="text-center">
                        <Button variant="primary" onClick={handleCheckout} disabled={cart.length === 0}>
                            Checkout
                        </Button>
                    </Col>
                    <Col className="text-end">
                        <strong>Total: {totalPriceCart.toFixed(2)} €</strong>
                    </Col>
                </Row>

            </Modal.Body>
        </Modal>
    );
}

export default Cart;