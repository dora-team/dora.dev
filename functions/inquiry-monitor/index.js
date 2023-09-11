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
const admin = require('firebase-admin');

const {Timestamp} = require('firebase-admin/firestore');

admin.initializeApp();

// Initialize Cloud Firestore and get a reference to the db service
const db = admin.firestore();

// The number of days to expire the email-inquiry entry: default 63
const INQUIRY_EXPIRES_DAYS = process.env.INQUIRY_EXPIRES_DAYS || 63;

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

const SEND_TO = process.env.MONITOR_SEND_TO || '-';

// Export actual Function (as registered in Console)
exports.emailInquiryMonitor = functions.firestore
    .document(`/${MONITOR_EMAIL_INQUIRY_COLLECTION}/{documentID}`)
    .onCreate(async (snap, context) => {
      // Get new document data from snapshot
      const emailInquiry = snap.data();

      // new Data to be written
      const newEntry = {
        // Insert in a reference to the original Web Inquiry for traceability
        inquiryRef: snap.id,
        to: SEND_TO,
        // eslint-disable-next-line max-len
        message: {subject: `DORA.dev inquiry from ${emailInquiry.first_name || ''} ${emailInquiry.last_name || ''}: ${emailInquiry.inquiry_type || ''}`, html: `<br>From: ${emailInquiry.from_email || ''}<br>First Name: ${emailInquiry.first_name || ''}<br>Last Name: ${emailInquiry.last_name || ''}<br>Submitted:  ${context.timestamp || ''}<hr><br>Message: ${emailInquiry.message || 'Check /email-inquiry/{documentID} for valid entry.'}`},
      };

      // create a documentID based upon time for easy discovery
      const newDocRefID = createDocumentID();

      await db.collection(MONITOR_EXTENSION_COLLECTION).doc(newDocRefID)
          .set(newEntry)
          .catch((error) => {
            console.error('Error writing document: ', error);
          });

      // ISSUE: #363 Update Email Inquiry
      const expireDate = new Date(context.timestamp);
      expireDate.setDate(expireDate.getDate() + INQUIRY_EXPIRES_DAYS);
      const expireTime = Timestamp.fromDate(expireDate);

      const inquiryRef =
        db.collection(`${MONITOR_EMAIL_INQUIRY_COLLECTION}`).doc(snap.id);

      await inquiryRef.update({expireAt: expireTime});

      return newDocRefID; // return the ID reference
    });


/**
 * Helper function that creates new a Document ID that is human readable
 *  Date/Time is leveraged for ease of access, trace, and sorting
 *  Document ID is <20 chars based upon some code reviews.
 *  @return {string} as new documentID.
 */
function createDocumentID() {
  const util = require('util');
  const today = new Date();
  // w/ random suffix in the event two happen at the same time.
  const suf = Math.floor(Math.random() * 10);
  const utcDate = today.toISOString('YYYYMMDDTHHmmsssssZ')+suf;
  return util.format('%s', utcDate.replace(/[^0-9a-zA-Z]/g, '')
      .substring(0, 20));
}
