import React, { useState } from 'react';
import NavBar from "./Nav";
import "../App.css"
import axios from "axios";

const Register = () => {
	const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const register = async (e) =>{
        e.preventDefault();
        resetAlert();
        var isValid = true;
        if(email == ""){
            isValid = false;
            setErrorAlert("Email is empty");
        }
        if(name == ""){
            isValid = false;
            setErrorAlert("Name is empty");
        }
        if(password == ""){
            isValid = false;
            setErrorAlert("Password is empty");
        } 
        if(cPassword != password){
            isValid = false;
            setErrorAlert("Retype password");
         } 
        if(isValid){
            await axios.post('https://appsasikanth.herokuapp.com/user/register', {
                username: name,
                useremail: email,
                password: password,
            }).then(function (response) {
                setName('');
                setEmail('');
                setPassword('');
                setCPassword('');
                setSuccessAlert(response.data.message);
              })
              .catch(function (error) {
                console.log(error);
                if (error.response) {
                    setErrorAlert(error.response.data.message);
                }
              })
        }
    }
    const resetAlert = () =>{
        setErrorAlert(false);
        setSuccessAlert(false);
    }
    return (
      <div>
        <NavBar />
        <div class="container">
            <div className="row justify-content-center">
                <div className="col-md-8 col-sm-12 col-xl-6">
                    <div className="box box-down cyan mt-5">
                        {successAlert && 
                            <div className="alert alert-success" role="alert">
                                {successAlert}
                            </div>
                        }

                        {errorAlert && 
                            <div className="alert alert-danger" role="alert">
                                {errorAlert}
                            </div>
                        }
                        <div class="form-group mb-3">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="username" id="username" tabindex="1" class="form-control" placeholder="Username"/>
                        </div>
                        <div class="form-group mb-3">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address"/>
                        </div>
                        <div class="form-group mb-3">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password"/>
                        </div>
                        <div class="form-group mb-3">
                            <input value={cPassword} onChange={(e) => setCPassword(e.target.value)} type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password"/>
                        </div>
                        <div className="row justify-content-center">
                            <button onClick={register} style={{width:"auto"}} className="btn btn-sm btn-cyan">Register Now</button>
                        </div>
                    </div>
                </div>
            </div>
	    </div>
        
    </div>
    );
}
export default Register;