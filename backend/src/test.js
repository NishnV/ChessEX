const WebSocket = require('ws');
const url = 'ws://localhost:8080'; // Replace with your server's WebSocket URL

function connect(userId) {
  const connection = new WebSocket(url);

  connection.onopen = () => {
    console.log(`User ${userId} connected!`);
    connection.send({
      type : "init_game"
    });

    connection.onmessage = (event) => {
      console.log(event.data);
    }
  };

  // Handle errors and connection closing as needed
}

connect('user1');
//connect('user2');
