import ConversationList from './ConversationList';
import '../Styles/Sidebar.css';
import React from 'react';
import new_message from '../Assets/new-message.png';
import more from '../Assets/more.png';
import search from '../Assets/search.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ProfileModal from './ProfileModal';

class Sidebar extends React.Component{

    constructor(){
        super();

        this.state = {
            conversations: [],
            modalShow: false
        }
    }

    setModalShow = (status) => {
        this.setState({
            modalShow: status
        })
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
                        <img src={localStorage.getItem('avatar')} alt=""></img>
                    </span>

                    <span id="utilities">

                        <img src={new_message} title="New Conversation" alt="new-message"></img>

                        <div id="menu-wrapper">

                            <div className="dropdown">
                                <a className="dropdown-toggle" href="www.google.com" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={more} alt="more" title="More Settings"></img>
                                </a>

                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><Button className="dropdown-item" variant="primary" onClick={() => this.setModalShow(true)}>Profile</Button></li>
                                    <li><a className="dropdown-item" href="www.google.com">Settings</a></li>
                                    <li><a className="dropdown-item" href="www.google.com">Log out</a></li>
                                </ul>

                            </div>

                        </div>

                        

                        <ProfileModal
                            show={this.state.modalShow}
                            onHide={() => this.setModalShow(false)}
                        />
                        
                    </span>
    
                </div>
    
                <div className="search-conversations">
                    <input type="text" placeholder="Search Conversations..." />
                    <img src={search} alt="search"></img>
                </div>
    
                <ConversationList conversations = {conversations}/>
    
            </div>
        );
    }
}

export default Sidebar;