import React, {Component} from 'react';

import ChatBar from './ChatBar';
import MessageList from './MessageList';

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



class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = data;
  }

  addMessage(username, message) {
    console.log(username, message)
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    // init WebSocket client for this App instance
    this.socket = new WebSocket('ws://localhost:4000');

    this.socket.onopen = function(event) {
      console.log('Client: I am connected, right?');
    }
    this.socket.onmessage = function(event) {
      console.log(event.data);
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
        user={this.state.currentUser}

        />
      </div>
    );
  }
}
export default App;

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