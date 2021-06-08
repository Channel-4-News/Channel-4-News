// const ws = require('ws');
// let sockets = [];

// const setUp = (expressServer) => {
//   const socketServer = new ws.Server({ server: expressServer });
//   socketServer.on('connection', (socket) => {
//     sockets.push(socket);
//     socket.on('message', (message) => {
//       sockets.filter(s => s !== socket).forEach(s => s.send(message));
//     });
//   });
// };

let _sockets = [];
const setSockets = (sockets) => {
  _sockets = sockets;
};

const getSockets = () => {
  return _sockets;
};

module.exports = {
  getSockets,
  setSockets,
};
