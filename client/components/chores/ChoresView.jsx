import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getChores } from '../../store/actions/choreActions/fetchChoresByFamily';
import ChoreCard from './ChoreCard';
import AddUpdateChoreContainer from './AddUpdateChoreContainer';
import KidsChoreSort from './KidsChoreSort';
import ParentSortAddButtons from './ParentSortAddButtons';

const Chores = (props) => {
  const [chores, setChores] = useState([]);
  const [expiredChores, setExpiredChores] = useState([]);
  const [addChore, setAddChore] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [choreToUpdate, setChoreToUpdate] = useState({});
  const [childSelect, setChildSelect] = useState(false);
  const [selectedKid, setSelectedKid] = useState({});
  const [choresUpdated, setUpdated] = useState(1);

  const handleClose = (id) => {
    if (id === 'modal') {
      setAddChore(false);
      setUpdateClicked(false);
    }
  };

  console.log(chores);

  useEffect(() => {
    if (props.currUser.id) {
      props.getChores(props.currUser.familyId);
    }
  }, [props.currUser]);

  useEffect(() => {
    if (props.chores.length) {
      const today = new Date();
      const currentChores = [];
      setExpiredChores(
        props.chores.filter((chore) => {
          if (chore.due && new Date(chore.due) < today && !chore.isRecurring) {
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
    if (childSelect && selectedKid.id) {
      setExpiredChores(
        props.chores.filter((chore) => {
          if (
            chore.due &&
            new Date(chore.due) < today &&
            chore.userId === selectedKid.id &&
            !chore.isRecurring
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
    } else if (childSelect) {
      setExpiredChores(
        props.chores.filter((chore) => {
          if (chore.due && new Date(chore.due) < today && !chore.isRecurring) {
            return chore;
          } else {
            currentChores.push(chore);
          }
        })
      );
      setChores(currentChores);
      setChildSelect(false);
    }
  }, [childSelect]);

  useEffect(() => {
    if (props.currUser.status === 'Child') {
      setChores(chores.filter((chore) => chore.userId === props.currUser.id));
      setExpiredChores(
        expiredChores.filter(
          (chore) => chore.userId === props.currUser.id && !chore.isRecurring
        )
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
            <AddUpdateChoreContainer
              addChore={addChore}
              handleClose={handleClose}
              setAddChore={setAddChore}
              updateClicked={updateClicked}
              choreToUpdate={choreToUpdate}
              setUpdateClicked={setUpdateClicked}
            />
            {props.kids.length > 1 && props.currUser.status === 'Parent' ? (
              <ParentSortAddButtons
                kids={props.kids}
                setChildSelect={setChildSelect}
                setSelectedKid={setSelectedKid}
                setAddChore={setAddChore}
              />
            ) : (
              <KidsChoreSort setChores={setChores} chores={chores} />
            )}
            {chores.map((chore) => (
              <ChoreCard
                chore={chore}
                key={`${chore.id}chore`}
                updateClicked={setUpdateClicked}
                setChore={setChoreToUpdate}
              />
            ))}
            {expiredChores.map((chore) => (
              <ChoreCard
                chore={chore}
                key={`${chore.id}chore`}
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
            You haven&apos;t been assigned any chores. Check back after your
            parent(s) assign you chores.
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
    kids: state.kids,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChores: (id) => dispatch(getChores(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chores);
