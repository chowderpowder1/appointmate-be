import { React, useState, useEffect} from 'react'
import axios from 'axios';

const TesTest = () => {

    const [backendData, setBackendData] = useState([{}])
    
useEffect(() => {
      axios.get('http://localhost:8080/auth/again', { withCredentials: true })
      .then((res)=>{
      console.log(res.data.username);
    })
  }, [])

  

  
  return (

    <div> 
        {/* {backendData.map((user, i) =>(
            <p key={i}>{user.title}</p>
        ))} */}
        <h1>Login</h1>
      <form action="http://localhost:8080/auth/login"  method="POST">
        <label for="email">Enter Email</label>
        <input type="text" id="email" name="email" placeholder='email' />
        <label for="password">Enter password</label>
        <input type="password" id="password" name="password" placeholder='password' />
        <button type='submit'>Submit</button>
      </form>
      <h1>Sign up</h1>
      <form action="http://localhost:8080/auth/signup"  method="POST">
        <label for="email">Enter email</label>
        <input type="text" id="email" name="email" placeholder='email' />
        <label for="password">Enter password</label>
        <input type="password" id="password" name="password" placeholder='password' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default TesTest
