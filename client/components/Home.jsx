import React, { useState } from 'react';
import { Button, Modal } from '@material-ui/core';

const Home = () => {
  const [open, setOpen] = useState(false);

  const teamMembers = [
    {
      name: 'Anna Litovskaya',
      linkedin: 'https://www.linkedin.com/in/alitovskaya/',
      github: 'https://github.com/AnnaLitovskaya',
    },
    {
      name: 'Damien Outar',
      linkedin: 'https://www.linkedin.com/in/damien-outar-391878112/',
      github: 'https://github.com/damien868',
    },
    {
      name: 'Hugo Sanchez',
      linkedin: 'https://www.linkedin.com/in/hugo-sanchez-35b1881b8/',
      github: 'http://github.com/hugsanchez',
    },
    {
      name: 'Keri Weiss',
      linkedin: 'https://www.linkedin.com/in/keren-weiss-021b5a30/',
      github: 'https://github.com/keriweiss',
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div id="homeContainer">
      <div id="homeBanner">
        <a
          href="https://github.com/Channel-4-News/Channel-4-News"
          target="_blank"
          rel="noreferrer"
        >
          <Button
            style={{ marginRight: '6vw', width: '10vw', fontSize: '1.1vw' }}
          >
            GITHUB REPO
          </Button>
        </a>
        <div style={{ marginRight: '6vw', width: '13vw', fontSize: '1vw' }}>
          <div>
            Child login{' '}
            <div id="childDemoLogin">
              <div>Email: joey@test.com</div>
              <div>Password: password123</div>
            </div>
          </div>
          <div>
            Parent login
            <div id="parentDemoLogin">
              <div>Email: mom@test.com</div>
              <div>Password: password123</div>
            </div>
          </div>
        </div>
        <div id="tagline">Not your average piggy bank.</div>
      </div>
      <div id="homeCard">
        <img src="public/images/homecardyellow.png"></img>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div id="meetTheTeam">
          {teamMembers.map((member) => {
            return (
              <div key={member.name} className="memberContainer">
                <span className="teamMember">{member.name}</span>
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={member.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            );
          })}
        </div>
      </Modal>
      <div id="infoBoxes">
        <div id="testinfo">
          FUNDIT is a family web-app for tracking chores and allowances. Kids
          can save money and shop online with their own virtual credit card
          managed by you, their parent(s). Help your kids build responsible and
          healthy money habits. FUNDIT is meant for kids ages 6-16.
        </div>
        <div id="testinfo2">
          <h3>BUILT BY</h3>
          {teamMembers.map((member) => {
            return (
              <div key={member.name} className="memberContainer">
                <span className="teamMember">{member.name}</span>
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={member.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            );
          })}
        </div>

        <div id="techUsed">
          <img src="public/images/techs/sequelize-logo.png" />
          <img src="public/images/techs/1_PY24xlr4TpOkXW04HUoqrQ.jpg" />
          <img src="public/images/techs/1_q9myzo5Au8OfsaSrCodNmw.png" />
          <img src="public/images/techs/stripe-logo-blue.png" />
          <img src="public/images/techs/puppeteer.png" />
          <img src="public/images/techs/React_graphic.png" />
          <img src="public/images/techs/Redux.png" />
          <img src="public/images/techs/1200px-Plaid_logo.svg.png" />
          <img src="public/images/techs/passport.png" />
          <img src="public/images/techs/charjs.png" />
          <img src="public/images/techs/Firebase_Logo.png" />
        </div>
      </div>
    </div>
  );
};

export default Home;
