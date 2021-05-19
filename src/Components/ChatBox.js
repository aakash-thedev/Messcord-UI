import React from 'react';
import io from 'socket.io-client';
import '../Styles/Chatbox.css';

class ChatBox extends React.Component{

    constructor(){

        super();

        this.state = {
            messages: [],  /* { content: "some message" self: true } */
        };

        // make a connection just like i did in nodejs
        this.socket = io.connect('http://localhost:8080', {transports: ['websocket'], polling: false});
        // TODO : Set up authentication via API and set userSession
        this.userEmail = localStorage.getItem('email');

        // if(this.userEmail){
        //     this.setupConnection();
        // }
    }

    // --------------------- set up the connection with Observer ------------//
    setupConnection = () => {

        const self = this;

        // we can define any action with the help of keyword 'on'
        self.socket.on('connect', () => {

            // on connection basically we can emit as many requests we want

            // lets commit our 'join_room' request
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatRoom: "chatroom1.0"
            });

            // now we will get some data from server
            self.socket.on('user_joined', function(email){

                // console.log(`${email} has joined`);

            });

        });

        // now if some other user is sending message
        self.socket.on('receive_message', function(data){

            const {messages} = self.state;
            const newMessageObj = {};

            newMessageObj.content = data.message;
            newMessageObj.user_email = data.user_email;
            newMessageObj.username = data.username;
            newMessageObj.chatRoom = data.chatRoom;

            // tooo : we have to set auth to access seperate message class property
            if(data.user_email === self.userEmail){
                newMessageObj.self = true;
            }
            
            //push the message in message state
            self.setState({
                messages: [...messages, newMessageObj]
            });

            // console.log('anonymous - ',newMessageObj);
        });
    }

    handleSubmit = (event) => {

        event.preventDefault();

        const messageContent = document.getElementById('input-message').value;

        if(messageContent === ''){
            return;
        }

        this.socket.emit('send_message', {
            user_email: this.userEmail,
            username: localStorage.getItem('username'),
            message: messageContent,
            chatRoom: "chatroom1.0"
        });

        document.getElementById('input-message').value = '';

    }


    render(){

        const { messages } = this.state;

        return (
            <div className = "chatbox-screen">
    
                <div className="chat-header">
    
                    <span id="chat-dp">
                        <img src ="https://i.guim.co.uk/img/media/e746109cf7315dbb58c23d0b903e4d9c579bfb25/0_0_4096_2459/master/4096.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=3a2a090066c5bfc15c0571dc7261968f" alt="chat-dp"></img>
                    </span>
    
                    <div id = "chat-right-section">
    
                        <span id="chat-name">
                            Chat Room 1.0
                        </span>
    
                        <span id="last-seen">
                            Last Seen at 11:00 AM
                        </span>
    
                    </div>
    
                    <span id = "more-options">
    
                        {/* <img src="https://img-premium.flaticon.com/png/512/709/709592.png?token=exp=1621247805~hmac=c64cc96fbabfa40fba784024ab0cb506" alt="search"></img>
                        <img src="https://img-premium.flaticon.com/png/512/512/512222.png?token=exp=1621247839~hmac=58d7edb25c1890c99b5e484da5b1815f" alt="more"></img> */}
                        
                    </span>
    
                </div>
                
                <div className = "chat-messages-screen">
    
                    {
                        messages.map((message) => {

                            return (
                                <div className="message-wrapper">

                                    <div className = {message.self ? 'message self-message' : 'message other-message'} key={message}>
                                        <small className="sender-id">{ message.self ? '' : message.username }</small>
                                        <span className="message-content">{ message.content }</span>
                                    </div>
                                
                                </div>
                            );
                        })
                    }
    
                </div>
    
                <div className = "input-messages">
                    <form onSubmit = {this.handleSubmit} autoComplete="off">
                        <input type="text" placeholder = "Type your message here..." id="input-message"></input>
                        <button type="submit" className="send-btn">
                            {/* <img src="https://img-premium.flaticon.com/png/512/736/736212.png?token=exp=1621249427~hmac=aefc207b907eb2308ca2ef02f725594c" className="button-image" alt="btn-img"></img> */}
                            <img src="https://icons-for-free.com/iconfiles/png/512/send+icon-1320185654900887696.png" className="button-image" alt="btn-img"></img>
                        </button>
                    </form>
                </div>
    
            </div>
        );
    }
}

export default ChatBox;