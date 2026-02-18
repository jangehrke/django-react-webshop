import React, {useState} from 'react';
import {useAuth} from "../../AuthContext";
import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
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
            return;
        }
        const response = await register(email, password, confirmPassword);
        (response) ? navigate('/') : showAlert('danger', "Something went wrong!");
    }

    return (
        <div className="container-fluid">
            <h1>Register</h1>
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
                            aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text"></div>

                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"/>

                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"/>
                    </div>
                    <div className="form-check p-2">
                        <button type="submit" className="btn btn-primary">Register</button>
                        <Button as={NavLink} to="/login">Already have an account?</Button>
                    </div>
                </div>
            </form>
        </div>

    )
}