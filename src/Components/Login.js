import React, { useRef } from 'react';
import '../Styles/Login.css';

export default function Login(props){

    const { loginUser } = props;

    const nameRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(event){

        event.preventDefault();

        loginUser(nameRef.current.value, passwordRef.current.value);
        // setJWTtoken(jwtToken);
    }

    return (
        <div id="main-bg">

            <form method="POST" action="http://localhost:8000/api/v1/users/sign-in" onSubmit = {handleSubmit} autoComplete="off">

                <div id="login-box">
                    <div className="main">
                        <h1>Sign in | Messcord</h1>
                        
                        <input type="email" name="email" placeholder="Email" ref={nameRef} required />
                        <input type="password" name="password" placeholder="Password" ref={passwordRef} required />
                        
                        <input type="submit" value="Sign In" />

                    </div>
                </div>

            </form>
            
        </div>
    )
}