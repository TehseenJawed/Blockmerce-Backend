const socket = io("http://localhost:3000");
const messageform = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const name = prompt("what is your name?");

const payload = {
  name: "bilal",
  conversionId: "12345678",
  members: [1234, 12345],
  message: {
    sender: "bilal",
    receiver: "daniyal",
    content: "wow so amazing",
    createdAt: "wow",
  },
};

socket.on("send-message", (data) => {
  payload.data = data;
  appendMessage(payload);
});

messageform.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(payload);
  // socket.emit("send-chat-message", message);
  socket.emit("send-message", payload);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
