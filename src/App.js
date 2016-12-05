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
      userMessageCount: 0,
      nameSet: false,
      userColour: randomcolor({ luminosity: 'dark' })
    }

    this.sendMessageToServer = (content) => {
      const { currentUser, userMessageCount, userColour } = this.state;
      const username = currentUser || 'Anonymous';
      // insert "user joined" message if first post
      if (!userMessageCount) {
        this.changeUser(username);
      }

      this.state.userMessageCount++;
      const userMessage = {
        type: 'incomingMessage',
        content: content,
        username: username,
        colour: userColour
      }
      this.socket.send(JSON.stringify(userMessage));
    }
    // add new message rec'd back from socket server
    // to messages array
    this.buildMessages = (newMessage) => {
      this.setState({ messages: [...this.state.messages, newMessage] });
      // this.setState({ messages: messages });
    }
    this.changeUser = (newUser) => {

      const { currentUser, userMessageCount, nameSet } = this.state;
      const systemMessage = {
            type: 'incomingNotification'
          };
      if (newUser !== currentUser) {
        // setting name before first post
        if (!nameSet) {
          systemMessage.content = `${newUser} joined the chat`;
          this.setState({ nameSet: true })
        }
        else {
          systemMessage.content = `${currentUser || 'Anonymous'} changed their name to ${newUser}`;
        }
        this.socket.send(JSON.stringify(systemMessage));
        this.setState({ currentUser: newUser });
      }
    }
  // end of contstructor
  }

  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:4000');
    this.socket.onopen = () => console.log('Connected to websocket server');

    this.socket.onmessage = ({ data }) => {

      const msg = JSON.parse(data);
      msg.className = 'message';

      switch(msg.type) {
        case 'incomingNotification':
          msg.className += ' system';
          this.buildMessages(msg);
          break;
        case 'incomingMessage':
          this.buildMessages(msg);
          break;
        case 'userCount':
          this.setState({ connectedUsers: msg.count});
          break;
        default:
          throw new Error('unknown message type ' + msg.type)
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