import {useCart} from "./CartContext";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {CartItems} from "./Cart";
import {useAuth} from "../../AuthContext";
import React, {useState} from "react";
import {usePost} from "../../hooks/useApi";
import {useNavigate} from "react-router-dom";
import {useAlert} from "../alerts/AlertContext";

export function Checkout() {
    const {cart, setCart} = useCart();
    const {user} = useAuth();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const {postData} = usePost('checkout/');

    const [createAccount, setCreateAccount] = useState(false)

    const [email, setEmail] = useState(user?.email || "")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [extra, setExtra] = useState("")
    const [postal, setPostal] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("Germany")

    const submit = async (x) => {
        x.preventDefault();
        const payload = {
            email,
            create_account: createAccount,
            shipping_address: {
                first_name: firstName,
                last_name: lastName,
                address: address,
                address_extra: extra,
                postal_code: postal,
                city: city,
                country: country,
            },
            cart: cart
        }
        const response = await postData(payload)
        if (response.status === 201) {
            setCart([])
            showAlert('success', "Order placed successfully!");
            navigate(`/product`)
        } else {
            return response.status
        }
    }

    return (
        <Container fluid className="my-2">
            <Row>
                <Col lg={12} md={6} sm={6} className="mb-4">
                    <h1 className="text-center fw-bold">Overview</h1>
                </Col>
                <Col lg={6}>
                    <h2>Shipping Details</h2>
                    <Card className="mb-2 p-2">
                        <Card.Body>
                            <Form onSubmit={submit} className="row g-3">
                                {!user && (
                                    <>
                                        <Col xs={12}>
                                            <h5 className="fw-bold">Personal Information</h5>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Check
                                                type="checkbox"
                                                label="Create an Account"
                                                checked={createAccount}
                                                onChange={(e) => setCreateAccount(e.target.checked)}
                                            />
                                        </Col>

                                        <Col md={6}>
                                            <Form.Control
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </Col>
                                        <Col md={6}>
                                            {createAccount && (
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            )}
                                        </Col>
                                    </>
                                )}
                                <Col xs={12}>
                                    <hr className="my-2"/>
                                    <h5 className="fw-bold">Address</h5>
                                </Col>

                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputFirstName"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputLastName"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAddressExtra"
                                        placeholder="Extra"
                                        value={extra}
                                        onChange={(e) => setExtra(e.target.value)}/>
                                </div>
                                <div className="col-md-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputPostal"
                                        placeholder="PLZ"
                                        value={postal}
                                        onChange={(e) => setPostal(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputCity"
                                        placeholder="City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <select
                                        id="inputCountry"
                                        className="form-select"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        <option value="Germany">Germany</option>
                                        <option value="Austria">Austria</option>
                                    </select>
                                </div>
                                <hr/>
                                <Col xs={12} className="mt-2">
                                    <Button type="submit" className="w-100" variant="success">Place Order</Button>
                                </Col>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={5}>
                    <h2>Cart</h2>
                    <CartItems cart={cart} controls={false}/>
                </Col>
            </Row>
        </Container>
    )
}