import React, {Component} from 'react';

import MessageSystem from './MessageSystem';

class Message extends Component {

  render() {

    const content = this.props.content;
    const username = this.props.username;

    return (
      <div className="message">
        <span className="username">{username}</span>
        <span className="content">{content}</span>
      </div>
    );
  }
}
export default Message;

//e.g. inside "message"
/*
<span className="username">Anonymous1</span>
<span className="content">I won't be impressed with technology until I can download food.</span>
*/