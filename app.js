const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = event => {
  const messages = document.getElementById('messages');
  const messageData = JSON.parse(event.data);
  const message = document.createElement('div');
  message.classList.add('message');
  if (messageData.self) {
    message.classList.add('self');
  }
  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  const content = document.createElement('div');
  content.classList.add('message-content');
  content.textContent = messageData.text;
  const timestamp = document.createElement('div');
  timestamp.classList.add('timestamp');
  timestamp.textContent = new Date(messageData.time).toLocaleTimeString();

  message.appendChild(avatar);
  message.appendChild(content);
  message.appendChild(timestamp);
  messages.appendChild(message);

  // Scroll to the bottom of the chat
  messages.scrollTop = messages.scrollHeight;
};

function sendMessage() {
  const input = document.getElementById('messageInput');
  if (input.value.trim()) {
    const message = {
      text: input.value,
      time: Date.now(),
      self: true
    };
    socket.send(JSON.stringify(message));
    input.value = '';
  }
}

// Ensure the enter key also sends the message
document.getElementById('messageInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
