import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      message: '',
    };
    // handle change to 'username' field
    this.handleUser = (e) => {
      this.setState({
        username: e.target.value
      });
    };
    // this.handleUserChange = (e) => {
    //   if (e.key === 'Enter') {
    //     this.props.changeUser({
    //       username: this.state.username
    //     });
    //   }
    // };
    // handle change to 'message' field
    this.handleMessage = (e) => {
      this.setState({
        message: e.target.value
      });
    };
    // on 'Enter' send message back to App
    this.submitNewMessage = (e) => {
      const message = this.state.message
      if (e.key === 'Enter' && message) {
        this.props.addMessage({
          username: this.state.username || 'Anonymous',
          content: message,
          messageType: 'user'
        });
      }
    }
  // end of constructor
  }





  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          value={this.state.username}
          onChange={this.handleUser}
          // onKeyPress={this.handleUserChange}
          placeholder="Your Name (Optional)"
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