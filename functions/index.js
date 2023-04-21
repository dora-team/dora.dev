// Imports and global vars
const functions = require('firebase-functions');
var admin = require('firebase-admin');

var sendTo;

// Initialize the Firebase Admin SDK.
admin.initializeApp();
const remoteConfig = admin.remoteConfig();

// Export actual Function (as registered in Console)
exports.emailInquiryMonitor = functions.firestore
            .document('/email-inquiry/{documentID}')
            .onCreate(async (snap, context) => {

            // If empty, we populate (we dont want to call everytime)
            if (!sendTo){
                await getSendToEmailInquiry()
            }

            // Get new document data from
            let emailInquiry = snap.data();

            // Write to collection as requested according to the plugin detauks
            // https://firebase.google.com/docs/extensions/official/firestore-send-email
            await admin.firestore().collection("mail-log").add({
                to: sendTo,
                message: {
                subject: `DORA.dev Email Inquiry: ${emailInquiry.inquiry_type || ""}`,
                html: `
                    <br>From: ${emailInquiry.from_email || ""}
                    <br>First Name: ${emailInquiry.first_name || ""}
                    <br>Last Name: ${emailInquiry.last_name || ""}
                    <br>Submitted:  ${context.timestamp || ""}
                    <hr>
                    <br>Message: ${emailInquiry.message || "Check /email-inquiry/{documentID} for valid entry."}
                `
                },
            });
});

// Helper function that calls REST API to get template
//    If we dont have access to the remote config,
//    we fall back to environment var
async function getSendToEmailInquiry() {

    try {
        let template = await remoteConfig.getTemplate();
        sendTo = template.parameters.INQUIRY_SEND_TO.defaultValue.value;
        // console.log("Setting sendTo to ",sendTo);

    } catch (error) {
        console.error(error.message);
        console.error('Unable to get template from Remote Config. Looking for local environment variable.');

        sendTo = process.env.SEND_TO;
    }

    // If falsy, let someone know. Later, we can refresh based upon REFRESH_INTERVAL
    if (!sendTo) {
        sendTo = "-"
        throw new Error('Fatal error:  Unable to identify INQUIRY_SEND_TO value');
    }

}

