import React, {Component} from 'react';

class Message extends Component {

  render() {
    const content = this.props.content;
    const imgURL = content.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\.(png|gif|jpg)/gi);

    return (
      <div className={ this.props.className }>
        <span style={{ color: this.props.colour }} className="username">{ this.props.username }</span>
        <span className="content">{ content.replace(imgURL, '') }
          <br/>
          <img src={ imgURL }></img>
        </span>

      </div>
    );

  }
}
export default Message;

//<span className="content">{ this.props.content }</span>