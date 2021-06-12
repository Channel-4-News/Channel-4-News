import React, { useState, useEffect } from 'react';
import { db, firebaseRef } from './config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Chatroom = (props) => {
  const [message, setMessage] = useState('');

  const messagesRef = db.collection('messages');

  const { id, imgUrl, familyId } = props.user;

  if (familyId) {
    const query = messagesRef
      .where('room', '==', familyId)
      .orderBy('createdAt')
      .limit(20);
    const [messages] = useCollectionData(query, { idField: 'id' });
    console.log({ messages });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createdAt = firebaseRef.firestore.FieldValue.serverTimestamp();
    const newMessage = {
      uid: id,
      imgUrl: imgUrl,
      createdAt,
      text: message,
      room: familyId,
    };
    await messagesRef.add(newMessage);
    setMessage('');
  };

  return (
    <div className="messages">
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
  );
};

export default Chatroom;
