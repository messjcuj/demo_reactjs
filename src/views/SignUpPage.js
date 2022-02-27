import React from 'react';
import "./../styles/LayoutStyle.css";
import 'semantic-ui-css/semantic.min.css';
import { Form, Image } from 'semantic-ui-react';
import Header from './../views/HeaderPage';
import Footer from './../views/FooterPage';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingPage from './LoadingPage';
import './../configs/FirebaseConfig';



class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', confirmpassword: '', error: '', isLoading: false };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleInputChange(event) {
    if (event.target.name === 'email')
      this.setState({
        email: event.target.value
      });
    if (event.target.name === 'password')
      this.setState({
        password: event.target.value
      });
    if (event.target.name === 'confirmpassword')
      this.setState({
        confirmpassword: event.target.value
      });

  }

  handleClick() {

    this.setState({ isLoading: true });

    if (this.state.password === this.state.confirmpassword) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {
          // Signed in 
          //const user = userCredential.user;
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeout(
                () => {
                  //this.setState({ isLoading: false });
                  localStorage.setItem('email', this.state.email);
                  alert('Registration complete');
                  window.location.href = "/";
                },
                1000
              )


            });
          // ...
        })
        .catch((error) => {
          setTimeout(
            () => {
              this.setState({ isLoading: false });
              const errorCode = error.code;

              if (errorCode === 'auth/invalid-email') {
                this.setState({
                  error: 'Invalid email'
                });
              }
              if (errorCode === 'auth/weak-password') {
                this.setState({
                  error: 'Invalid password at least 6 characters'
                });
              }
              if (errorCode === 'auth/missing-email') {
                this.setState({
                  error: 'Invalid email'
                });
              }
              if (errorCode === 'auth/internal-error') {
                this.setState({
                  error: 'Please enter this form'
                });
              }
              if (errorCode === 'auth/email-already-in-use') {
                this.setState({
                  error: 'Email already in use'
                });
              }


            },
            1000
          )

          //auth/email-already-in-use
          //auth/internal-error
          //auth/weak-password
          //auth/missing-email
          //auth/missing-email
          // ..
        });
    }
    else {
      setTimeout(
        () => {
          this.setState({
            error: 'Password and confirm password does not match',
            isLoading: false
          });
        },
        1000
      )

    }

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
                <h3 style={{ textAlign: 'left' }}>Sign up </h3>
                <h6><i className='error'>{this.state.error}</i></h6>
                <Form>
                  <Form.Input
                    icon='mail'
                    name='email'
                    iconPosition='left'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleInputChange}


                  />
                  <br></br>
                  <Form.Input
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    type='password'
                    placeholder='Password'
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                  <br></br>
                  <Form.Input
                    icon='lock'
                    name='confirmpassword'
                    iconPosition='left'
                    type='password'
                    placeholder='Confirm password'
                    onChange={this.handleInputChange}
                    value={this.state.confirmpassword}
                  />
                  <br></br>

                  <Button style={{ paddingLeft: '14%', paddingRight: '14%', marginBottom: '2%' }} variant="outline-info" name='authencation' onClick={this.handleClick} >Sign up</Button>
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
export default SignUpPage;