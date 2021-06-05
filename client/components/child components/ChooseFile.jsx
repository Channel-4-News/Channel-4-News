import React, { useState } from 'react';

//React Dropzone Imports
import { useDropzone } from 'react-dropzone';

//Redux Imports
import { connect } from 'react-redux';

//Material UI Imports
import { Avatar, Button, Dialog, makeStyles } from '@material-ui/core';

//Style Imports
import '../../../public/style/chooseFile.css';

const useStyles = makeStyles((theme) => ({
  editAvatar: {
    width: '150px',
    height: '150px',
    alignSelf: 'center',
  },
  buttonChooseFile: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    margin: '1rem',
  },
}));

const ChooseFile = ({
  open,
  close,
  submit,
  firstName,
  lastName,
  username,
  email,
  imgUrl,
}) => {
  //From React Dropzone
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
  });

  const [newImgUrl, setNewImg] = useState('');

  if (!acceptedFiles) {
    return null;
  }
  const onFileLoad = (acceptedFiles) => {
    let file = acceptedFiles[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      setNewImg(fileReader.result);
    };
    fileReader.onabort = () => {
      alert('Reading aborted');
    };
    fileReader.onerror = () => {
      alert('Reading error');
    };

    fileReader.readAsDataURL(file);
  };

  const reset = () => {
    setNewImg(imgUrl);
    close();
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog open={open} onClose={close} fullWidth>
        <section className="choose-file-container">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {acceptedFiles.length ? onFileLoad(acceptedFiles) : ''}
            <p>Drag n drop some files here, or click to select files</p>
          </div>
        </section>
        <Avatar
          className={classes.editAvatar}
          src={!newImgUrl ? imgUrl : newImgUrl}
        />
        <div className={classes.buttonChooseFile}>
          <Button
            variant="contained"
            onClick={() =>
              submit(firstName, lastName, username, email, newImgUrl)
            }
          >
            Save!
          </Button>
          <Button variant="contained" onClick={() => reset()}>
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default connect()(ChooseFile);
