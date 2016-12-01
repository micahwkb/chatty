import React, {Component} from 'react';

import ChatBar from './ChatBar';
import MessageList from './MessageList';

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      currentUser: {name: ''},
      messages: []
    }
    // was going to handle user name change
    // with message input... better user experience IMO
    /*this.userChanged = (newName) => {
      // console.log(oldName, newName);
      let oldName = this.state.currentUser.name;
      if ( oldName !== '') {
        const systemMessage = {
          content: `${oldName} changed their name to ${newName}`
          };
        this.socket.send(JSON.stringify(systemMessage));
      }
      // update currentUser in state
      this.state.currentUser.name = newName
    }*/
    this.addMessage = (content) => {
      content.username = this.state.currentUser.name || 'Anonymous';
      const messageBody = JSON.stringify(content);
      // was going to handle name change on message receipt
      /* const messageUser = content.username;
      if (messageUser !== this.state.currentUser.name) {
        this.userChanged(messageUser);
      }*/
      this.socket.send(messageBody);
    }
    // receiving username change via ENTER press from ChatBar
    this.changeUser = (newUser) => {
      // compare to current state value
      if (newUser !== this.state.currentUser.name) {
        // handle empty user
        let name = newUser || 'Anonymous';
        const systemMessage = {
          messageType: 'message system',
          content: `${this.state.currentUser.name || 'Anonymous'} changed their name to ${name}`
          };
        this.socket.send(JSON.stringify(systemMessage));
        this.state.currentUser.name = name;
      }
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // init WebSocket client for this App instance
    this.socket = new WebSocket('ws://localhost:4000');


    this.socket.onopen = (event) => {
      console.log('socket client connected');
    }
    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      // console.log(this.state)
      let messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
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