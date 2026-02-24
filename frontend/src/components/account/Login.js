import React, {useState} from 'react';
import {useAuth} from "../../AuthContext";
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export function Login() {

    const navigate = useNavigate();
    const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (x) => {
        x.preventDefault();
        const response = await login(email, password);
        if (response) navigate('/');
    }

    return (
        <Container className="my-5 d-flex justify-content-center">
            <Card className="my-2">
                <Card.Title className="text-center p-4">
                    <h2>Login</h2>
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
                            <Col xs={10} className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter password"
                                    required
                                />
                            </Col>
                            <Col xs={10} className="mb-3">
                                <Button type="submit" className="w-100" variant="success">Login</Button>
                            </Col>
                            <Col xs={10} className="mb-3">
                                <Button as={NavLink} to="/register" variant="outline-secondary">Create Account</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}