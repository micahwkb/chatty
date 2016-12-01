import React, {Component} from 'react';


class Nav extends Component {

  render() {

    return (
      <nav>
        <div className="user-count">
          users online: { this.props.userCount }
        </div>
        <h1>Chatty</h1>
      </nav>
    );
  }
}
export default Nav;