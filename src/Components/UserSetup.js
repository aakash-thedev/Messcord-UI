import React, { Component } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import '../Styles/UserSetup.css';
import bg1 from '../Assets/undraw_Mobile_messages_re_yx8w.svg';
import bg2 from '../Assets/undraw_Mobile_inbox_re_ciwq.svg';
import logo from '../Assets/message-512.png';

export default class UserSetup extends Component {

    render() {

        const { loginUser } = this.props;

        return (

            <main>

                <span id="brand-logo">
                    <img src={logo} alt="logo" />
                    <span>Messcord</span> 
                </span>

                <div id="user-setup-div">

                <img id="bg1" src={bg1} alt="bg-design1"></img>
                <img id="bg2" src={bg2} alt="bg-design2"></img>

                <span id="divider">OR</span>

                <SignUp />

                <Login loginUser = {loginUser}/>

                </div>

            </main>
        )
    }
}
