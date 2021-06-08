import React, { useState } from 'react';
import '../Styles/SignUp.css';
import upload from '../Assets/upload.png';
import { Spinner } from 'react-bootstrap';
import { notification } from 'antd';
import 'antd/dist/antd.css';


export default function SignUp(props) {

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Sign Up | Messcord',
            description:
            'User Signed Up Successfully',
        });
    };

    var [loadingDP, setLoadingDP] = useState(null);
    var [avatarURL, setAvatarURL] = useState('https://www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg');
    var [signedUp, setSignedUp] = useState(true);

    async function getImageURL_cloudnary(file){

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'messcord');
        data.append('cloud_name', 'messcord');
    
        await fetch('https://api.cloudinary.com/v1_1/messcord/image/upload', {
          method: 'POST',
          body: data
        })
        .then(res => res.json())
        .then(data => {
          setAvatarURL(data.url);
          setLoadingDP("loaded");
          setSignedUp(true);
          console.log(data.url);
        })
        .catch(err => console.log('#############', err));
    }

    async function handleSignupSubmit(event){

        event.preventDefault();

        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        console.log("userAvatar&&&&&&&&&&&&&&&&&&&", avatarURL);
        localStorage.setItem('avatar', avatarURL);

        let formData = `&name=${name}&email=${email}&password=${password}&avatar=${avatarURL}&`;

        // make an ajax call
        await fetch('http://localhost:8000/api/v1/users/sign-up', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            openNotificationWithIcon('success');
            setSignedUp(true);
        })
        .catch(err => console.log(err));

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('my-dp-preview').setAttribute('src', 'https://www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg');
    }

    function previewDP(event){

        // setAvatar(event.target.files[0]);
        // console.log("777777777777777777777",event.target.files[0]);

        var input = document.getElementById('input-dp');

        if(input.files && input.files[0]){
            var reader = new FileReader();

            reader.readAsDataURL(input.files[0]);

            reader.onload = function(event){
                document.getElementById('my-dp-preview').setAttribute('src', event.target.result);
            }
        }

        setLoadingDP('loading');
        setSignedUp(false);
        getImageURL_cloudnary(event.target.files[0]);
    }

    return (
        <div id="sign-up-main">

            <form onSubmit={handleSignupSubmit}>

                <h1>Sign Up | Messcord</h1>
                
                <div id="input-dp-wrapper">
                    <label>
                        <input type='file' id="input-dp" onChange={(event) => previewDP(event)}></input>
                        <img src='https://www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg' id="my-dp-preview" alt="dp-preview"></img>
                        <img src={upload} id="upload-icon" alt="upload-icon"></img>
                    </label>

                    {loadingDP === 'loading' ? <Spinner animation="border" id="loading-spinner"/> : null }
                </div>

                <label>Name</label>
                <input type="text" placeholder="Eg : Tony Stark" id="name" required />

                <label>Email</label>
                <input type="email" placeholder="Eg : tonystark3000@gmail.com" id="email" required />

                <label>Password</label>
                <input type="password" placeholder="*********" id="password" required />

                <button className = {signedUp === false ? 'disableButton' : 'sign-up-btn'}>Sign Up</button>

            </form>

        </div>
    )
}