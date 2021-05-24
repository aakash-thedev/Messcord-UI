import React from 'react';
import '../Styles/StarterDisplay.css';
import logo from '../Assets/message-512.png';

export default function StarterDisplay() {
    return (
        <div id="display-root">
            <div id="heading-section">

                <span id="heading-text">Messcord</span>
                <span id="features-text">

                    <i className="fas fa-circle"></i>
                        <span className="ft">Fast</span>
                    <i className="fas fa-circle"></i>
                        <span className="ft">Reliable</span>
                    <i classname="fas fa-circle"></i>
                        <span className="ft">Secure</span>
                    <i className="fas fa-circle"></i>

                </span>

            </div>

            <div id="logo-section">
                <img src={logo} alt="logo"></img>
            </div>
        </div>
    )
}
