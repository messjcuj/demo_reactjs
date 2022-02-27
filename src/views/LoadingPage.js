import React from 'react';
import "./../styles/LayoutStyle.css";
import 'semantic-ui-css/semantic.min.css';
import ReactLoading from 'react-loading';




class LoadingPage extends React.Component {

  render() {
    return (
      <div className='grid-container'>
        <div className='item2'> <ReactLoading type={'bubbles'} color={'#99D1D3'} height={'100%'} width={'100%'} /></div>

      </div>
    );
  }


}
export default LoadingPage;