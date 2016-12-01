import React, {Component} from 'react';

import ChatBar from './ChatBar';
import MessageList from './MessageList';

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      currentUser: {name: ''},
      messages: [],
      userMessageCount: 0,
    }
    // send user's message to socket server
    this.addMessage = (content) => {
      // increment this client's message count
      this.state.userMessageCount += 1;
      // console.log(this.state.userMessageCount)
      const userMessage = {
        type: 'incomingMessage',
        content: content,
        username: this.state.currentUser.name || 'Anonymous'
      }
      this.socket.send(JSON.stringify(userMessage));
    }
    // receiving username change via ENTER press from ChatBar
    this.changeUser = (newUser) => {
      // compare to current state value
      let currentUser = this.state.currentUser.name;
      let systemMessage = {
            type: 'incomingNotification',
          };
      // ignore attempts to change to same username
      if (newUser !== currentUser) {
        // setting name before first post
        if (this.state.userMessageCount === 0) {
          systemMessage.content = `${newUser} joined the chat`;
        }
        // change in user name AFTER first post
        else {
          systemMessage.content = `${currentUser || 'Anonymous'} changed their name to ${newUser}`;
        }
        // send message to socket server
        this.socket.send(JSON.stringify(systemMessage));
        // handle empty user
        let name = newUser || 'Anonymous';
        this.state.currentUser.name = name;
      }
    }

    this.buildMessage = (newMessage) => {
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });
      this.setState({ })
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // init WebSocket client for this App instance
    this.socket = new WebSocket('ws://localhost:4000');
    // connected to Web Socket Server:
    this.socket.onopen = (event) => {
      console.log('socket client connected');
    }
    // received message from WSS:
    this.socket.onmessage = (event) => {

      const newMessage = JSON.parse(event.data);
      newMessage.className = 'message';

      switch(newMessage.type) {
        case 'incomingNotification':
          newMessage.className += ' system';
          this.buildMessage(newMessage)
          break;
        case 'incomingMessage':
          this.buildMessage(newMessage)
          break;
        default:
          throw new Error('unknown message type ' + newMessage.type)
      }
    }
  }

  render() {

    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          username={this.state.currentUser.name}
          changeUser={this.changeUser}
          handleName={this.handleName}
          addMessage={this.addMessage}
          handleMessage={this.handleMessage}
        />
      </div>
    );
  }
}
export default App;