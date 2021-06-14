import React from 'react';

const MessageCard = (props) => {
  const { uid, imgUrl, text, username } = props.message;
  const messageClass = uid === props.user.id ? 'sent' : 'recieved';

  return (
    <div className={`message ${messageClass}`}>
      <div className="messageContent">
        <img src={imgUrl} className="hiddenImageSent" />
        <div className="messageText">
          <div id="username">{username}</div>
          <div>{text}</div>
        </div>
        <img src={imgUrl} className="hiddenImageRecieved" />
      </div>
    </div>
  );
};

export default MessageCard;
