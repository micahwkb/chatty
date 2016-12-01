import React, {Component} from 'react';

import MessageSystem from './MessageSystem';

class Message extends Component {

  render() {

    const content   = this.props.content;
    const username  = this.props.username;
    const className = this.props.messageType;

    return (
      <div className={className}>
        <span className="username">{username}</span>
        <span className="content">{content}</span>
      </div>
    );
  }
}
export default Message;