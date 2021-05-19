import React from "react";
import Sidebar from './Sidebar';
import Chatbox from './ChatBox';
import Login from './Login';
import '../Styles/App.css';

class App extends React.Component {

  constructor(){
    super();

    this.state = {

      conversation: [],
      loggedInUserEmail : null,
      jwtToken: null
    }
  }

  loginUser = (email, password) => {

    const formData = `&email=${email}&password=${password}&`;

    fetch('http://localhost:8000/api/v1/users/sign-in', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(formData)
    })
    .then(data => data.json())
    .then(data => {

      if(data !== 'undefined'){

        localStorage.setItem('email', data.data.email);
        localStorage.setItem('username', data.data.name);
        localStorage.setItem('jwt_token', data.data.token);
      }

      this.setState({
        loggedInUserEmail: data === 'undefined' ? null : data.data.email,
        jwtToken: data === 'undefined' ? null : data.data.token
      })

      return;

    });
  }


  // --------------------------- ComponentDidMount to detch users from database ------------------------------ //

  componentDidMount = () => {

    fetch('http://localhost:8000/api/v1/users/all',{
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {

      // console.log(data.data.users);

      this.setState({
        conversation: data.data.users
      });

    })
  }


  render() {

    let jwt_token = localStorage.getItem('jwt_token');
    let user_email = localStorage.getItem('email');

    if(!jwt_token){

      return (
        <Login loginUser = {this.loginUser} />
      );

    }

    return (
      <div className="App">
        <Sidebar conversations = {this.state.conversation}/>
        <Chatbox loggedInUserEmail = {user_email}/>

      </div>
    );
  }
}

export default App;
