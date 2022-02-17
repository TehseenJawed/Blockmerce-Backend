const { User } = require("../models/");
const { v4: uuidv4 } = require("uuid");
const { userService, chatService, vendorService } = require("../services/");

class WebSockets {
  connection(client) {
    // console.log(client);
    console.log("New client connected.");
    client.on("send-chat-message", (message) => {
      console.log(message);
      client.broadcast.emit("chat-message", message);
    });
    // Event when client disconnects

    // Event when client disconnets
    client.on("disconnect", (reason) => {
      // TODO
      console.log("client disconnected");
      console.log(reason);
    });

    // Event makes the user join a unique room based on their id
    client.on("subscribe", (payload) => {
      console.log(client.id, "just subscribed");
      console.log(payload, "<====sub payload");
      client.join(payload);
      console.log(client.adapter.rooms, "rooms function");
    });
    console.log(client.rooms);

    // Event when a message is sent

    client.on("send-message", async (payload) => {
      console.log(payload, "<==== payload");
      await chatService.handleChat(payload);

      let sender = await userService.getUserByIdForSearchInChat(payload.sender);
      if (!sender) {
        sender = await vendorService.getVendorById(payload.sender);
        sender.name = sender.shopName;
      }

      let message = {
        _id: uuidv4(),
        text: payload.text,
        createdAt: payload.createdAt,
        user: {
          _id: sender._id,
          name: sender.name,
        },
      };
      console.log(message, "<===============messasge");
      // Emit the message via sockets
      console.log(payload.receiver, "<==========payload.receiver");
      client.to(payload.receiver).emit("recieve-message", message);
      console.log("yeh le bhai khush hoja");
    });

    // client.on("message-seen", async (conversationId) => {
    //   console.log("in message seen");
    //   console.log(conversationId);
    //   chatService.setReadMessages(conversationId);
    // });
  }
}

module.exports = WebSockets;
