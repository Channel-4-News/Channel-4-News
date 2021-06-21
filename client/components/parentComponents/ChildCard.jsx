import React from 'react';
import { connect } from 'react-redux';
import ParentAllowanceInterval from './allowance components/ParentAllowanceInterval';
import ParentBalance from './allowance components/ParentBalance';
import AllowanceModal from './AllowanceModal';

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
      </Card>
    );
  }
}

export default connect()(ChildCard);
