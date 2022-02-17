const httpStatus = require("http-status");
const ApiError = require("../utils/APIError");
const admin = require("firebase-admin");

var serviceAccount = require("../firebase/blockmerce-317516-firebase-adminsdk-wiu0h-37b2c7761b.json");
const notificationDetailService = require("./notificationDetail.service");
const notificationTokenService = require("./notificationToken.service");

const Api = require("twilio/lib/rest/Api");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const getNotification = async (req) => {
  console.log(req.body, "noti body");
  const savingDetail = await notificationDetailService.createNotificationDetail(
    req.body
  );
  console.log(
    savingDetail,
    "<<=======Notification details that are getting saved"
  );
  const receiverToken =
    await notificationTokenService.getNotificationTokenByUserId(
      req.body.receiver
    );
  console.log(receiverToken, "<==== receivers token");
  if (!receiverToken) {
    console.log("no receiver token found ....saving notification details");
    return savingDetail;
  }
  const message = {
    notification: {
      title: req.body.title,
      body: req.body.message,
    },
    data: req.body.data,
    token: receiverToken.token,
    apns: {
      payload: {
        aps: {
          "mutable-content": 1,
        },
      },
      fcm_options: {
        image: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
      },
    },
    android: {
      notification: {
        image: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
      },
    },
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Send Success");
      console.log("Send Response", response);
      return { flag: true };
    })
    .catch((err) => console.log(err));
};

const getNotifications = (req) => {
  console.log(req.body);
  const message = {
    notification: {
      title: req.body.title,
      body: req.body.body,
      imageUrl: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
    },
    data: req.body.data,
    token: req.body.tokens,
    apns: {
      payload: {
        aps: {
          "mutable-content": 1,
        },
      },
      fcm_options: {
        image: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
      },
    },
    android: {
      notification: {
        image: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
      },
    },
  };
  admin
    .messaging()
    .sendMulticast(message)
    .then((response) => {
      console.log("Send Success", req.body.data);
      console.log("Send Response", response);
      return { flag: true };
    })
    .catch((err) => console.log(err));
};

const rooms = new Map();

const getRoom = async (req) => {
  const roomSID = [];
  const { uniqueName, status } = req.query;
  await client.video.rooms.list({ uniqueName, status }).then((rooms) => {
    rooms.forEach((r) => {
      roomSID.push(r.sid);
    });
  });
  return roomSID;
};

const getRecording = async (req) => {
  const { roomsids } = req.body;
  const records = [];
  // console.log(roomsids, "<=====roomsids");
  for (let index = 0; index < roomsids.length; index++) {
    const element = roomsids[index];
    try {
      const recordings = await client.video.recordings.list({
        sid: element,
        type: "video",
      });

      for (let index = 0; index < recordings.length; index++) {
        const element = recordings[index];
        if (element.type === "video") {
          records.push({
            sid: element.sid,
            date: element.dateCreated,
            type: element.type,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // await roomsids.forEach(async (r) => {
  //   await client.video.recordings.list({ sid: r }).then(async (recordings) => {
  //     await recordings.forEach(async (x) => {
  //       console.log(x, "<=====X");
  //       await records.push(x);
  //     });
  //   });
  // });
  console.log(records[0], "<====================");
  return records;
};

const sendNotificationForShopForFollow = async (body) => {
  const token = await getNotificationDetailByUserId(body.shop1.id);
  let title = body.shop.shopName + " is following you";
  let bodyStructure = body.body.shopName + "is following you";
  const message = {
    notification: {
      title: title,
      body: bodyStructure,
      imageUrl: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
    },
    data: "THIS IS DATA",
    token: token.token,
    apns: {
      payload: {
        aps: {
          "mutable-content": 1,
        },
      },
      fcm_options: {
        image: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
      },
    },
    android: {
      notification: {
        image: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
      },
    },
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Send Success", req.body.data);
      console.log("Send Response", response);
      return { flag: true };
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getNotification,
  getRoom,
  getRecording,
  sendNotificationForShopForFollow,
};
