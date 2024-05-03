import React, { useState } from 'react';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform any further actions like submitting the data to a server
    // console.log('Email:', email);
    // console.log('Password:', password);
    fetch('http://localhost:8009/signup',{
        method:"POST",
        body:JSON.stringify({email,password}),
        headers:{"Content-Type":"application/json"}
    }).then((res)=>{
        return res.json();
    }).then((res)=>{
        console.log(res);
    }).catch((e)=>{
        console.log(e)
    })
    // Reset the form after submission
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Registration Form</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;