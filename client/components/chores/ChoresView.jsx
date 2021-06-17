import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getChores } from '../../store/actions/choreActions/fetchChoresByFamily';
import ChoreCard from './ChoreCard';
import Modal from '@material-ui/core/Modal';
import AddChore from './AddChore';
import UpdateChore from './UpdateChore';
import { Button, Menu, MenuItem } from '@material-ui/core';
import sortBy from '../../utilities/choreSort';


/*FEEDBACK: this component is hard to read, especially with all the different pieces of local state and
the multiple and nested ternary operators.

Can some of this state be moved to redux? Particularly the kids/selectedKid slice of the state since they are passed to other components

This component can be broken up into different sub components. As sub component for a parent chore view and a child chore view, and use this as the parent component
that mostly holds the logic of which subcomponent to render.

Is the only reason for allKids to trigger a re-render when all is selected? Could you accomplish the same thing using one of the existing items in state? */
const Chores = (props) => {
  const [kids, setKids] = useState([]);
  const [chores, setChores] = useState([]);
  const [expiredChores, setExpiredChores] = useState([]);
  const [addChore, setAddChore] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [choreToUpdate, setChoreToUpdate] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [childSelect, setChildSelect] = useState(false);
  const [selectedKid, setSelectedKid] = useState({});
  const [allKids, setAllKids] = useState(0);
  const [choresUpdated, setUpdated] = useState(1);

  const handleClose = (id) => {
    if (id === 'modal') {
      setAddChore(false);
      setUpdateClicked(false);
    }
    if (id === 'sort') setAnchorEl(null);
  };

  console.log(props);

  useEffect(() => {
    if (props.currUser.id) {
      props.getChores(props.currUser.familyId);
      if (props.currUser.status === 'Parent')
        setKids(
          props.currUser.family?.users.filter((user) => user.status === 'Child')
        );
    }
  }, [props.currUser, allKids]);

  useEffect(() => {
    if (props.chores.length) {
      const today = new Date();
      const currentChores = [];
      setExpiredChores(
        /*FEEDBACK: this can be a util function and can DRY out the code
        since its similar to lines 70 - 81 */
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
    setChildSelect(false);
  }, [props.chores]);

  useEffect(() => {
    const today = new Date();
    const currentChores = [];
    if (childSelect) {
      setExpiredChores(
        props.chores.filter((chore) => {
          if (
            chore.due &&
            new Date(chore.due) < today &&
            chore.userId === selectedKid.id
          ) {
            return chore;
          } else {
            currentChores.push(chore);
          }
        })
      );
      setChores(
        currentChores.filter((chore) => chore.userId === selectedKid.id)
      );
      setChildSelect(false);
    }
  }, [childSelect]);

  useEffect(() => {
    if (props.currUser.status === 'Child') {
      setChores(chores.filter((chore) => chore.userId === props.currUser.id));
      setExpiredChores(
        expiredChores.filter((chore) => chore.userId === props.currUser.id)
      );
    }
  }, [choresUpdated]);

  if (!props.currUser.id) {
    return <h1>Please LogIn/Sign Up!</h1>;
  }

  return (
    <div
      id={
        props.currUser.status === 'Parent'
          ? 'choresContainerParent'
          : 'choresContainer'
      }
    >
      <img
        src="public/images/chores.png"
        style={{
          height: '80vh',
          margin: '50px',
          marginLeft: '100px',
          position: 'fixed',
        }}
      ></img>
      <div
        id={
          props.currUser.status === 'Parent' ? 'choresViewParent' : 'choresView'
        }
      >
        {props.chores.length ? (
          <div id="choreCardContainer">
            {props.currUser.status === 'Parent' ? (
              <div>
                <Modal
                  id="addChoreModal"
                  open={addChore}
                  onClose={() => {
                    handleClose('modal');
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
                handleClose('modal');
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
                <div id="filterAndSortChores">
                  <div id="chooseChildHover">
                    <Button
                      id="childDropButton"
                      variant="contained"
                      color="secondary"
                    >
                      Choose child
                    </Button>
                    <div id="childDropdownContent">
                      {kids.map((user) => {
                        return (
                          <div
                            key={`${user.id}familyChild`}
                            onClick={() => {
                              setChildSelect(true);
                              setSelectedKid(user);
                            }}
                          >
                            {user.firstName}
                          </div>
                        );
                      })}
                      <div
                        onClick={() => {
                          setAllKids(allKids + 1);
                        }}
                      >
                        All
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="contained"
                  onClick={() => setAddChore(true)}
                  color="secondary"
                >
                  Add Chore
                </Button>
              </div>
            ) : (
              <div id="childDropdown">
                <div id="childDropdown">
                  <div id="filterAndSortChores">
                    <div id="chooseChildHover">
                      <Button
                        id="sortButtonChild"
                        variant="outlined"
                        color="secondary"
                        style={{
                          color: 'white',
                          backgroundColor: 'tomato',
                          border: '2px white solid',
                        }}
                      >
                        &nbsp;&nbsp;Sort By&nbsp;&nbsp;
                      </Button>
                      <div id="childDropdownContent">
                        <div
                          onClick={() => setChores(sortBy('amount', chores))}
                        >
                          Amount
                        </div>
                        <div onClick={() => setChores(sortBy('due', chores))}>
                          Due
                        </div>
                        <div
                          onClick={() =>
                            setChores(sortBy('incomplete', chores))
                          }
                        >
                          Incomplete
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => {
                    handleClose('sort');
                  }}
                >
                  <MenuItem onClick={() => handleClose('sort')}>
                    Amount
                  </MenuItem>
                </Menu>
              </div>
            )}
            {/*FEEDBACK: could you map over the full list of chores from props instead of mapping over current chores and expired chores separately?
            it seems as if you're sending the same info about the two groups of chores*/}
            {chores.map((chore) => (
              <ChoreCard
                currUser={props.currUser}
                chore={chore}
                key={`${chore.id}chore`}
                isParent={props.currUser.status === 'Parent'}
                stripeAccount={props.currUser.stripeAccount}
                updateClicked={setUpdateClicked}
                setChore={setChoreToUpdate}
              />
            ))}
            {expiredChores.map((chore) => (
              <ChoreCard
                currUser={props.currUser}
                chore={chore}
                key={`${chore.id}chore`}
                isParent={props.currUser.status === 'Parent'}
                stripeAccount={props.currUser.stripeAccount}
                updateClicked={setUpdateClicked}
                setChore={setChoreToUpdate}
              />
            ))}
          </div>
        ) : props.currUser?.status === 'Parent' ? (
          <div>
            You haven&apos;t added chores! Please click <span>here</span> to add
            a chore.
          </div>
        ) : (
          <div>
            You haven&apos;t been assigned any chores. Click here to send your
            parent(s) a reminder to add chores.
          </div>
        )}
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
