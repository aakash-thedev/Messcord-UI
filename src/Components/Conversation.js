import React from 'react'
import '../Styles/ConversationItem.css';

const Conversation = (props) => {

    const { name, avatar } = props;

    return (
        <div className = "conversationItem">
            
            <span className="dp-wrapper">
                <img src={avatar} alt="dp"></img>
            </span>

            <span className="rightsection">

                <span className = "conversationItemName">{name}</span>

                <small className = "last-message">This was the last message</small>

            </span>

            <span className="time-section">
                <small className="last-message-time">10:05</small>
            </span>

        </div>
    )
}

export default Conversation;