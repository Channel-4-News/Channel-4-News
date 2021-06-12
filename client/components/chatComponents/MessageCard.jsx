import React from 'react';

const MessageCard = (props) => {
  const { uid, imgUrl, createdAt, text, username } = props.message;
  const messageClass = uid === props.user.id ? 'sent' : 'recieved';

  return (
    <div className={`message ${messageClass}`}>
      <div className="messageContent">
        <img src={imgUrl} />
        <div>{username}</div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default MessageCard;
