import Conversation from './Conversation';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import ChatBox from './ChatBox';
import StarterDisplay from './StarterDisplay';
import io from 'socket.io-client';

const ConversationList = (props) => {

    const { conversations } = props;

    return (

        <Router>

            <div className = "conversation-wrapper">

            {
                conversations.map((conversation) => {

                    // we are receiving each individual product from product array

                    const { name, email, avatar, lastMessage } = conversation;

                    return (

                        <div key={conversation._id}>

                            <Link to={'/' + conversation._id} style = {{textDecoration: 'none', color: 'black'}}>

                            <Conversation

                            id = {conversation._id}
                            name = {name}
                            email = {email}
                            avatar = {avatar}
                            lastMessage = {lastMessage}
                            key = {conversation._id}
                            
                            />

                            </Link>

                            <Switch>

                                <Route exact path={'/' + conversation._id} render = {() => {

                                    return <ChatBox 

                                        id = {conversation._id}
                                        name = {name}
                                        email = {email}
                                        avatar = {avatar}
                                        lastMessage = {lastMessage}
                                        key = {conversation._id}
                                        socketConnection = { io.connect('http://localhost:8080', {transports: ['websocket'], polling: false}) }

                                        />
                                    }}
                                />

                            </Switch>

                        </div>
                    );
                })
            }

            </div>

            {/* To Render Starter Display */}

            <Route exact path='/' render = {() => {
                    return <StarterDisplay />
                }
            }
            />

        </Router>
    )
}

export default ConversationList;