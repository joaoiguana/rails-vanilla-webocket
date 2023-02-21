function createSocket() {
  // Action Cable has a websocket mounted at
  // ws://localhost:3000/cable
  const socket_url = 'ws://localhost:3000/cable';
  const socket = new WebSocket(socket_url);

  // When the socket is opened, we can send data to the server
  socket.onopen = function(event) {
    console.log("Connected to the server");
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
        id: 1,
        channel: 'AlertsChannel'
      })
    };
    socket.send(JSON.stringify(msg));
  }

  socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    // console.log("Recieved data from server", event.data);
    if (data.type === 'ping') {
      return;
    }
    if (data.message) {
      console.log(data.message)
    }
  }

  socket.onclose = function(event) {
    console.log("Disconnected from server");
  }

  socket.onerror = function(error) {
    console.log("Websocket error observed: ", error);
  }
}

createSocket();
