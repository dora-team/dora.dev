/**
 *  Cloud Function that will monitor a collection for new documents created.
 *      Based upon new docs, a new document will be created in a new collection
 *      based upon the Firestore Send Email design requirements.
 *      https://firebase.google.com/docs/extensions/official/firestore-send-email
 */

/**
 * Firebase Function imports and initialization
 */
const functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp();
const remoteConfig = admin.remoteConfig();

/**
 * Monitor Email Inquiry Collection
 * What collection to watch for new documents
 * @type {string}
 */
const MONITOR_EMAIL_INQUIRY_COLLECTION = 'email-inquiry';
// 
/**
 * Monitor Extension Collection
 * Where to write new entry for Firestore Send Email Extension
 * @type {string}
 */
const MONITOR_EXTENSION_COLLECTION = 'email-log';

/**
 * Default Send To
 *  Set the sentTo to a value (-) that will fail in send, 
 *  but does not prevent function error and writes into collection; 
 *  This approach will enables reporting if needed
 * @type {string}
 */
const DEFAULT_SEND_TO = '-'

// Initialize the Firebase Admin SDK as empty.
var sendTo;

// Export actual Function (as registered in Console)
exports.emailInquiryMonitor = functions.firestore
            .document(`/${MONITOR_EMAIL_INQUIRY_COLLECTION}/{documentID}`)
            .onCreate(async (snap, context) => {

            // If empty, we populate.  
            // Not needed for hosted functions, but helpful in emulation
            if (!sendTo){
                await getSendToEmailInquiry()
            }

            // Get new document data from snapshot
            let emailInquiry = snap.data();

            // Write to collection as requested according to the plugin
            await admin.firestore().collection(MONITOR_EXTENSION_COLLECTION).add({
                to: sendTo,
                message: {
                subject: `DORA.dev inquiry from ${emailInquiry.first_name || ""} ${emailInquiry.last_name || ""}: ${emailInquiry.inquiry_type || ""}`,
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

   
/**
 * Helper function that calls REST API to get template and look for INQUIRY_SEND_TO value
 * If we don't have access to the remote config, we fall back to environment var. 
 * If that is unavailable, return DEFAULT_SEND_TO value
 */
async function getSendToEmailInquiry() {

    try {
        let template = await remoteConfig.getTemplate();
        sendTo = template.parameters.INQUIRY_SEND_TO.defaultValue.value;

    } catch (error) {
        //log error and look for env variable
        console.error(error.message);
        console.error('ERROR:  Unable to get template from Remote Config. Looking for local environment variable.');
        sendTo = process.env.SEND_TO;
    }

    // If falsy, log error and set DEFAULT_SEND_TO
    if (!sendTo) {
        console.error('ERROR:  Unable to identify INQUIRY_SEND_TO value, setting default');
        sendTo = DEFAULT_SEND_TO
    }

}

