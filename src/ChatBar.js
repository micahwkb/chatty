import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      message: ''
    };

    const { changeUser, addMessage } = this.props;

   /* this.updateUserField = ({ target }) => {
      this.setState({
        username: target.value
      });
    };*/
    this.submitNewUsername = ({ key, target }) => {
      // don't submit empty username
      if (key === 'Enter' && target.value) {
        changeUser(target.value);
      }
    };
    this.updateMessageField = ({ target }) => {
      this.setState({
        message: target.value
      });
    };
    this.submitNewMessage = ({ key }) => {
      const { message } = this.state;
      // don't submit empty message
      if (key === 'Enter' && message) {
        addMessage(message);
      }
    }
  }

  render() {

    const { username, message } = this.state;

    return (
      <footer>
        <input
          id="username"
          type="text"
          value={username}
          onChange={this.updateUserField}
          onKeyPress={this.submitNewUsername}
          placeholder="Your Name (Optional, hit ENTER to set)"
        />
        <input
          id="new-message"
          type="text"
          value={message}
          onChange={this.updateMessageField}
          onKeyPress={this.submitNewMessage}
          placeholder="Type a message and hit ENTER"
          />
      </footer>
    );
  }
}
export default ChatBar;