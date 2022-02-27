import React from 'react';
import "./../styles/LayoutStyle.css";
import 'semantic-ui-css/semantic.min.css';
import { Form, Image } from 'semantic-ui-react';
import Header from './../views/HeaderPage';
import Footer from './../views/FooterPage';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleLogin from 'react-google-login';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingPage from './LoadingPage';
import './../configs/FirebaseConfig';



class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', isLoading: false, error: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.setState({ email: localStorage.getItem('email') });
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
  }

  handleClick(event) {

    this.setState({ isLoading: true });


    if (event.target.name === 'authencation') {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {
          //localStorage.setItem('data', userCredential.user.email);
          localStorage.setItem('data', userCredential);
          localStorage.setItem('email', this.state.email);
          setTimeout(
            () => {
              window.location.href = "/";
            },
            1000
          )



        })
        .catch((error) => {
          this.setState({ error: 'Invalid email or password' });
          setTimeout(
            () => {
              this.setState({ isLoading: false });
            },
            1000
          )


        });
    }

  }

  render() {

    const responseGoogle = (response) => {
      this.setState({ isLoading: true });

      setTimeout(
        () => {
          //this.setState({ isLoading: false });
          localStorage.setItem('data', response);
          window.location.href = "/";
        },
        1000
      )

    }
    return (
      <div>
        {this.state.isLoading ? <LoadingPage /> :
          <div className='grid-container'>

            <div className='item1'><Header></Header><br></br></div>
            <div className='item3'>
              <div className='loginform'>
                <Image src={require('./../images/login.png')} size='tiny' verticalAlign='middle' />
                <h3 style={{ textAlign: 'left' }}>Sign in </h3>
                <h6><i className='error'>{this.state.error}</i></h6>
                <Form>
                  <Form.Input
                    icon='mail'
                    name='email'
                    iconPosition='left'
                    placeholder='Email'
                    onChange={this.handleInputChange}
                    value={this.state.email}

                  />
                  <br></br>
                  <Form.Input
                    size='30'
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    type='password'
                    placeholder='Password'
                    onChange={this.handleInputChange}
                  />
                  <br></br>
                  <Button style={{ paddingLeft: '14%', paddingRight: '14%', marginBottom: '2%' }} variant="outline-info" name='authencation' onClick={this.handleClick} >Sign in</Button>
                  <br></br>

                  <h6> Or continue</h6>

                  <GoogleLogin

                    clientId="1080938962879-7vechnvdkhobg1kkesidj6c8fk22dmc5.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                    buttonText="Sign in with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}

                  />
                  <br></br>
                  <br></br>

                  <h6>Don't have an account? <a className='link' href='/signup'> Sign up</a></h6>
                  <h6><a className='link' href='/forgotpassword'>Forgot password?</a></h6>

                </Form>



              </div>


            </div>
            <div className='item4'><Footer></Footer>
            </div>
          </div>

        }
      </div>
    );
  }


}


export default SignInPage;