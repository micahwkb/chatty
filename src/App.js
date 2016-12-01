import React, {Component} from 'react';
import randomcolor from 'randomcolor';

import Nav from './Nav';
import ChatBar from './ChatBar';
import MessageList from './MessageList';

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      currentUser: {name: ''},
      userColour: randomcolor(),
      messages: [],
      userMessageCount: 0,
      connectedUsers: 0
    }

    // send user's message to socket server
    this.addMessage = (content) => {
      const username = this.state.currentUser.name || 'Anonymous';
      if (this.state.userMessageCount === 0) {
        this.changeUser(username)
      }
      // increment this client's message count
      this.state.userMessageCount ++;
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
    // receiving username change via ENTER press from ChatBar
    this.changeUser = (newUser) => {
      // compare to current state value
      const currentUser = this.state.currentUser.name;
      const systemMessage = {
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
        this.setState({ currentUser: {name: name} });
      }
    }


  }

  componentDidMount() {
    // set a random colour for this client
    this.setState({ userColour: randomcolor({luminosity: 'dark'}) });
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

    return (
      <div className="wrapper">
        <Nav userCount={this.state.connectedUsers} />
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