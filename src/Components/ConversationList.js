import Conversation from './Conversation';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import ChatBox from './ChatBox';

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


                            <Route path={'/' + conversation._id} render = {() => {

                                return <ChatBox 
                                
                                    id = {conversation._id}
                                    name = {name}
                                    email = {email}
                                    avatar = {avatar}
                                    lastMessage = {lastMessage}
                                    key = {conversation._id}
                                    
                                    />
                                }}
                            />

                        </div>
                    );
                })
            }

            </div>

        </Router>
    )
}

export default ConversationList;