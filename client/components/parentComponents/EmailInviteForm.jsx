import React from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const EmailInviteForm = () => {
  return (
    <Card id="emailFormWrapper">
      <CardContent>
        <Typography id="emailFormTitle">
          Invite Your Child To <span id="navlogo">FUND</span>
          <span id="logoITparent">IT</span>!
        </Typography>
        <TextField className="emailFormBox" label="Name" variant="outlined" />
        <TextField className="emailFormBox" label="Email" variant="outlined" />
        <TextField
          className="emailFormBox"
          label="Message"
          variant="outlined"
          multiline
          rows={8}
        />
      </CardContent>
      <CardActions id="emailFormButtons">
        <Button size="small" variant="contained">
          Send Invite
        </Button>
        <Button size="small" variant="contained">
          Clear Form
        </Button>
      </CardActions>
    </Card>
  );
};

export default connect()(EmailInviteForm);
