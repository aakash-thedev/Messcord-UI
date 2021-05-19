import ConversationList from './ConversationList';
import '../Styles/Sidebar.css';

const Sidebar = (props) => {

    const { conversations } = props;

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

export default Sidebar;