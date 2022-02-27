import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingPage from './LoadingPage';
import ReactLoading from 'react-loading';
import { Icon } from 'semantic-ui-react';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ isLoading: true });

        setTimeout(
            () => {

                localStorage.removeItem('data');
                window.location.href = "/";
            },
            1000
        )
        // ..


    }

    render() {
        return (
            <div>

                {this.state.isLoading ? <LoadingPage /> :
                    <div className='grid-container'>
                        <div className='item1'>

                        </div>
                        <div className='item1'> <Alert variant="success">
                            <Alert.Heading><h3>Welcome to web application</h3></Alert.Heading>
                            <hr></hr>


                            <h6>This web application still update. Please comeback later. Thanks you!</h6>
                            <div style={{ marginLeft: '48%', marginRight: '48%' }}><ReactLoading type={'spin'} color={'white'} /></div>

                        </Alert>
                            <Button style={{ marginBottom: '2%' }} variant="outline-info" name='authencation' onClick={this.handleClick} >Go back <Icon size='small' name='arrow right' /></Button>

                        </div>

                    </div>
                }

            </div>



        );
    }
}
export default HomePage;