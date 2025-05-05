import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email, password})
        .then(res => {
            console.log("login: " + res.data);
            if(res.data.Status === "Success") {
                if(res.data.role === "admin") {
                    navigate('/dashboard')
                } else {
                    navigate('/')
                }
            }
        }).catch(err => console.log(err))
    }

    
}

export default Login;