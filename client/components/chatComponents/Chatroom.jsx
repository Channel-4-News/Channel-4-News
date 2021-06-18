import React, { useState, useRef, useEffect } from 'react';
import { db, firebaseRef } from './config';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import MessageCard from './MessageCard';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';

const Chatroom = (props) => {
  const [message, setMessage] = useState('');
  const [emojiMart, setEmojiMart] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const customRef = useRef();

  const { id, imgUrl, familyId, username } = props.user;

  useEffect(() => {
    if (messages && !loaded) {
      customRef.current.scrollIntoView({ behavior: 'smooth' });
      setLoaded(true);
    }
  });

  const messagesRef = db.collection('messages');
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
    customRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const emojiSelect = (event) => {
    setMessage(message + event.native);
    setEmojiMart(false);
  };

  return (
    <div id="chatroom">
      <Paper id="chatroomBox">
        <Paper variant="outlined" id="messageBox">
          {messages?.map((oneMessage) => (
            <MessageCard
              key={oneMessage.id}
              message={oneMessage}
              user={props.user}
            />
          ))}
          <span ref={customRef}></span>
        </Paper>
        <FormControl id="messageInput" variant="outlined">
          <OutlinedInput
            id="component-outlined"
            className="inputMessage"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            value={message}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() => {
              setEmojiMart(!emojiMart);
            }}
            id="sentButton"
            color="default"
          >
            <Emoji emoji={{ id: 'smiley' }} size={40} />
          </Button>
          {emojiMart ? (
            <Picker
              onSelect={(event) => emojiSelect(event)}
              style={{ position: 'absolute', bottom: '60px', right: '20px' }}
            />
          ) : (
            ''
          )}
          <Button
            disabled={message ? false : true}
            variant="contained"
            onClick={handleSubmit}
            id="sentButton"
            color="primary"
          >
            Send
          </Button>
        </FormControl>
      </Paper>
    </div>
  );
};

export default Chatroom;
