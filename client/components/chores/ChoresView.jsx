import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getChores } from '../../store/actions/choreActions/fetchChoresByFamily';
import ChoreCard from './ChoreCard';
import Modal from '@material-ui/core/Modal';
import AddChore from './AddChore';
import UpdateChore from './UpdateChore';

const Chores = (props) => {
  const [kids, setKids] = useState([]);
  const [chores, setChores] = useState([]);
  const [expiredChores, setExpiredChores] = useState([]);
  const [choresUpdated, setUpdated] = useState(1);
  const [addChore, setAddChore] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [choreToUpdate, setChoreToUpdate] = useState({});

  const handleClose = () => {
    setAddChore(false);
    setUpdateClicked(false);
  };

  useEffect(() => {
    if (props.currUser.id) {
      props.getChores(props.currUser.familyId);
      if (props.currUser.status === 'Parent')
        setKids(
          props.currUser.family.users.filter((user) => user.status === 'Child')
        );
    }
  }, [props.currUser]);

  useEffect(() => {
    if (props.chores.length) {
      const today = new Date();
      const currentChores = [];
      setExpiredChores(
        props.chores.filter((chore) => {
          if (chore.due && new Date(chore.due) < today) {
            return chore;
          } else {
            currentChores.push(chore);
          }
        })
      );
      setChores(currentChores);
      setUpdated(choresUpdated + 1);
    }
  }, [props.chores]);

  useEffect(() => {
    if (props.currUser.status === 'Child') {
      setChores(chores.filter((chore) => chore.userId === props.currUser.id));
      setExpiredChores(
        expiredChores.filter((chore) => chore.userId === props.currUser.id)
      );
    }
  }, [choresUpdated]);

  return (
    <div id="choresView">
      <div id="choreCardContainer">
        {props.currUser.status === 'Parent' ? (
          <div>
            <p onClick={() => setAddChore(true)}>Add Chore</p>
            <Modal
              id="addChoreModal"
              open={addChore}
              onClose={() => {
                handleClose();
              }}
            >
              <AddChore
                kids={kids}
                familyId={props.currUser.familyId}
                setAddChore={setAddChore}
              />
            </Modal>
          </div>
        ) : null}
        <Modal
          id="addChoreModal"
          open={updateClicked}
          onClose={() => {
            handleClose();
          }}
        >
          <UpdateChore
            chore={choreToUpdate}
            kids={kids}
            setClicked={setUpdateClicked}
          />
        </Modal>
        {kids.length > 1 && props.currUser.status === 'Parent' ? (
          <div id="childDropdown">
            <button id="childDropButton">Choose child</button>
            <div id="childDropdownContent">
              {kids.map((user) => {
                return (
                  <div
                    key={`${user.id}familyChild`}
                    onClick={() => {
                      setChores(
                        props.chores.filter((chore) => chore.userId === user.id)
                      );
                    }}
                  >
                    {user.firstName}
                  </div>
                );
              })}
              <div
                onClick={() => {
                  setChores(props.chores);
                }}
              >
                All
              </div>
            </div>
          </div>
        ) : null}
        {chores.map((chore) => (
          <ChoreCard
            chore={chore}
            key={`${chore.id}chore`}
            isParent={props.currUser.status === 'Parent'}
            updateClicked={setUpdateClicked}
            setChore={setChoreToUpdate}
          />
        ))}
        {expiredChores.map((chore) => (
          <ChoreCard
            chore={chore}
            key={`${chore.id}chore`}
            isParent={props.currUser.status === 'Parent'}
            updateClicked={setUpdateClicked}
            setChore={setChoreToUpdate}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    chores: state.chores,
    currUser: state.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChores: (id) => dispatch(getChores(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chores);
