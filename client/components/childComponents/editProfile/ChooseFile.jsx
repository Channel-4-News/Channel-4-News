import React, { useState } from 'react';

//React Dropzone Imports
import { useDropzone } from 'react-dropzone';

//Redux Imports
import { connect } from 'react-redux';

//Material UI Imports
import CardMedia from '@material-ui/core/CardMedia';

//Style Imports
import '../../../../public/style/chooseFile.css';

const ChooseFile = ({ imgUrl }) => {
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
  return (
    <div>
      <section className="choose-file-container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {acceptedFiles.length ? onFileLoad(acceptedFiles) : ''}
          <p>Drag n drop some files here, or click to select files</p>
        </div>
      </section>
      <CardMedia
        component="img"
        height="140"
        className="profile-img"
        image={!newImgUrl ? imgUrl : newImgUrl}
      />
    </div>
  );
};

export default connect()(ChooseFile);
