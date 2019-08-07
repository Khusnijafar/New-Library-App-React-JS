import React, { Component } from 'react';
import '../css/Register.css'
import axios from 'axios'
import swal from 'sweetalert';

class LoginPage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            email: '' ,
            password: '' ,
            passwordConfirm: '' ,
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
      if (this.state.email === '') {
          alert('Email is required')
      } else if (regex.test(this.state.email) === false) {
          alert('Email format is incorrect')
      } else if (this.state.password === '') {
          alert('Password is required')
      } else if (this.state.passwordConfirm === '') {
        alert('Confirm Password is required')
      } else  if (
          this.state.email !== "" &&
          this.state.password !== "" &&
          this.state.passwordConfirm !== ""
      ){
        swal({
            title: "Login",
            text: "Login Success !!",
            icon: "success",
            button: "oke"
        });
      }
          
      let data = {
        email : this.state.email,
        password : this.state.password,
        passwordConfirm : this.state.passwordConfirm
      }
      let headers = {'authorization':'khusni', 'Content-Type': 'application/json'} 

      axios.post('http://localhost:3001/users/login', data, {headers})
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.result.token)
        localStorage.setItem('card_number', res.data.result.card_number)
        localStorage.setItem('id_user', res.data.result.id_user)
        localStorage.setItem('role_id', res.data.result.role_id)
        this.props.history.push('/home')
      })
      .catch(err => console.log(err));
    } 

    render() {
      console.log(this.state);
      return (
          <div className="container">
            <form className="ui form">
                <h2 className='register'>Login</h2>
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

export default LoginPage