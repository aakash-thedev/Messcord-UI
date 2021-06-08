import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import '../Styles/ProfileModal.css';
import update_image from '../Assets/plus.svg';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import 'antd/dist/antd.css';

export default function ProfileModal(props) {

  var avatarURL = localStorage.getItem('avatar');
  var [recivedURL, setRecivedURL] = useState(null);


  async function getImageURL_cloudnary(avatar){

    const data = new FormData();
    data.append('file' ,avatar);
    data.append('upload_preset', 'messcord');
    data.append('cloud_name', 'messcord');

    await fetch('https://api.cloudinary.com/v1_1/messcord/image/upload', {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(data => {
      avatarURL = data.url;
      localStorage.setItem('avatar', data.url);
      setRecivedURL("loaded");
      console.log(data.url);
    })
    .catch(err => console.log('#############', err));
  }


  async function handleSubmit(event){

    event.preventDefault();

    console.log("AVATAR URL", avatarURL);

    const formData = `&name=${document.getElementById('username').value}&email=${document.getElementById('email').value}&avatar=${avatarURL}&`

    await fetch(`http://localhost:8000/api/v1/users/update/${localStorage.getItem('id')}`, {
      method: 'POST',
      headers:{
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.data.updatedUser);
      props.onHide();
    })
    .catch(err => console.log(`@@@@${err}`));

  }

  function previewPhoto(event){

    setRecivedURL("loading");

    var input = document.getElementById('file-input');

    // console.log(inputFile.files);
    
    if(input.files && input.files[0]){

      var reader = new FileReader();

      reader.readAsDataURL(input.files[0]);

      reader.onload = function(event){
        document.getElementById('my-dp').setAttribute('src', event.target.result);
      }

    }

    getImageURL_cloudnary(event.target.files[0]);

  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Profile
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>

          <div id="upper-section">

            <span id="profile-dp-wrapper">
              <img src={localStorage.getItem('avatar')} alt="dp" id="my-dp"></img>
              <label className="profile-input-label">
                <input type="file" name="avatar" className="file-input" id="file-input" onChange = {(eventT) => previewPhoto(eventT)} />
                <img src={update_image} alt="add" id="add"></img>
              </label>

              { recivedURL === 'loading' ? <Spinner animation="border" id="loading-spinner"/> : null }
            </span>

          </div>

          <div id="lower-section">

            <label>Name</label>
            <input id="username" name="username" placeholder={localStorage.getItem('username')}></input><br></br>

            <label>Email</label>
            <input id="email" name="email" placeholder={localStorage.getItem('email')}></input>

          </div>

          { recivedURL === 'loading' ? <button id="wait">Please Wait</button> : <button type="submit" id="save">Save</button> }

        </form>

      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}