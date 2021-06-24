import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const EmailInviteForm = (props) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    parentName: props.user.firstName,
  });

  const handleChange = (e, field) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <Card id="emailFormWrapper">
      <CardContent>
        <Typography id="emailFormTitle">
          Invite Your Child To <span id="navlogo">FUND</span>
          <span id="logoITparent">IT</span>!
        </Typography>
        <TextField
          value={form.name}
          className="emailFormBox"
          label="Child Name"
          variant="outlined"
          color="secondary"
          onChange={(e) => handleChange(e, 'name')}
        />
        <TextField
          value={form.email}
          className="emailFormBox"
          label="Child Email"
          variant="outlined"
          color="secondary"
          onChange={(e) => handleChange(e, 'email')}
        />
        <TextField
          value={form.message}
          className="emailFormBox"
          label="Send A Message"
          variant="outlined"
          color="secondary"
          multiline
          rows={8}
          onChange={(e) => handleChange(e, 'message')}
        />
      </CardContent>
      <CardActions id="emailFormButtons">
        <Button
          size="small"
          variant="contained"
          onClick={async () => {
            const result = await axios.post('/api/invite/', form);
            props.setOpen(false);
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }}
        >
          Send Invite
        </Button>
        <Button
          onClick={() =>
            setForm({
              name: '',
              email: '',
              message: '',
            })
          }
          size="small"
          variant="contained"
        >
          Clear Form
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
  };
};

export default connect(mapStateToProps)(EmailInviteForm);
