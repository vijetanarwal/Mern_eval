import { useState } from "react";
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:9009/register', {name, email, password})
        .then(res => {
            navigate('/login')
        }).catch(err => console.log(err))
    }

  return (
    <>
 <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <div >
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
<input
type="text"
     placeholder="Enter Name"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div >
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div >
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" >
            Register
          </button>
          </form>
          <p>Already Have an Account</p>
          <Link to="/login" >
            Login
          </Link>
    </>
  );
}

export default Signup;
