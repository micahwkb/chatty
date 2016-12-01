import React, {Component} from 'react';

class Message extends Component {

  render() {

    return (
      <div className={ this.props.className }>
        <span style={{ color: this.props.colour }} className="username">{ this.props.username }</span>
        <span className="content">{ this.props.content }</span>
      </div>
    );

  }
}
export default Message;