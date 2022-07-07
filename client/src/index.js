import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import Profile from "./components/Profile"
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
  <BrowserRouter>
      <Routes>
=======
  <BrowserRouter className=" test class">
      <Routes className="test 2">
>>>>>>> 8e9dc1169c5438c2bc40e1a2a47d8f8fcb5d9eb8
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
  </BrowserRouter>
);

