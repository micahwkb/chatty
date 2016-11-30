import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: ''
    };
  }
  handleChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }
  handleMessage =(e) => {
    this.setState({
      message: e.target.value
    });
  }

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="Your Name (Optional)"
        />
        <input
          id="new-message"
          type="text"
          value={this.state.message}
          onChange={this.handleMessage}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default ChatBar;