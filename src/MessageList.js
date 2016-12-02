import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {

    const messages = this.props.messages;

    return (
      <div id="message-list">
        {messages.map((message) =>
            <Message
              key={ message.id }
              colour={ message.colour }
              className={ message.className }
              content={ message.content }
              username={ message.username }
            />
        )}
      </div>
    );

  }
}
export default MessageList;

