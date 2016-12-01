import React, {Component} from 'react';

import MessageSystem from './MessageSystem';

class Message extends Component {

  render() {

    return (
      <div className={this.props.className}>
        <span className="username">{this.props.username}</span>
        <span className="content">{this.props.content}</span>
      </div>
    );
  }
}
export default Message;