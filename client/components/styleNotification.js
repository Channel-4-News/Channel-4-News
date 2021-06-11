import { store } from 'react-notifications-component';
// import 'animate.css';

const choreSuccess = (text, amount) =>
  store.addNotification({
    title: 'Chore Completed',
    message: `${text} amount due $${amount}`,
    type: 'success',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate_animated', 'animate_fadeIn'],
    animationOut: ['anumate_animated', 'animate_fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });

const choreIncomplete = (text) =>
  store.addNotification({
    title: 'Chore Incomplete',
    message: `${text}`,
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate_animated', 'animate_fadeIn'],
    animationOut: ['anumate_animated', 'animate_fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });

// props.parents.map((currParent) => {
//     props.sendNotification({
//       text: `${props.chore.name} Incomplete! Assigned to ${props.chore.user.username}`,
//       amount: props.chore.amount,
//       isChoreCompleted: false,
//       isChore: true,
//       toId: currParent.id,
//     });
//   });

export { choreSuccess, choreIncomplete };
