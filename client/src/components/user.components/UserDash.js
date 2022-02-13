import React, {useState} from "react";
import './UserDash.css'
import {Nav,Navbar,NavDropdown,Container} from 'react-bootstrap'
import axios from "axios";
import { Redirect } from "react-router";
import DashboardMenu from "../header.footer/DashboardMenu";
import DashboardIndex from "../DashboardComponent/DashboardIndex"




const UserDash = () => {
    const [userId, setUserId] = useState('');
    const userJson = localStorage.getItem("username");
    const user = JSON.parse(userJson) ;
    const username = user.username;

   

const userAuth = async () => {
   await axios.get("/api/user/isAuth",{
        headers: {
            "x-access-token": localStorage.getItem("token"),
        }
    }).then((res) => {
        console.log(res.data);
        if(res.data.auth === true){
            setUserId(res.data.result);
        } else {
            window.location.replace("/");
        }
    }).catch((err) => {
        console.log(err);
    })
}
userAuth();



    return(
  <>

<DashboardMenu name={username}/>

</>
    )
}

export default UserDash;