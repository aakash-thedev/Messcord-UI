import Conversation from './Conversation';

const ConversationList = (props) => {

    const { conversations } = props;
    console.log("CONVERSATION LIST", conversations);

    return (
        
        <div className = "conversation-wrapper">

            {
                conversations.map((conversation) => {

                    // we are receiving each individual product from product array

                    const { name, avatar, messages, lastMessage } = conversation;

                    return (

                        <Conversation

                            id = {conversation._id}
                            name = {name}
                            avatar = {avatar}
                            messages = {messages}
                            lastMessage = {lastMessage}
                            key = {conversation._id}
                            
                        />
                    );
                })
            }

        </div>

    )
}

export default ConversationList;