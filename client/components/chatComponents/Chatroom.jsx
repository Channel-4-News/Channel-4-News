import React, { useState } from 'react';
import { db, firebaseRef } from './config';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import MessageCard from './MessageCard';

const Chatroom = (props) => {
  const [message, setMessage] = useState('');

  const messagesRef = db.collection('messages');

  const { id, imgUrl, familyId, username } = props.user;

  let query;
  if (familyId) {
    query = messagesRef
      .where('room', '==', familyId)
      .orderBy('createdAt')
      .limit(20);
  }
  const [messages] = useCollectionData(query, { idField: 'id' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createdAt = firebaseRef.firestore.FieldValue.serverTimestamp();
    const newMessage = {
      uid: id,
      username,
      imgUrl,
      createdAt,
      text: message,
      room: familyId,
    };
    await messagesRef.add(newMessage);
    setMessage('');
  };

  return messages ? (
    <div className="messages">
      {messages.map((oneMessage) => (
        <MessageCard
          key={oneMessage.id}
          message={oneMessage}
          user={props.user}
        />
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button type="submit" disabled={!message}>
          Send
        </button>
      </form>
    </div>
  ) : (
    <div>butts</div>
  );
};

export default Chatroom;
