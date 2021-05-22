import ConversationList from './ConversationList';
import '../Styles/Sidebar.css';
import React from 'react';

class Sidebar extends React.Component{

    constructor(){
        super();

        this.state = {
            conversations: []
        }
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

        const updatedConversationList = data.data.users.filter((con) => {
            return con.email !== localStorage.getItem('email');
        });

        this.setState({
            conversations: updatedConversationList
        });

        })
    }

    render(){

        const { conversations } = this.state;

        return(
            <div className = "sidebar-container">
    
                <div className = "sidebar-header">
    
                    <span className="my-dp">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYjvQLZq2uGKf9RZcTUUiC6AbkgMjLddESVtJsIWcaw40M4sJ0U3zfhnJ46lGehNyo8Fg&usqp=CAU" alt="user-dp"></img>
                    </span>
    
                    <button className="create-new-conversation">
                        New <i className="fas fa-plus"></i>
                    </button>
    
                </div>
    
                <div className="search-conversations">
                    <input type="text" placeholder="Search Conversations"></input>
                </div>
    
                <ConversationList conversations = {conversations}/>
    
            </div>
        );
    }
}

export default Sidebar;