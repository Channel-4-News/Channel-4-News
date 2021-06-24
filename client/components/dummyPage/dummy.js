import React from 'react';
import {
  TextField,
  Button,
  NativeSelect,
  MenuItem,
  Menu,
  Modal,
} from '@material-ui/core';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Dummy = () => {
  const [val, setVal] = React.useState('Select');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const parentTheme = createMuiTheme({
    palette: {
      primary: {
        light: '#e6f2f9',
        main: '#c9d4db',
        dark: '#b4bfc6',
        contrastText: '#fff',
      },
      secondary: {
        light: '#62efff',
        main: '#00bcd4',
        dark: '#008ba3',
        contrastText: '#000',
      },
    },
  });

  const kidTheme = createMuiTheme({
    palette: {
      primary: {
        light: '#7fc8ff',
        main: '#3e98ff',
        dark: '#006bcb',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff5993',
        main: '#ef0066',
        dark: '#b6003c',
        contrastText: '#000',
      },
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <ThemeProvider theme={parentTheme}>
        <div id="dummy">
          <h3>DUMMY PAGE</h3>
          <TextField variant="outlined" label="input" color="secondary">
            Input
          </TextField>
          <Button variant="contained" color="secondary">
            Button
          </Button>
          <div>
            <Button
              color="secondary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              variant="contained"
            >
              {val}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setVal('Change');
                }}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
          <div>
            <Button variant="contained" onClick={handleClickOpen}>
              Open alert dialog
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Use Googles location service?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="dummyColors">
            Parent Colors
            <div id="parentPrimary">
              Parent Primary
              <div className="light" />
              <div className="main" />
              <div className="dark" />
            </div>
            <div id="parentSecondary">
              Parent Secondary
              <div className="light" />
              <div className="main" />
              <div className="dark" />
            </div>
          </div>
        </div>
      </ThemeProvider>

      <ThemeProvider theme={kidTheme}>
        <div id="dummy">
          <h3>DUMMY PAGE</h3>
          <TextField variant="outlined" label="input" color="primary">
            Input
          </TextField>
          <Button variant="contained" color="secondary">
            Button
          </Button>
          <div>
            <Button
              color="secondary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              variant="contained"
            >
              {val}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setVal('Change');
                }}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
          <div>
            <Button variant="contained" onClick={handleClickOpen}>
              Open alert dialog
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Use Googles location service?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="dummyColors">
            Parent Colors
            <div id="kidPrimary">
              Kid Primary
              <div className="light" />
              <div className="main" />
              <div className="dark" />
            </div>
            <div id="kidSecondary">
              Kid Secondary
              <div className="light" />
              <div className="main" />
              <div className="dark" />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Dummy;
