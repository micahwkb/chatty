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
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {

    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;

// simple example:
/*
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
*/