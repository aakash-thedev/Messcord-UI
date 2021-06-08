import React from 'react'
import '../Styles/ConversationItem.css';

const NewConversation = (props) => {

    const { name, avatar } = props;

    return (
        <div className = "conversationItem">
            
            <span className="dp-wrapper">
                <img src={avatar} alt="dp"></img>
            </span>

            <span className="rightsection">

                <span className = "conversationItemName">{name}</span>

            </span>

        </div>
    )
}

export default NewConversation;