// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');
const { Timestamp } = require ('firebase/firestore');

// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp();


// // TODO(DEVELOPER): Write the addWelcomeMessages Function here.
// exports.addWelcomeMessages = functions.auth.user().onCreate(async (user) => {
//     functions.logger.log('A new user signed in for the first time.');
//     const fullName = user.displayName || 'Anonymous';

//     // Saves the new welcome message into the database
//     // which then displays it in the FriendlyChat clients.
//     let updated_at_timestamp = Timestamp.now().toDate()
//     console.log ("CurrTime", updated_at_timestamp)
//     await admin.firestore().collection('messages').add({
//       name: 'Firebase Bot',
//       profilePicUrl: '/images/firebase-logo.png', // Firebase logo
//       text: `${fullName} signed in for the first time! Welcome!`,
//       timestamp: updated_at_timestamp
//     });
//     functions.logger.log('Welcome message written to database.');
//   });

// TEST FOR MAIL
exports.sendWelcomeEmail = admin.firestore().collection("email-inquiry").onCreate(async (snapshot) => {

  // Get data from entry
  const textData = snapshot.data().textData;
  console.log("Text DATA:",textData)

  // Write to collection as requested
  // await admin.firestore().collection("mailer-log").add({
  //     to: user.email,
  //     message: {
  //       subject: "Welcome!",
  //       html: `
  //         Hey ${user.displayName || ""}! 👋

  //         Thank you for signing up.
  //       `,
  //     },
  //   });
});


// TODO(DEVELOPER): Write the sendNotifications Function here.
