import React from 'react'
import AuthContext from "../context/auths/AuthContext";
import { useContext } from "react";

export default function Alert() {
  const context = useContext(AuthContext);
  const { alert} = context;
  return (
    <div style={{height:'40px'}}>
    {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        {/* {console.log(props.alert.message)} */}
     <strong>{alert.type}! </strong>{alert.message}
    </div>}
    </div>
  )
}
