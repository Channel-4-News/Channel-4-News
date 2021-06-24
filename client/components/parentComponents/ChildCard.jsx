import React from 'react';
import { connect } from 'react-redux';
import ParentAllowanceInterval from './allowance components/ParentAllowanceInterval';
import ParentBalance from './allowance components/ParentBalance';
import AllowanceModal from './AllowanceModal';
import TransactionModal from './TransactionModal';
import { setCurrentKid } from '../../store/actions/parentActions/setCurrentKid';
import VirtualCard from '../forms/VirtualCard';
import { getChores } from '../../store/actions/choreActions/fetchChoresByFamily';

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
        <div className="PLgraphics">
          <div className={'PLkidUsername'}>{kid.username}</div>
          <Avatar
            style={{ width: '230px', height: '230px' }}
            id="avatar"
            alt="current user pic"
            src={kid.imgUrl}
          />
        </div>
        <div className="PLcardHolder">
          <VirtualCard kid={kid} />
        </div>
        <div className="PLbalanceAllowance">
          <ParentBalance kid={kid} />
          <ParentAllowanceInterval kid={kid} />
          <div className="">
            <div className="PLnumChores"> </div>
            <div className="PLbuttons">
              <TransactionModal kid={kid} />
              <AllowanceModal kid={kid} getKids={this.props.getKids} />
              <Button
                size="medium"
                variant="contained"
                href="/#/chores"
                onClick={() => this.props.setCurrentKid(kid.id)}
              >
                Chores
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentKid: (id) => dispatch(setCurrentKid(id)),
    getChores: (id) => dispatch(getChores(id)),
  };
};

export default connect(null, mapDispatchToProps)(ChildCard);
