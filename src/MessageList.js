import React, {Component} from 'react';
import Message from './Message';
// import MessageSystem from './MessageSystem';

class MessageList extends Component {

  render() {

    const messages = this.props.messages;

    return (
      <div id="message-list">
        {messages.map((message) =>
            <Message
              key={message.id}
              username={message.username}
              content={message.content}
            />
        )}
      </div>

    );
  }
}
export default MessageList;

