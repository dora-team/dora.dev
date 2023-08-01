// [TESTING ENVIRONMENT] - START
const admin = require("firebase-admin");
const testProjectId = 'unit-test';
process.env.GCLOUD_PROJECT = testProjectId;
process.env.FUNCTIONS_EMULATOR === true;
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:6100';//127.0.0.1:6100

const functions = require("firebase-functions-test")({
     projectId: testProjectId,
});

// create testenv for mocking changes
const testEnv = functions;

// [TESTING ENVIRONMENT] - END
////////////////////////////////////////////////////////////////////////////////

// [FUNCTION DETAILS TO TEST] - START
const EMAIL_INQUIRY_COLLECTION = 'email-inquiry';
const EMAIL_LOG_COLLECTION = 'email-log';

const TEST_SEND_TO = process.env.MONITOR_SEND_TO || '-';

// Define the test context
let context = {
    timestamp: new Date().getTime()
};

// Define the test data
let MOCK_EMAIL_INQUIRY = {
    first_name: 'Integration',
    last_name: 'Test',
    inquiry_type: 'Support',
    from_email: 'integration.test@example.com',
    message: 'This is a Integration TEST support inquiry'
};

// Define the expected results
let expectedResults = {
    to: TEST_SEND_TO,
    message: {subject: 'DORA.dev inquiry from Integration Test: Support',html: `<br>From: integration.test@example.com<br>First Name: Integration<br>Last Name: Test<br>Submitted:  ${context.timestamp}<hr><br>Message: This is a Integration TEST support inquiry`
    }
};

// Import the exported function definitions from our functions/index.js file
const myFunctions = require("../index");
// const { projectID } = require("firebase-functions/params");

// [FUNCTION DETAILS TO TEST] - END
////////////////////////////////////////////////////////////////////////////////

// [TEST SUIT - EMAIL MONITOR] - START
describe("EMAIL MONITOR", () => {

    let wrapped;

    // Reference to Emulation Firestore DB
    const db = admin.firestore();

    // Create documentReference
    const webInquiryCollectionRef = db.collection(EMAIL_INQUIRY_COLLECTION).doc('testEntryId1');

    beforeEach(async() => {

        // Clear the DB
        await testEnv.firestore.clearFirestoreData(testProjectId);

        // Creates wrapped test function from cloud function which can be called in tests
        wrapped = testEnv.wrap(myFunctions.emailInquiryMonitor)

        // write mock email data to the firestore database
        await webInquiryCollectionRef.set(MOCK_EMAIL_INQUIRY);

    });

    afterAll(() => {
        functions.cleanup();
    });

    it("Can read from web form collection", async() => {

        // Can I read from the mock Collection
        let dataAfterCreate = (await webInquiryCollectionRef.get()).data();

        // Assert results are expected
        expect(dataAfterCreate).toStrictEqual(MOCK_EMAIL_INQUIRY);

    });

    it("Function writes data and expect 1 result", async() => {

        // get the snapshot obj of mockWeb Request
        mockSnap = await webInquiryCollectionRef.get();

        // Call the wrapped function with the snapshot
        await wrapped(mockSnap,context);

        // Get results.  Should only be 1 entry
        let results = await db.collectionGroup(EMAIL_LOG_COLLECTION).get();
        expect(results.size).toBe(1);

    });

    it("Function writes data in expected schema", async() => {

        // get the snapshot obj of mockWeb Request
        mockSnap = await webInquiryCollectionRef.get();

        // Call the wrapped function with the snapshot
        await wrapped(mockSnap,context);

        //Get the results of the collection
        let querySnapshot = await db.collectionGroup(EMAIL_LOG_COLLECTION).get();

        // Compare results with the expected result constant
        querySnapshot.forEach((docRef) => {
            const data = docRef.data();
            expect(data).toStrictEqual(expectedResults);
          });
    });
});
// [TEST SUIT - EMAIL MONITOR] - END
