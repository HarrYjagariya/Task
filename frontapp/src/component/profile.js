import React, { Component } from 'react'
import image from './profileimg.jpg'
import axios from 'axios'

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      role: '',
    }
  }

  componentWillMount() {
    this.getProfile();
  }

  getProfile = () => {
    window.previosLocation = window.location.href;
    console.log("props : ", window.previosLocation)
    const url = window.location.href.split('/');
    const id = url[4]; 
    axios.get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        this.setState({
          name: res.data.message.firstName,
          email: res.data.message.userEmail,
          role: res.data.message.role
        })
      })
      .catch((error) => {
        alert(error)
        return error
      })
  }



  render() {
    return (
      <div class="profile">
        <div>
          <span class="profileImage">
            <img src={image} alt="profile"></img>
          </span>
        </div>
        <div class="userInfo">
          <tr>
            <li><strong>First Name : </strong>{this.state.name}</li>
            <li><strong>email: </strong>{this.state.email}</li>
            <li><strong>role : </strong>{this.state.role}</li>
          </tr>
        </div>
      </div>

    )
  }
}