import React, { useState, useEffect } from 'react';
import Navbar from "./Nav";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {Modal, Form, Button} from 'react-bootstrap'
import '../App.css'

//import "../App.css"
const Profile = () => {
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoaded, setIsLoaded] = useState(false); //set true if tocken is valid
    const [token, setToken] = useState('');
    const [show, setShow] = useState(false);
    //posts
    const [post, setPost] = useState('');
    const [posts, setPosts] = useState([]);
    //alerts
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        await axios.get('https://appsasikanth.herokuapp.com/user/token').
            then(function (response) {
                // handle success
                const decoded = jwt_decode(response.data.accessToken);
                setToken(response.data.accessToken);
                setIsLoaded(true);
                setUserId(decoded.userid);
                setName(decoded.username);
                setUserEmail(decoded.email); 
              })
              .catch(function (error) {
                // handle error
                console.log(error);
                if (error.response) {
                    navigate("/");
                }
             })
    }
    //show or hide modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveNewPost = async (e) => {
        e.preventDefault();
        setErrorAlert(false);
        setSuccessAlert(false);
        let validPost = true;
        if(post == ""){
            validPost = false;
            setErrorAlert("Post can not be empty");
        }

        if(validPost){
            await axios.post('https://appsasikanth.herokuapp.com/post/postcreate', {
                postcontent: post,
                userid: userId
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(function (response) {
                // handle success
                console.log(response);
                setPost('');
                setSuccessAlert(response.data.message);
                getUserPosts();
                setTimeout(()=>{
                    setSuccessAlert(false);
                    setErrorAlert(false);
                    handleClose();
                }, 4000);
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

    const deleteUserPost = async (e,post) => {
        e.preventDefault();
        const options = {
            method: 'DELETE',
            credentials: "include",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id: post._id })
        };
        fetch('https://appsasikanth.herokuapp.com/post/deletePost', options)
            .then(response =>response.json())
            .then(data => {
                //console.log('Success:', data);
                getUserPosts();
                alert(data.success)
              })
            .catch(error => {
                if (error.response) {
                    alert('Error post not deleted');
                }
            });;
    }

    const getUserPosts = async () =>{
        await axios.post('https://appsasikanth.herokuapp.com/post/viewposts', {
            userid: userId
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            // handle success
            console.log(response.data);
            setPosts(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
    }

    if(isLoaded){
        getUserPosts();
        setIsLoaded(false);
    }
    return (
        <>
            <Navbar/>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-md-8 col-sm-12 col-xl-6">
                     <div className="box box-down cyan mt-5">
                        <h3 className="text-center">Name: {name}</h3>
                        <h4 className='text-center'>Email: {userEmail}</h4>
                        <div className="row justify-content-center">
                            <button onClick={handleShow} style={{width:"auto"}} className="btn btn-sm btn-cyan">create post</button>
                        </div>
                     </div>
                  </div>
               </div>

               {posts.length == 0 &&
                    <div key={post.postid} className="row justify-content-center">
                        <div className="col-md-8 col-sm-12 col-xl-6">
                            <div className="box box-down cyan">
                                <p className="text-center">You have zero post</p>
                            </div>
                        </div>
                    </div>
               }
               
               {posts.map((post,) => (
                    <div key={post.postid} className="row justify-content-center">
                        <div className="col-md-8 col-sm-12 col-xl-6">
                            <div className="box box-down cyan">
                                <h4>Post</h4>
                                <p>{post.postcontent}</p>
                                <button onClick={e=> deleteUserPost(e,post)} style={{width:"auto"}} className="btn btn-sm btn-delete">delete</button>
                            </div>
                        </div>
                    </div>
               ))}
               <div className="row">
               <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>New post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {successAlert && 
                            <div className="alert alert-success alert-border" role="alert">
                                {successAlert}
                            </div>
                        }

                        {errorAlert && 
                            <div className="alert alert-danger alert-border" role="alert">
                                {errorAlert}
                            </div>
                        }
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Post content</Form.Label>
                                <Form.Control
                                    as="textarea" 
                                    rows={3}
                                    value={post} 
                                    onChange={(e) => setPost(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" className="btn-sm" onClick={handleClose}>
                        Close
                    </Button>
                    <button onClick={saveNewPost} style={{width:"auto"}} className="btn btn-sm btn-cyan">create post</button>
                    </Modal.Footer>
                </Modal>
               </div>
            </div>
        </>
    );
}
export default Profile;