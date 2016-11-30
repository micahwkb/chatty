import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.name || '',
      message: '',
    };
    this.handleUser     = this.handleUser.bind(this);
    this.handleMessage  = this.handleMessage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  // handle change to 'username' field
  handleUser(e) {
    this.setState({
      username: e.target.value
    });
  }
  // handle change to 'message' field
  handleMessage(e) {
    this.setState({
      message: e.target.value
    });
  }
  // on 'Enter' send message back to App
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.addMessage(
        this.state.username,
        this.state.message
        );
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
          placeholder="Your Name (Optional)"
        />
        <input
          id="new-message"
          type="text"
          value={this.state.message}
          onChange={this.handleMessage}
          onKeyPress={this.handleKeyPress}
          placeholder="Type a message and hit ENTER"
          />
      </footer>
    );
  }
}
export default ChatBar;