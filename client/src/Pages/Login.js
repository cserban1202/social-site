import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({ username: response.data.username, id: response.data.id, status: true });
        history("/");
      }
    });
  };

  return (
    <div className='loginContainer'>
      <ToastContainer />
      <input type="text" placeholder="username" onChange={(event) => { setUsername(event.target.value) }} />
      <input type="password" placeholder="password"
        onChange={(event) => { setPassword(event.target.value) }} />
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
