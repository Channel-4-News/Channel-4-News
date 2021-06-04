const { setUp } = require('../socketUtils');
const { app } = require('./app');
const db = require('./db/db');

const syncAndSeed = require('./db/seed');

const PORT = process.env.PORT || 3000;

const init = () => {
  try {
    syncAndSeed();
    const server = app.listen(PORT, () =>
      console.log(`now listening to port ${PORT}`)
    );
    setUp(server);
  } catch (err) {
    console.log('error listening on port', err);
  }
};
init();
