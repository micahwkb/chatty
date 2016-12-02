import React, {Component} from 'react';
import randomcolor from 'randomcolor';

import Nav from './Nav';
import ChatBar from './ChatBar';
import MessageList from './MessageList';

class App extends Component {
  //RB - props, not prop
  constructor(prop) {
    super(prop);
    this.state = {
      currentUser: {name: ''},
      userColour: randomcolor(),
      messages: [],
      userMessageCount: 0,
      connectedUsers: 0
    }
    // RB Quite a bit of comments, let's briefly discuss these
    // send user's message to socket server
    // RB another format is addMessage(content) { ... }
    // addMessage(content){
    //   ...rest of stuff
    // }
    this.addMessage = (content) => {
      //RB this.state.currentUser.name (let's chat about accessing nested properties)
      //RB How about assining name as 'Anonymous' from the start?
      const {currentUser, userColor, userMessageConut} = this.state;


      const username = currentUser.name || 'Anonymous';
      if (userMessageCount === 0) {
        this.changeUser(username)
      }
      // increment this client's message count
      //RB Let's look at destructuring as well (accessing items on this.state)
      //RB Why the space between ++?
      userMessageCount++;
      const userMessage = {
        type: 'incomingMessage',
        content: content,
        username: username,
        colour: userColour
      }
      // send message to socket server
      this.socket.send(JSON.stringify(userMessage));
    }
    // add new message rec'd back from socket server
    // to messages array
    this.buildMessages = (newMessage) => {
      const messages = this.state.messages.concat(newMessage);
      //RB ES6 feature
      this.setState({ messages });
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
        //RB also can take advantage of truthy/falsey
        if (this.state.userMessageCount === 0) {
          //RB Awesome using back ticks
          systemMessage.content = `${newUser} joined the chat`;
        }
        // change in user name AFTER first post
        else {
          systemMessage.content = `${currentUser || 'Anonymous'} changed their name to ${newUser}`;
        }
        // send message to socket server
        this.socket.send(JSON.stringify(systemMessage));
        // handle empty user
        //RB Do we need name here? or can we place it within currentUser
        // let currentUser = newUser || 'Anonymous';
        this.setState({ currentUser: newUser || 'Anonymous' });
      }
    }


  }

  componentDidMount() {
    // set a random colour for this client
    // RB Spacing
    this.setState({ userColour: randomcolor({luminosity: 'dark'}) });
    // init WebSocket client for this App instance
    this.socket = new WebSocket('ws://localhost:4000');
    // connected to Web Socket Server:
    // RB How about no => {}
    this.socket.onopen = () => console.log('socket client connected');
    // received message from WSS:
    // RB You can destructure event and just put {data} instead of event
    this.socket.onmessage = ({data}) => {
      // const {data} = event;
      const data = JSON.parse(data);
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
