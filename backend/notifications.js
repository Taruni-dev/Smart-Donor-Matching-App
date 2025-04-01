const admin = require("./firebase");

async function sendNotification() {
  const message = {
    token: "YOUR_DEVICE_FCM_TOKEN", // Replace with actual FCM token
    notification: {
      title: "Blood Donation Alert",
      body: "A blood donation camp is happening near you!",
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

sendNotification();
