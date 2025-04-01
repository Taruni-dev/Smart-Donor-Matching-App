const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smart-donor-matching-default-rtdb.firebaseio.com/"
});

// Get a reference to the database
const db = admin.database(); // 🔹 This is the correct way to initialize Realtime Database

// Define reference to "users" node
const usersRef = db.ref("users");

// Add sample data
usersRef.set({
  user1: {
    name: "John Doe",
    bloodType: "O+",
    location: "New York"
  }
}).then(() => {
  console.log("Data added successfully!");
}).catch((error) => {
  console.error("Error adding data:", error);
});
