import { store } from 'react-notifications-component';
import 'animate.css';

const choreSuccess = (text, amount) =>
  store.addNotification({
    title: 'Chore Completed',
    message: `${text}, amount due $${amount}!`,
    type: 'info',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate_animated', 'animate_fadeIn'],
    animationOut: ['anumate_animated', 'animate_fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });

const cashWithdrawl = (text) =>
  store.addNotification({
    title: 'Cash Withdrawl',
    message: `${text}!`,
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

const invoiceNote = (text) => {
  console.log('test');
  store.addNotification({
    title: 'Invoice',
    message: 'New invoice',
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
};

const choresCompletedSort = (notiArr) => {
  const newArr = notiArr.filter((currNoti) => currNoti.isChoreCompleted);
  if (!newArr.length) {
    return 'Currently No Chores Completed';
  }
  return newArr;
};

const cashRelated = (notiArr) => {
  const newArr = notiArr.filter((currNoti) => currNoti.isCash);
  if (!newArr.length) {
    return 'Currently No Cash Withdrawls';
  }
  return newArr;
};

export {
  choreSuccess,
  cashWithdrawl,
  choresCompletedSort,
  cashRelated,
  invoiceNote,
};
