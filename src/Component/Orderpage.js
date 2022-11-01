import React from 'react'
import AuthContext from "../context/auths/AuthContext";
import { useContext, useEffect } from "react";

export default function Orderpage() {
    const context = useContext(AuthContext);
    const { getitems, useritems} = context;
    useEffect(() => {
      getitems();
    }, []);
  return (
    <>
    <div className="container">
    <h1 className="display-3 m-2 text-center"><strong>Orders/Invoices</strong></h1>

    {useritems.map((item) => {
        return (
            <div key={item.id}>
            <div className="card m-3 text-bg-dark " >
        </div>
        <div className="card-body">
          <h5 className="card-title"><strong>Name :</strong>{item.medicinename}</h5>
          <p className="card-text"><strong>Id :</strong>{item.medicineid}</p>
          
        </div>
        <div className="d-flex mb-3">
        <div className="ms-auto p-2"><button type="button" className="btn btn-danger btn-lg">Price : {item.price}</button></div></div>
      </div>
      
        )})}
        </div>
        </>
  )
}
