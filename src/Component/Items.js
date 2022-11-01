import React, { useEffect, useRef } from "react";
import AuthContext from "../context/auths/AuthContext";
import { useContext, useState } from "react";
import defaultimage from "../images/defaultimage.jpg"
import Cart from "./Cart";
import swal from "sweetalert";

export default function Items() {
  const context = useContext(AuthContext);
  const { getallitems, allitems,setcart,cart } = context;
  useEffect(() => {
    getallitems();
  }, []);
  const handleclick=(item)=>{
    setcart(cart.concat(item));
    swal( "added to cart!", "success");
  }
  return (

    <div className="container">
    <div className="row">
      {allitems.map((item) => {
        return (
          <div className="card m-3" style={{"width" : "18rem", "borderRadius" : "10px"}}  key={item._id} >
            <img src={defaultimage} className="card-img-top" alt="..." /> 
            <div className="card-body">
              <h5 className="card-title text-muted">{item.medicinename}</h5>
              {/* <p className="card-text">{item.id}</p> */}
              <p className="card-text">₹ {item.price}</p>
              <button className="btn btn-primary" onClick={()=>handleclick(item)}>
                Add
              </button>
            </div>
          </div>

        );
      })}
     
    </div>
    </div>
  );
}
