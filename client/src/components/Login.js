import React, { useState, useEffect } from 'react';
import axios from "axios";
import NavBar from "./Nav";
import { useNavigate } from 'react-router-dom';
import "../App.css"
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorAlert, setErrorAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        await axios.get('http://localhost:3001/user/token').
            then(function (response) {
                //if user is logged in redirect to profile page
                navigate("/profile");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                if (error.response) {
                }
            })
    }

    const loginUser = async (e) => {
        e.preventDefault();
        setErrorAlert(false);
        //check if password and email is not empty
        var isValid = true;
        if (email == "") {
            isValid = false;
            setErrorAlert("Email is required");
        }
        if (password == "") {
            isValid = false;
            setErrorAlert("Password is required");
        }

        if (isValid) {
            await axios.post('http://localhost:3001/user/login', {
                email: email,
                password: password,
            }).then(function (response) {
                setEmail('');
                setPassword('');
                // handle success
                console.log(response);
                navigate("/profile");
            })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    if (error.response) {
                        setErrorAlert(error.response.data.message);
                    }
                })
        }
    }
    return (
        <div className="login-container">
            <NavBar />

            <div className="container login-form-container " >
                <div className="row custom-login-row">
                    <div className="col-md-5 custom-login-column">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                {errorAlert &&
                                    <div className="alert alert-danger" role="alert">
                                        {errorAlert}
                                    </div>
                                }
                                <form id="login-form" className="form-horizontal" action="https://phpoll.com/login/process" method="post" role="form" >

                                    <div className="form-group">
                                        <label for="inputEmail3" className="col-sm-3 control-label">Email</label>
                                        <div className="col-sm-9">
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="useremail" id="useremail" class="form-control mt-3 mb-3" placeholder="Useremail" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="inputPassword3" className="col-sm-3 control-label">Password</label>
                                        <div className="col-sm-9">
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" class="form-control mb-3" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-offset-3 col-sm-9">

                                            <div className="checkbox">
                                                <label className="">
                                                    <input type="checkbox" className="" />Remember me</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group last">
                                        <div className="col-sm-offset-3 col-sm-9">

                                            <button type="submit" onClick={loginUser} name="login-submit" id="login-submit" className="btn btn-success btn-sm">Login</button>
                                            <button type="button" className="btn btn-default btn-sm"> <a href="https://phpoll.com/recover" target="_blank" className="forgot-password">Forgot Password?</a></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;