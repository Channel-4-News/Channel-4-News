const socketUtils = require('../socketUtils');
const { app } = require('./app');
const db = require('./db/db');
const ws = require('ws');
const User = require('../server/db/models/User');

const syncAndSeed = require('./db/seed');

const PORT = process.env.PORT || 3000;

const init = () => {
  try {
    syncAndSeed();
    const server = app.listen(PORT, () =>
      console.log(`now listening to port ${PORT}`)
    );
    const socketServer = new ws.Server({ server });
    let sockets = [];
    socketServer.on('connection', (socket) => {
      sockets.push(socket);
      socketUtils.setSockets(sockets);

      socket.on('close', () => {
        sockets = sockets.filter((s) => s !== socket);
        socketUtils.setSockets(sockets);
      });
      socket.on('message', async (notification) => {
        const obj = JSON.parse(notification);
        if (obj.token) {
          const user = await User.byToken(obj.token);
          socket.userId = user.id;
        }
        sockets
          .filter((s) => s.userId === obj.toId)
          .forEach((s) => s.send(notification));
      });
    });
  } catch (err) {
    console.log('error listening on port', err);
  }
};
init();
