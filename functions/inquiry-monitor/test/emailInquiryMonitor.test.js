// [TESTING ENVIRONMENT] - START
const admin = require("firebase-admin");
const { Timestamp } = require('firebase-admin/firestore');
let testEnv;

let projectID = process.env.PROJECT_ID || 'doradotdev-staging';

// Test to see if running Test w/in Local Emulator
// and set appropriate environmental configurations
if (process.env.FIREBASE_EMULATOR_HUB){
    // Running Local Unit Tests
    projectID = 'unit-test';
    process.env.GCLOUD_PROJECT = projectID;
    process.env.FUNCTIONS_EMULATOR === true;
    process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:6100';

    const projectConfig = require("firebase-functions-test")({
        projectId: projectID,
    });

    testEnv = require('firebase-functions-test')(projectConfig);

}else{
    // Running Integration Test to hosted Firestore db
    const privateKey = `../../secrets/${projectID}-private-key.json`;
    const projectConfig = require("firebase-functions-test")({
        databaseURL: `https://${projectID}.firebaseio.com`,
        projectId: projectID,
    });

    testEnv = require('firebase-functions-test')(projectConfig, privateKey);

}
// [TESTING ENVIRONMENT] - END
////////////////////////////////////////////////////////////////////////////////

// [FUNCTION DETAILS TO TEST] - START
const EMAIL_INQUIRY_COLLECTION = 'email-inquiry';
const EMAIL_LOG_COLLECTION = 'email-log';
const TEST_SEND_TO = process.env.MONITOR_SEND_TO || 'no-reply@example.com';

// Define the test context
const context = {
    timestamp: new Date().getTime()
};

const createdDate = new Date(context.timestamp);

// Define the test data
const mockReferenceID = "mockDataReferenceID"
const MOCK_EMAIL_INQUIRY = {
    first_name: 'Integration',
    last_name: 'Test',
    inquiry_type: 'Support',
    from_email: 'integration.test@example.com',
    message: 'This is an Integration TEST Message',
    created: Timestamp.fromDate(createdDate)
};

// Define the expected results
const expectedResults = {
    delivery: "",
    inquiryRef: mockReferenceID,
    to: TEST_SEND_TO,
    message: {subject: 'DORA.dev inquiry from Integration Test: Support',html: `<br>From: integration.test@example.com<br>First Name: Integration<br>Last Name: Test<br>Submitted:  ${context.timestamp}<hr><br>Message: This is an Integration TEST Message`
    }
};

// Import the exported function definitions from our functions/index.js file
let myFunctions = require("../index");

// [FUNCTION DETAILS TO TEST] - END
////////////////////////////////////////////////////////////////////////////////

// [TEST SUIT - EMAIL MONITOR] - START
describe("EMAIL MONITOR", () => {

    let wrapped;

    // Reference to Emulation Firestore DB
    const db = admin.firestore();

    // Create DocumentReference Pointer to the MockInquiry document
    const webInquiryCollectionRef = db.collection(EMAIL_INQUIRY_COLLECTION).doc(mockReferenceID);

    beforeEach(async() => {

        // Creates wrapped test function from cloud function which can be called in tests
        wrapped = testEnv.wrap(myFunctions.emailInquiryMonitor)

        // write mock email data to the firestore database
        await webInquiryCollectionRef.set(MOCK_EMAIL_INQUIRY);

    });

    afterAll(() => {
        testEnv.cleanup()
    });

    it("Is email-inquire expireAt 63 days from context", async() => {

        // 63 Days and calculate future expiration time based upon context
        INQUIRY_EXPIRES_DAYS = 63;
        const expireDate = new Date(context.timestamp);
        expireDate.setDate(expireDate.getDate() + INQUIRY_EXPIRES_DAYS);
        let expectedExpireTime =  Timestamp.fromDate(expireDate);

        // get the snapshot obj of mockWeb Inquiry
        let mockInquirySnap = await webInquiryCollectionRef.get();

        // Call the wrapped function with the snapshot (returns DocID)
        await wrapped(mockInquirySnap, context);

        // Get get the updated document reference from the EMAIL_INQUIRY_COLLECTION entry
        let updateInquirySnap = (await webInquiryCollectionRef.get()).data();

        // Compare results with the expected result constant::
        // Note:  It is possible that the deployed extension will
        // update the field prior to read and fail the test;
        // This should only happen if the mock entry is new
        expect(updateInquirySnap.expireAt).toStrictEqual(expectedExpireTime);

    });

    it("Can read from web form collection", async() => {

        // Can I read from the mock Collection
        let dataAfterCreate = (await webInquiryCollectionRef.get()).data();

        // Assert results are expected
        expect(dataAfterCreate).toStrictEqual(MOCK_EMAIL_INQUIRY);

    });

    it("Function writes data in expected schema", async() => {

        // get the snapshot obj of mockWeb Inquiry
        let mockInquirySnap = await webInquiryCollectionRef.get();

        // Call the wrapped function with the snapshot (returns DocID)
        let newDocID = await wrapped(mockInquirySnap,context);

        // Get get the new document reference from the EMAIL_LOG_COLLECTION entry
        let newDocRef= db.collection(EMAIL_LOG_COLLECTION).doc(newDocID);

        // get new get reference to collection - then get document data
        let dataAfterCreate = (await newDocRef.get()).data();

        // remove meta-data if Extension ran before test completed
        dataAfterCreate.delivery = "";

        // Compare results with the expected result constant
        expect(dataAfterCreate).toStrictEqual(expectedResults);


    });
});
// [TEST SUIT - EMAIL MONITOR] - END