import React, { useEffect, useState } from 'react';
import { Link as AliasLink } from 'react-router-dom';
import cx from 'clsx';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { connect } from 'react-redux';
import SpendingGraph from '../child components/SpendingGraph';
import axios from 'axios';

const usePersonStyles = makeStyles(() => ({
  text: {
    fontFamily: 'Barlow, san-serif',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  name: {
    fontWeight: 600,
    fontSize: '1rem',
    color: '#122740',
  },
  caption: {
    fontSize: '0.875rem',
    color: '#758392',
    marginTop: -4,
  },
  btn: {
    borderRadius: 20,
    padding: '0.125rem 0.75rem',
    borderColor: '#becddc',
    fontSize: '0.75rem',
  },
}));
const useModalStyles = makeStyles((props) => ({
  body: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '17px',
    lineHeight: 1.6,
  },
  modal: (props) => ({
    display: props.display,
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto',
    backgroundColor: 'rbga(0,0,0,0.5)',
  }),
  '@keyframes modalopen': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  modalContent: {
    backgroundColor: '#f4f4f4',
    margin: '20% auto',
    padding: '20px',
    width: '70%',
    boxShadow: '0 5px 8px 0 rgba(0,0,0,0.2),0 7px 20px 0 rgba(0,0,0,0.17)',
    animation: '$modalopen 1s',
  },
  closeBtn: {
    color: '#ccc',
    float: 'right',
    fontSize: '30px',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    '&focus': {
      color: '#000',
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
}));

const ModalItem = ({ kid }) => {
  const [display, setDisplay] = useState('none');
  const [newAllowance, setNewAllowance] = useState(kid.allowance);
  const [newInterval, setNewInterval] = useState(kid.allowanceInterval);
  let props = { display: display };
  const styles = useModalStyles(props);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(kid);
    await axios.put(`/api/users/allowance/modify/${kid.id}`, {
      newAllowance,
      newInterval,
    });
    setDisplay('none');
    console.log('submitted');
  };
  const handleChange = (evt) => {
    evt.target.name === 'allowance'
      ? setNewAllowance(evt.target.value)
      : setNewInterval(evt.target.value);
  };
  return (
    <div>
      <Button
        id="modalBtn"
        className={styles.btn}
        variant={'outlined'}
        onClick={() => {
          setDisplay('block');
          console.log(props);
        }}
      >
        Change Allowance
      </Button>
      <div id="simpleModal" className={cx(styles.modal)}>
        <div className={cx(styles.modalContent)}>
          <span
            className={cx(styles.closeBtn)}
            onClick={() => {
              setDisplay('none');
            }}
          >
            &times;
          </span>
          <h1>Adjust Allowance</h1>
          <form onSubmit={handleSubmit}>
            <h6>New Allowance:</h6>
            <input type="text" name="allowance" onChange={handleChange}></input>
            <h6>New Allowance Interval:</h6>
            <input type="text" name="interval" onChange={handleChange}></input>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};
const PersonItem = ({ src, name, balance, selectedKid, kid }) => {
  const avatarStyles = useDynamicAvatarStyles({ size: 100 });
  const styles = usePersonStyles();
  return (
    <Row gap={2} p={2.5}>
      <Item>
        <Avatar classes={avatarStyles} src={src} />
      </Item>
      <Row wrap grow gap={0.5} minWidth={0}>
        <Item grow minWidth={0}>
          <div className={cx(styles.name, styles.text)}>{name}</div>
          <div className={cx(styles.caption, styles.text)}>
            Balance: ${balance}
          </div>
        </Item>
        <Item position={'middle'}>
          <div>
            Allowance in {kid.allowanceInterval} days: ${kid.allowance}
          </div>
          <ModalItem kid={kid} />
          <AliasLink to={{ pathname: '/chores', state: { selectedKid } }}>
            <Button className={styles.btn} variant={'outlined'}>
              Assigned Chores
            </Button>
          </AliasLink>
        </Item>
      </Row>
    </Row>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    borderRadius: 16,
    boxShadow: '0 8px 16px 0 #BDC9D7',
    overflow: 'hidden',
  },
  header: {
    fontFamily: 'Barlow, san-serif',
    backgroundColor: '#fff',
  },
  headline: {
    color: '#122740',
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  link: {
    color: '#2281bb',
    padding: '0 0.25rem',
    fontSize: '0.875rem',
  },
  actions: {
    color: '#BDC9D7',
  },
  divider: {
    backgroundColor: '#d9e2ee',
    margin: '0 20px',
  },
}));
const getTransactions = async (id) => {
  const response = await axios.get(`/api/transaction/${id}`);
  const kidTransactions = response.data;
  return kidTransactions;
};
const ChildCard = React.memo(function SocialCard(props) {
  const styles = useStyles();
  props.kids.map(async (kid) => {
    kid.transactions = await getTransactions(kid.id);
    return kid;
  });
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: 'Barlow', weights: [400, 600] }]} />
      </NoSsr>
      <Column p={0} gap={0} className={styles.card}>
        <Row wrap p={2} alignItems={'baseline'} className={styles.header}>
          <Item stretched className={styles.headline}>
            Your kids:
          </Item>
          {/* <Item className={styles.actions}>
            <Link className={styles.link}>Refresh</Link> •{' '}
            <Link className={styles.link}>See all</Link>
          </Item> */}
        </Row>
        {props.kids.map((kid) => {
          return (
            <div key={kid.firstName}>
              <PersonItem
                name={kid.firstName}
                balance={kid.balance}
                src={kid.imgUrl}
                selectedKid={kid}
                kid={kid}
              />
              <SpendingGraph transactions={kid.transactions} />
              <Divider variant={'middle'} className={styles.divider} />
            </div>
          );
        })}
      </Column>
    </>
  );
});

export default connect()(ChildCard);
