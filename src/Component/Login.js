import React, { useState } from "react";
import AuthContext from "../context/auths/AuthContext";
import { useContext } from "react";
 import {  useNavigate } from "react-router-dom";


export default function Login() {
  
 let navigate = useNavigate();
  const context = useContext(AuthContext);
  const { loginUser, Data, showalert} = context;
  const [data, setdata] = useState({email:"", password: ""});

  const handleclick = (e) => {
    e.preventDefault();
    loginUser(data.email, data.password);
    if(Data.success){
      localStorage.setItem('token', Data.authtoken)
      localStorage.setItem('admin', Data.data.user.Isadmin)
      localStorage.setItem('firstname', Data.data.user.firstname)
      navigate('/')
      showalert("Logined successfully","success" )
      }
      else{
      showalert("Logined with correct credentials","danger" )
      }
    // navigate('/')
    // console.log(Data)
  
  };
  const onchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container m-5 " >
        <form onSubmit={handleclick} >
          <div className=" mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" 
                    name="email" value={data.email} onChange={onchange} required/>
            </div>
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword3" name="password" value={data.password}
              onChange={onchange} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
