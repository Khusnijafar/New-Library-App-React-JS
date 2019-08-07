import React, { Component } from 'react';
import '../css/Register.css'
import axios from 'axios'
import swal from 'sweetalert';

class RegisterPage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            fullname: '' ,
            card_number: '',
            email: '' ,
            password: '' ,
            passwordConfirm: '' ,
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange = (e) => {
        this.setState({ fullname: e.target.value})
    }

    handleCardNumberChange = (e) => {
        this.setState({card_number: e.target.value})
    }

    handleEmailChange = (e) => {
      this.setState({ email: e.target.value})
    }

    handlePasswordChange = (e) => {
      this.setState({ password: e.target.value})
    }

    handlePasswordConfirmChange = (e) => {
      this.setState({ passwordConfirm: e.target.value})
    }

    handleSubmit = (e) => {
      e.preventDefault()    
      let regex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.state.fullname === '') {
          alert('Name is required')
      } else if (this.state.card_number === '') {
          alert('Card Number is required')
      } else if (this.state.email === '') {
          alert('Email is required')
      } else if (regex.test(this.state.email) === false) {
          alert('Email format is incorrect')
      } else if (this.state.password === '') {
          alert('Password is required')
      } else  if (
          this.state.fullname !== "" &&
          this.state.card_number !== "" &&
          this.state.email !== "" &&
          this.state.password !== ""
      ){
        swal({
            title: "Registrasi",
            text: "Registrasi Success !!",
            icon: "success",
            button: "oke"
        });
      }
          
      let data = {
        fullname : this.state.fullname,
        card_number: this.state.card_number,
        email : this.state.email,
        password : this.state.password,
        passwordConfirm : this.state.passwordConfirm
      }
      let headers = {'authorization':'khusni', 'Content-Type': 'application/json'} 

      axios.post('http://localhost:3001/users/register', data, {headers})
      .then(res => {
        console.log(res);
        this.props.history.push('/login')
      })
      .catch(err => console.log(err));
    } 

    render() {
      console.log(this.state);
      return (
          <div className="container">
            <form className="ui form">
                <h2 className='register'>Register</h2>
                <div className="field">
                    <label>Full Name</label>
                     <input onChange={this.handleNameChange} value={this.state.fullname} type="text" name="fullname" placeholder="Full Name" />
                </div>
                <div className="field">
                    <label>Card Number</label>
                     <input onChange={this.handleCardNumberChange} value={this.state.card_number} type="text" name="card_number" placeholder="Card Number" />
                </div>
                <div className="field">
                    <label>Email</label>
                     <input onChange={this.handleEmailChange} value={this.state.email} type="email" name="email" placeholder="Email" />
                </div>
                <div className="field">
                    <label>Password</label>
                     <input onChange={this.handlePasswordChange} value={this.state.password} type="password" name="password" placeholder="Password" />
                </div>
                <div className="field">
                    <label>Confirm Password</label>
                     <input onChange={this.handlePasswordConfirmChange} value={this.state.passwordConfirm} type="password" name="password" placeholder="Confirm Password" />
                </div>
                    <button onClick={this.handleSubmit} className="ui teal button" type="submit">Submit</button>
            </form>
          </div>
        );
    }
}

export default RegisterPage