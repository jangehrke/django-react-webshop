import React, {useState} from 'react';
import {useAuth} from "../../AuthContext";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useAlert} from "../alerts/AlertContext";

export function Register() {

    const navigate = useNavigate();
    const { register } = useAuth();
    const { showAlert} = useAlert();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submit = async (x) => {
        x.preventDefault();
        if (password !== confirmPassword) {
            showAlert('danger', "Passwords don´t match")
            return;
        }
        const response = await register(email, password, confirmPassword);
        (response) ? navigate('/') : showAlert('danger', "Something went wrong!");
    }

    return (
        <Container className="my-5 d-flex justify-content-center">
            <Card className="my-2">
                <Card.Title className="text-center p-4">
                    <h2>Register</h2>
                </Card.Title>
                <Card.Body>
                    <Form onSubmit={submit} className="row g-3 justify-content-center">
                        <Row className="w-100 justify-content-center">
                            <Col xs={10} className="mb-3">
                                <label className="form-label">Email address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter email"
                                    required
                                />
                            </Col>
                            <Col xs={5} className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter password"
                                />
                            </Col>
                            <Col xs={5} className="mb-4">
                                <label className="form-label">Confirm password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter password again"
                                />
                            </Col>
                            <Col xs={10} className="mb-3">
                                <Button type="submit" className="w-100" variant="success">Create Account</Button>
                            </Col>
                            <Col xs={10} className="mb-3">
                                <Button as={NavLink} to="/login" variant="outline-danger">Back to login</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}