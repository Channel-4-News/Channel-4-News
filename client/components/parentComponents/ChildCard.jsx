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

const PersonItem = ({ src, name, balance, selectedKid }) => {
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
          <div>Allowance</div>
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
          <Item className={styles.actions}>
            <Link className={styles.link}>Refresh</Link> •{' '}
            <Link className={styles.link}>See all</Link>
          </Item>
        </Row>
        {props.kids.map((kid) => {
          return (
            <div key={kid.firstName}>
              <PersonItem
                name={kid.firstName}
                balance={kid.balance}
                src={kid.imgUrl}
                selectedKid={kid}
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
