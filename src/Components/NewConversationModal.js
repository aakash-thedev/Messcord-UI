import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import 'antd/dist/antd.css';
import NewConversation from './NewConversation';

export default function NewConversationModal(props) {

    var [conversationList, setConversationList] = useState([]);

    // now use useEffect hook to make an API call to fetch all the users and set it on the state
    useEffect(() => {

        fetch('http://localhost:8000/api/v1/users/all', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.data.users);
            setConversationList(data.data.users);
        })
        .catch(err => console.log(err));

    }, [])

    return (

        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                New conversation
            </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{maxHeight: '98vh', overflowY: 'scroll'}}>

            <input type="text" placeholder="Search User..." style={{width: '100%', height: '40px', border: 'none', borderBottom: '1px solid black', marginBottom: '1%'}}/>

            {
                conversationList.map((newConversation) => {

                    const { name, email, avatar } = newConversation;

                    return <NewConversation 

                        id = {newConversation._id}
                        name = {name}
                        email = {email}
                        avatar = {avatar}
                        key = {newConversation._id}
                    
                    />

                })
            }

        </Modal.Body>

        </Modal>
    );
}