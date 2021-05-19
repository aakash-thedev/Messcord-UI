import React from 'react'
import '../Styles/ConversationItem.css';

const Conversation = (props) => {

    const { name, avatar, lastMessage } = props;

    return (
        <div className = "conversationItem">
            
            <span className="dp-wrapper">
                <img src = {avatar} alt = "dp"></img>
            </span>

            <span className="rightsection">

                <span className = "conversationItemName">{name}</span>

                <span className = "message-details">
                    <small className = "last-message">{lastMessage}</small>
                    {/* <small className = "isSeen">{seen}</small> */}
                </span>

            </span>

        </div>
    )
}

export default Conversation;