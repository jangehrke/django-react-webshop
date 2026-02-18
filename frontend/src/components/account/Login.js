import React, {useState} from 'react';
import {useAuth} from "../../AuthContext";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
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
        <div className="container-fluid">
            <h1>Login</h1>
            <form onSubmit={submit}>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"/>
                    </div>
                    <div className="form-check">
                        <button type="submit" className="btn btn-primary">Login</button>
                        <Button as={NavLink} to="/register">Create Account</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}