// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.detectDistressSignal = functions.firestore
  .document("forumPosts/{postId}")
  .onCreate(async (snapshot) => {
    const post = snapshot.data();
    const distressKeywords = ["help", "suicide", "depressed"];
    const containsDistress = distressKeywords.some((word) => post.message.includes(word));

    if (containsDistress) {
      // Trigger alert - send notification or email to admin
      await admin.firestore().collection("alerts").add({
        message: post.message,
        timestamp: new Date()
      });
    }
  });
