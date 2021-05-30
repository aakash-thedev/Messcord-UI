import React from 'react';
// import io from 'socket.io-client';
import '../Styles/Chatbox.css';

class ChatBox extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            messages: []  /* { content: "some message" self: true } */
        };

        // make a connection just like i did in nodejs
        this.socket = props.socketConnection;
        // TODO : Set up authentication via API and set userSession
        this.userEmail = localStorage.getItem('email');

        if(this.userEmail){
            this.setupConnection();
        }
    }

    scrollToBottom = () => {
        document.getElementById('chat-screen').scrollTo(0, document.getElementById('chat-screen').scrollHeight);
    }

    componentDidMount(){

        fetch(`http://localhost:8000/api/v1/message/getMessages/?recieversID=${this.props.id}&sendersID=${localStorage.getItem('id')}&sendersEmail=${localStorage.getItem('email')}`, {
        method: 'GET'
        })
        .then(res => res.json())
        .then(data => {

            this.setState({
                messages: data.data.messages
            })
        });
    }

    // --------------------- set up the connection with Observer ------------//
    setupConnection = () => {

        const self = this;

        // we can define any action with the help of keyword 'on'
        self.socket.on('connect', () => {

            // lets commit our 'join_room' request
            self.socket.emit('join_request', {
                from: self.userEmail,
                to: self.props.email
            });

            // now we will get some data from server
            self.socket.on('user_joined', function(data){
                console.log(`${data.from} has joined chat with ${data.to}`);
            });

        });

        // now if some other user is sending message
        self.socket.on('receive_message', function(data){

            const {messages} = self.state;
            const newMessageObj = {};

            newMessageObj.message = data.message;
            newMessageObj.user_email = data.from;
            newMessageObj.username = data.username;

            newMessageObj.sender = {_id: null};
            // newMessageObj.reciever = {name: data.to};

            // tooo : we have to set auth to access seperate message class property
            if(data.from === self.userEmail){
                newMessageObj.sender._id = localStorage.getItem('id');
            }
            
            //push the message in message state
            self.setState({
                messages: [...messages, newMessageObj]
            });

            self.scrollToBottom();
        });
    }

    handleSubmit = (event) => {

        event.preventDefault();

        const messageContent = document.getElementById('input-message').value;

        if(messageContent === ''){
            return;
        }

        this.socket.emit('send_message', {
            from: this.userEmail,
            to: this.props.email,
            username: localStorage.getItem('username'),
            message: messageContent
        });

        const formData = `&senders_id=${localStorage.getItem('id')}&message=${messageContent}&`;

        fetch(`http://localhost:8000/api/v1/message/create/${this.props.id}`, {

        method: 'POST',
        headers: {
        'Content-type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(formData)
        });

        console.log(document.getElementById('chat-screen').getBoundingClientRect().height);

        document.getElementById('input-message').value = '';
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }


    render(){

        const { messages } = this.state;
        const { name, avatar } = this.props;
        
        return (

            <main id="chatroot">

                <div className = "chatbox-screen">
                    
                    <div className="chat-header">

                        <span id="chat-dp">
                            <img src ={avatar} alt="chat-dp"></img>
                        </span>

                        <div id = "chat-right-section">

                            <span id="chat-name">
                                {name}
                            </span>

                            <span id="last-seen">
                                Last Seen at 11:00 AM
                            </span>

                        </div>

                        <span id = "more-options">

                            <img src="https://img.icons8.com/metro/452/search.png" alt="search"></img>
                            <img src="https://static.thenounproject.com/png/658625-200.png" alt="more" style = {{transform: 'rotate(90deg)', height: '34px'}}></img>
                            
                        </span>

                    </div>
                    
                    <div id="chat-screen" className = "chat-messages-screen" key={messages.length}>

                        {
                            messages.map((message) => {

                                return (
                                    <div id="message" className="message-wrapper" key={message._id}>

                                        <div className = {message.sender._id === localStorage.getItem('id') ? 'message self-message' : 'message other-message'} key={message._id}>
                                            <small className="sender-id" key={message.sender.id}> { message.sender._id === localStorage.getItem('id') ? '' : '' } </small>
                                            <span className="message-content" key={message.id}>{ message.message }</span>
                                            <small className="message-time">{message.createdAt ? String(message.createdAt).substring(11, 16) : Date().getHours() % 12 || 12}</small>
                                        </div>
                                    
                                    </div>
                                );
                            })
                        }

                    </div>

                    <div className = "input-messages">
                        <form onSubmit = {this.handleSubmit} autoComplete="off">
                            <input type="text" name="message" placeholder = "Type your message here..." id="input-message"></input>
                            <input type="hidden" name="senders_id" value={localStorage.getItem('id')}></input>
                            <button type="submit" className="send-btn">
                                {/* <img src="https://img-premium.flaticon.com/png/512/736/736212.png?token=exp=1621249427~hmac=aefc207b907eb2308ca2ef02f725594c" className="button-image" alt="btn-img"></img> */}
                                <img src="https://icons-for-free.com/iconfiles/png/512/send+icon-1320185654900887696.png" className="button-image" alt="btn-img"></img>
                            </button>
                        </form>
                    </div>

                </div>

            </main>
        );
    }
}

export default ChatBox;