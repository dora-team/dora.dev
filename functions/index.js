// Imports
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK.
admin.initializeApp();

exports.sendEMailNotification = functions.firestore
            .document('/email-inquiry/{documentID}').onCreate(async (snap, context) => {
    
            let emailInquiry = snap.data();

            // Write to collection as requested according to the plugin detauks
            // https://firebase.google.com/docs/extensions/official/firestore-send-email
            await admin.firestore().collection("mail-log").add({
                to: `${process.env.SEND_TO}`,
                message: {
                subject: `DORA.dev Email Inquiry ${emailInquiry.inquiry_type}`,
                html: `
                    <br>From: ${emailInquiry.from_email || ""}
                    <br>First Name: ${emailInquiry.first_name || ""}
                    <br>Last Name: ${emailInquiry.last_name || ""}
                    <br>Submitted:  ${context.timestamp || ""}
                    <hr>
                    <br>Message: ${emailInquiry.message || ""}
    
                `
                },
            });
});