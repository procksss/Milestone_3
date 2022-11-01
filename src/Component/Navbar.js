
import {  Link, useLocation } from "react-router-dom";
import React from 'react';

import { useContext,useState, useRef } from 'react';
import AuthContext from "../context/auths/AuthContext";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
export default function Navbar () {
  const context = useContext(AuthContext);
  const {cart} = context;
  let navigate = useNavigate();
  let location = useLocation();
  const handlelogout =(e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('firstname')
    localStorage.removeItem('admin')
    navigate('/login')
    window.location.reload();
  }
 
    return (
      <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <Link className="navbar-brand" to="/">MediStore</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}` } aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}` } aria-current="page" to="/about">About</Link>
        </li>
      </ul>

      {!localStorage.getItem('token')?<div><Link className="btn btn-info mx-1" to="/login" role="button">Login</Link>
<Link role="button" className="btn btn-info mx-1" to="/signup" >
  SignUp
</Link></div>:<div >

<Link type="button" className="btn btn-danger" to="/cart"> <i className="fa-solid fa-cart-shopping"></i> Cart <span className="badge text-bg-secondary">{cart.length}</span></Link>

  <div className="btn-group">
  
  <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
  <img src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" width={40} height={40}/>
  </button>
  <ul className="dropdown-menu dropdown-menu-lg-end " style={{"textAlign" : "center"}}>
    
  <li><strong>{localStorage.getItem('firstname')}</strong></li>
          <li><hr className="dropdown-divider"/></li>
          <li><Link type="button" className="btn btn-info mx-auto" to="orderpage">
  Orders
</Link></li>
          <li><hr className="dropdown-divider"/></li>
          

            <li><a type="button" className="btn btn-info mx-auto" onClick={handlelogout} >
  logout
</a></li>
  </ul>
</div></div>
        }
     </div>
        </div>
    </nav>
      </>
    )
}

