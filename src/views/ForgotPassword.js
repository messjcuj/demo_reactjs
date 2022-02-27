import React from 'react';
import "./../styles/LayoutStyle.css";
import 'semantic-ui-css/semantic.min.css';
import { Form, Image } from 'semantic-ui-react';
import Header from './../views/HeaderPage';
import Footer from './../views/FooterPage';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import LoadingPage from './LoadingPage';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../configs/FirebaseConfig';




class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', isLoading: false, error: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleInputChange(event) {
    if (event.target.name === 'email')
      this.setState({
        email: event.target.value
      });
  }

  handleClick() {
    this.setState({ isLoading: true });
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.state.email)
      .then(() => {
        setTimeout(
          () => {
            localStorage.setItem('email', this.state.email);
            alert('Check your email to reset password');
            window.location.href = "/";

            //this.setState({ isLoading: false, error: '' });
          },
          1000
        )

      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        setTimeout(
          () => {

            this.setState({ isLoading: false, error: 'Invalid email' });
          },
          1000
        )
        // ..
      });


  }
  render() {
    return (
      <div>
        {this.state.isLoading ? <LoadingPage /> :
          <div className='grid-container'>
            <div className='item1'><Header></Header></div>
            <div className='item3'>
              <div className='loginform'>

                <Image src={require('./../images/login.png')} size='tiny' verticalAlign='middle' />
                <h3 style={{ textAlign: 'left' }}>Forgot Password </h3>
                <h6 style={{ textAlign: 'left' }}>Please enter your registered email address. We'll send instructions to help reset your password.</h6>
                <h6><i className='error'>{this.state.error}</i></h6>
                <Form>
                  <br></br>
                  <Form.Input
                    icon='mail'
                    name='email'
                    iconPosition='left'
                    placeholder='Email'
                    onChange={this.handleInputChange}
                    value={this.state.email}


                  />

                  <br></br>

                  <Button style={{ paddingLeft: '14%', paddingRight: '14%', marginBottom: '2%' }} variant="outline-info" name='authencation' onClick={this.handleClick} >Send reset instructions</Button>
                  <br></br>
                  <br></br>
                  <h6> Already have an account? <a className='link' href='/'>Sign in</a></h6>

                </Form>


              </div>


            </div>
            <div className='item4'><Footer></Footer></div>
          </div>

        }
      </div>
    );
  }


}
export default ForgotPasswordPage;