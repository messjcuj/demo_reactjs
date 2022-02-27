import React from 'react';
import "./../styles/LayoutStyle.css";
import { Icon } from 'semantic-ui-react';
class Header extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (

      <div className='header'>
        <h6>
          <a className='link' href=''>
            <Icon size='small' name='arrow left' />
            Back to Home
          </a>
        </h6>


      </div>

    )
  }
}
export default Header;