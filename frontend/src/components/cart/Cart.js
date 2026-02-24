import Modal from 'react-bootstrap/Modal';
import {useCart} from "./CartContext";
import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const CartItems = ({cart, increase, decrease, controls = true}) => {
    const totalPriceItem = (unit_price, quantity) => unit_price * quantity;
    const totalPriceCart = cart.reduce((prev, curr) => prev + curr.quantity * curr.unit_price, 0);
    return (
        <>
            {cart.length === 0 && <p>Empty</p>}
            {cart.length > 0 && (
                <Row className="fw-bold border-bottom pb-2 mb-2 align-items-center">
                    <Col className="text-center">Product</Col>
                    <Col className="text-center">Qty</Col>
                    {controls && <Col className="text-center"> </Col>}
                    <Col className="text-end">Unit Price</Col>
                    <Col className="text-end">Total</Col>
                </Row>
            )}
            {cart.map((item) => (
                <Row key={item.id} className="align-items-center py-2">
                    <Col className="text-center">{item.product.title}</Col>
                    <Col className="text-center">{item.quantity}</Col>
                    {controls &&
                        <Col className="text-left">
                            <Button variant="outline-danger" size="sm" onClick={() => decrease(item)}>-</Button>
                            <Button variant="outline-success" size="sm" onClick={() => increase(item)}>+</Button>
                        </Col>}
                    <Col className="text-end">{item.unit_price} €</Col>
                    <Col className="text-end">{totalPriceItem(item.quantity, item.unit_price).toFixed(2)} €</Col>
                    <hr/>
                </Row>
            ))
            }
            <Row>
                <Col className="text-end">
                    <strong>Total: {totalPriceCart.toFixed(2)} €</strong>
                </Col>
            </Row>
        </>
    )
}

function Cart() {
    const {cart, cartOpen, closeCart, decreaseQuantity, increaseQuantity} = useCart();
    const navigate = useNavigate();

    function handleCheckout() {
        closeCart();
        navigate("/checkout")
    }

    return (
        <Modal
            size="lg"
            show={cartOpen}
            onHide={closeCart}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Shopping Cart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CartItems cart={cart} increase={increaseQuantity} decrease={decreaseQuantity}/>
                <Row className="mt-3">
                    <Col className="text-end">
                        <Button
                            variant="success"
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                            className="fw-bold"
                        >
                            Checkout
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default Cart;