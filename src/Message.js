import React, {Component} from 'react';

class Message extends Component {

  render() {

    const { content, className, colour, username } = this.props;
    const imgURL = content.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\.(png|gif|jpg)/gi);

    return (
      <div className={ className }>
        <span style={{ color: colour }} className="username">{ username }</span>
        <span className="content">{ content.replace(imgURL, '') }
          <br/>
          <img src={ imgURL }></img>
        </span>

      </div>
    );

  }
}
export default Message;

// doesn't work, issue with imgURL (no time to fix)
/*
const Message = ({ content, colour, className, userName }) => {

  const imgURL = content.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\.(png|gif|jpg)/gi);

  return (
    <div className={ className }>
      <span style={{ color: colour }} className="username">{ username }</span>
      <span className="content">{ content.replace(imgURL, '') }
        <br/>
        <img src={ imgURL }></img>
      </span>
    </div>
  );

}

export default Message;
*/