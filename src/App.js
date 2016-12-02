import React, {Component} from 'react';
import randomcolor from 'randomcolor';

import Nav from './Nav';
import ChatBar from './ChatBar';
import MessageList from './MessageList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userMessageCount: 0
    }

    // send user's message to socket server
    this.sendMessageToServer = (content) => {
      const username = this.state.currentUser || 'Anonymous';
      if (this.state.userMessageCount === 0) {
        this.changeUser(username)
      }
      // increment this client's message count
      this.state.userMessageCount++;
      const userMessage = {
        type: 'incomingMessage',
        content: content,
        username: username,
        colour: this.state.userColour
      }
      // send message to socket server
      this.socket.send(JSON.stringify(userMessage));
    }
    // add new message rec'd back from socket server
    // to messages array
    this.buildMessages = (newMessage) => {
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });
    }
    this.changeUser = (newUser) => {

      const { currentUser, userMessageCount } = this.state;
      const systemMessage = {
            type: 'incomingNotification',
          };
      // ignore attempts to change to same username
      if (newUser !== currentUser) {
        // setting name before first post
        if (userMessageCount === 0) {
          systemMessage.content = `${newUser} joined the chat`;
        }
        // change in user name AFTER first post
        else {
          systemMessage.content = `${currentUser || 'Anonymous'} changed their name to ${newUser}`;
        }
        // send message to socket server
        this.socket.send(JSON.stringify(systemMessage));
        this.setState({ currentUser: newUser });
      }
    }
  // end of contstructor
  }

  componentDidMount() {
    // set a random colour for this client
    this.setState({ userColour: randomcolor({ luminosity: 'dark' }) });
    // init WebSocket client for this App instance
    this.socket = new WebSocket('ws://localhost:4000');
    // connected to Web Socket Server:
    this.socket.onopen = () => {
      console.log('socket client connected');
    }
    // received message from WSS:
    this.socket.onmessage = (event) => {

      const data = JSON.parse(event.data);
      data.className = 'message';

      switch(data.type) {
        case 'incomingNotification':
          data.className += ' system';
          this.buildMessages(data);
          break;
        case 'incomingMessage':
          this.buildMessages(data);
          break;
        case 'userCount':
          this.setState({ connectedUsers: data.count});
          break;
        default:
          throw new Error('unknown message type ' + data.type)
      }
    }
  }

  render() {

    const { connectedUsers, messages, currentUser } = this.state;

    return (
      <div className="wrapper">
        <Nav userCount={connectedUsers} />
        <MessageList messages={messages} />
        <ChatBar
          username={currentUser}
          changeUser={this.changeUser}
          handleName={this.handleName}
          addMessage={this.sendMessageToServer}
          handleMessage={this.handleMessage}
        />
      </div>
    );
  }
}
export default App;