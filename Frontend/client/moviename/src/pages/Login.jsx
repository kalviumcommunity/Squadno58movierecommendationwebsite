import React, { useState } from 'react'

const Login = () => {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const handleEmailChange=(e)=>{
    setEmail(e.target.value);
  }

  const handlePasswordChange=(e)=>{
    setPassword(e.target.value);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    // document.cookie=username=${email};
    // console.log(document.cookie)
    fetch('http://localhost:8009/login',{
      method:"POST",
      body:JSON.stringify({email,password}),
      headers:{"Content-Type":"application/json"}
    }).then((res)=>{
      return res.json();
    }).then((res)=>{
      console.log(res);
      let Token=res.token;
      document.cookie=`Token=${Token}`
    }).catch((err)=>{
      console.log(err);
    })

  }

  return (
    <>
     <h2> LOGIN FORM</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"

            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

    </>
  )
}

export default Login