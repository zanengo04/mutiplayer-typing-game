import React from 'react';
import socketClient  from "socket.io-client";

import Typing from './components/Typing'

const SERVER = "http://127.0.0.1:5000";
function App() {
  var socket = socketClient (SERVER, {transports: ['websocket']});
  socket.on('message', message => {console.log(message)})
  return (
      <Typing />
  );
}

export default App;
