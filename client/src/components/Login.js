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
        await axios.get('https://appsasikanth.herokuapp.com/user/token').
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

    const loginUser =  async (e) =>{
        e.preventDefault();
        setErrorAlert(false);
        //check if password and email is not empty
        var isValid = true;
        if(email == ""){
            isValid = false;
            setErrorAlert("Email is required");
        }
        if(password == ""){
            isValid = false;
            setErrorAlert("Password is required");
        } 

        if(isValid){
            await axios.post('https://appsasikanth.herokuapp.com/user/login', {
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
        <div>
            <NavBar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-sm-12 col-xl-6">
                        <div className="box box-down cyan mt-5">
                        {errorAlert && 
                                        <div className="alert alert-danger" role="alert">
                                            {errorAlert}
                                        </div>
                                    }
                            <div class="form-group">
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="useremail" id="useremail" class="form-control mt-3 mb-3" placeholder="Useremail"/>
                                        </div>
                                        <div class="form-group">
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" class="form-control mb-3" placeholder="Password"/>
                                        </div>
                            <div className="row justify-content-center">
                                <button onClick={loginUser} style={{width:"auto"}} className="btn btn-cyan">Log In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;