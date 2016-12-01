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
    this.userChanged = (newName) => {
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
    }
    this.addMessage = (content) => {
      const messageBody = JSON.stringify(content);
      const messageUser = content.username;

      if (messageUser !== this.state.currentUser.name) {
        this.userChanged(messageUser);
      }
      this.socket.send(messageBody);
    }
    this.changeUser = (newUser) => {
      this.state.currentUser.name = newUser.username;
      let message = this.state.messages.concat()
      // console.log("CurrentUser:",this.state.currentUser.name)
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
          handleName={this.handleName}
          handleMessage={this.handleMessage}
          addMessage={this.addMessage}
          changeUser={this.changeUser}
          username={this.state.currentUser.name}
        />
      </div>
    );
  }
}
export default App;


// example data
/*
const data = {
  // optional. if currentUser is not defined, it means the user is Anonymous
  currentUser: {name: "Bob"},
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};
*/

// example, within componentDidMount
/*
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 2000);
    */