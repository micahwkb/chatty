import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      message: ''
    };
    // show change to 'username' field
    this.handleUser = (e) => {
      this.setState({
        username: e.target.value
      });
    };
    // send new username up to App on ENTER press
    //RB How about {key} instead of e
    this.handleUserChange = (e) => {
      if (e.key === 'Enter') {
        this.props.changeUser(this.state.username);
      }
    };
    // show change to 'message' field
    this.handleMessage = (e) => {
      this.setState({
        message: e.target.value
      });
    };
    // on 'Enter' send message back to App
    this.submitNewMessage = (e) => {
      //RB ES6 Destructuring
      const message = this.state.message
      // don't submit empty message
      if (e.key === 'Enter' && message) {
        this.props.addMessage(message);
      }
    }
    this.submitName = (e) => {
      const name = this.state.username
      // don't submit empty message
      if (e.key === 'Enter') {
        this.props.changeUser(name);
      }
    }
  }

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          value={this.state.username}
          onChange={this.handleUser}
          onKeyPress={this.handleUserChange}
          placeholder="Your Name (Optional, hit ENTER to set)"
        />
        <input
          id="new-message"
          type="text"
          value={this.state.message}
          onChange={this.handleMessage}
          onKeyPress={this.submitNewMessage}
          placeholder="Type a message and hit ENTER"
          />
      </footer>
    );
  }
}
export default ChatBar;
