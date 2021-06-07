import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendNotification } from '../store/actions/notificationActions/sendNotification';

/**
 * COMPONENT
 */
const Notification = ({ sendNotification, notifications }) => {
  // const {messages, users} = props
  const [toId, setToId] = useState(8);
  const [text, setText] = useState('Testing works');
  // const sendMessage = (ev)=> {
  //   ev.preventDefault();
  //   sendNotification({ text, toId });
  // };
  if (!notifications.length) {
    console.log('triggeredddd');
    return null;
  }

  return (
    <div>
      {console.log(notifications)}
      {notifications.map((currNote, idx) => {
        return <li key={idx}>{currNote.text}</li>;
      })}
    </div>
    // <div>
    //   {console.log(notifications)}
    //   <form className='messageForm' >
    //     <select value={ toId } onChange={ ev => setToId(8)}>
    //       <option value=''>-- choose a user --</option>
    //       {/* {
    //         .map( user => {
    //           return (
    //             <option key={ user.id } value={ user.id }>{ user.username }</option>
    //           );
    //         })
    //       } */}
    //     </select>
    //     <textarea value={ text } onChange={ ev => setText(ev.target.value)}></textarea>
    //     <button disabled={ !toId }>Send Message</button>
    //   </form>
    //   <ul>
    //     {
    //       notifications.map( (message, idx) => {
    //         return (
    //           <li key={ idx } className='message'>
    //             <div>
    //               <label>from:</label>
    //               <div>
    //                 { message.fromId }
    //               </div>
    //             </div>
    //             <div>
    //               <label>to:</label>
    //               <div>
    //                 { message.toId}
    //               </div>
    //             </div>
    //             <div className='text'>
    //             { message.text }
    //             </div>
    //           </li>
    //         );
    //       })
    //     }
    //   </ul>
    // </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  //only show message for or to current user
  return {
    notifications: state.notifications,
    currUser: state.currUser,
    //.filter(notification => notification.toId === state.auth.id || notification.fromId === state.auth.id),
    //users: state.users
  };
};

const mapDispatch = (dispatch) => {
  return {
    sendNotification: (message) => {
      dispatch(sendNotification(message));
    },
  };
};

export default connect(mapState, mapDispatch)(Notification);
