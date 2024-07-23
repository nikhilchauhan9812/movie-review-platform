import React, { useState } from 'react';
import './sigin.css';
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const navigate = useNavigate();

  const postdata = () => {
    const sendemail = email.toLowerCase();

    if (!sendemail || !password) {
      setError("Please enter both email and password.");
      return;
    }

    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: sendemail,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data.error){
          setError(data.error);

        }
        else{
          setMessage(data.message);
        }
       
      
         
        
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <div style={{ height: '91vh', backgroundColor: '#110F0F', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="signincard">
        <h5 className="welcome-text">
          Sign in to your  account
        </h5>
        {error ? <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div> : null}
        {message ? <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div> : null}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
              <label>Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} type='email' className='sigininput' placeholder='Email Address' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type='password' className='sigininput' placeholder='Password' />
            </div>
          </div>
          <button onClick={postdata} className='siginbutton'>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
