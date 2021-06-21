import React from 'react';
import { connect } from 'react-redux';
import ParentAllowanceInterval from './allowance components/ParentAllowanceInterval';
import ParentBalance from './allowance components/ParentBalance';
import AllowanceModal from './AllowanceModal';
import TransactionModal from './TransactionModal';
import { setCurrentKid } from '../../store/actions/parentActions/setCurrentKid';

import SpendingGraph from '../child components/SpendingGraph';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

class ChildCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      allowance: '',
      allowanceInterval: '',
    };
  }

  render() {
    const { kid } = this.props;
    return (
      <Card id="kidCard">
        <Avatar
          style={{ width: '230px', height: '230px' }}
          id="avatar"
          alt="current user pic"
          src={kid.imgUrl}
        />
        <div>{kid.username}</div>
        <ParentBalance kid={kid} />
        <SpendingGraph
          transactions={kid.transactions}
          small={true}
          kid={kid.firstName}
        />
        <ParentAllowanceInterval kid={kid} />
        <AllowanceModal kid={kid} getKids={this.props.getKids} />
        <TransactionModal kid={kid} />
        <Button
          size="large"
          color="secondary"
          variant="contained"
          href="/#/chores"
          onClick={() => this.props.setCurrentKid(kid.id)}
        >
          {kid.firstName}&apos;s Chores
        </Button>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentKid: (id) => dispatch(setCurrentKid(id)),
  };
};

export default connect(null, mapDispatchToProps)(ChildCard);
