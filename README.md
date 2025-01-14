# Unofficial PayPal Payouts API SDK for NodeJS

Forked from the official SDK. 


Please refer to the [PayPal Payouts Integration Guide](https://developer.paypal.com/docs/payouts/) for more information. Also refer to [Setup your SDK](https://developer.paypal.com/docs/payouts/reference/setup-sdk) for additional information about setting up the SDK's.


## Examples
### Creating a Payouts
This will create a Payout and print the batch_id for the Payout.
#### Code to Execute:
```javascript
const paypal = require('@parkerproject/paypal-payouts-sdk');
  
// Creating an environment using client id and secret
let clientId = "<<PAYPAL-CLIENT-ID>>";
let clientSecret = "<<PAYPAL-CLIENT-SECRET>>";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);


// Creating an environment using access token
let accessToken = "<<PAYPAL-ACCESS-TOKEN>>"
let environment = new paypal.core.SandboxEnvironmentWithAccessToken(accessToken);
let client = new paypal.core.PayPalHttpClient(environment);

let requestBody = {
    "sender_batch_header": {
      "recipient_type": "EMAIL",
      "email_message": "SDK payouts test txn",
      "note": "Enjoy your Payout!!",
      "sender_batch_id": "Test_sdk_1",
      "email_subject": "This is a test transaction from SDK"
    },
    "items": [{
      "note": "Your 1$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-1@paypal.com",
      "sender_item_id": "Test_txn_1"
    }, {
      "note": "Your 1$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-2@paypal.com",
      "sender_item_id": "Test_txn_2"
    }, {
      "note": "Your 1$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-3@paypal.com",
      "sender_item_id": "Test_txn_3"
    }, {
      "note": "Your 1$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-4@paypal.com",
      "sender_item_id": "Test_txn_4"
    }, {
      "note": "Your 1$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-5@paypal.com",
      "sender_item_id": "Test_txn_5"
    }]
  }

// Construct a request object and set desired parameters
// Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
let request = new paypal.payouts.PayoutsPostRequest();
request.requestBody(requestBody);

// Call API with your client and get a response for your call
let createPayouts  = async function(){
        let response = await client.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
        console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
}
createPayouts();
```

### Handle API Failure
This will create a Payout with validation failure to showcase how to parse the failed response entity. Refer samples for more scenarios
#### Code to Execute:
```javascript
const paypal = require('@parkerproject/paypal-payouts-sdk');
  
// Creating an environment using client id and secret
let clientId = "<<PAYPAL-CLIENT-ID>>";
let clientSecret = "<<PAYPAL-CLIENT-SECRET>>";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// Creating an environment using access token
let accessToken = "<<PAYPAL-ACCESS-TOKEN>>"
let environment = new paypal.core.SandboxEnvironmentWithAccessToken(accessToken);
let client = new paypal.core.PayPalHttpClient(environment);

let requestBody = {
    "sender_batch_header": {
      "recipient_type": "EMAIL",
      "email_message": "SDK payouts test txn",
      "note": "Enjoy your Payout!!",
      "sender_batch_id": "Test_sdk_fail",
      "email_subject": "This is a test transaction from SDK"
    },
    "items": [{
      "note": "Your 1$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-1@paypal.com",
      "sender_item_id": "Test_txn_1"
    }]
  }

// Construct a request object and set desired parameters
// Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
let request = new paypal.payouts.PayoutsPostRequest();
request.requestBody(requestBody);

// Call API with your client and get a response for your call
let createPayouts  = async function(){
    try {
        let response = await client.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
        console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
    catch (e) {
      if (e.statusCode) {
        //Handle server side/API failure response
        console.log("Status code: ", e.statusCode);
        // Parse failure response to get the reason for failure
        const error = JSON.parse(e.message)
        console.log("Failure response: ", error)
        console.log("Headers: ", e.headers)
      } else {
        //Hanlde client side failure
        console.log(e)
      }
    }
}
createPayouts();
```

## Retrieve a Payout Batch
Pass the batchId from the previous sample to retrieve Payouts batch details
### Code to Execute:
```javascript
let getPayouts =  async function(batchId) {
    request = new paypal.payouts.PayoutsGetRequest(batchId);
    request.page(1);
    request.pageSize(10);
    request.totalRequired(true);
    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Payouts Batch: ${JSON.stringify(response.result)}`);
}

getPayouts('REPLACE-WITH-BATCH-ID'); 
```

## Running tests

To run integration tests using your client id and secret, clone this repository and run the following command:
```sh
$ npm install
$ PAYPAL_CLIENT_ID=YOUR_SANDBOX_CLIENT_ID PAYPAL_CLIENT_SECRET=YOUR_SANDBOX_CLIENT_SECRET npm test
```

## Samples

You can start off by trying out [Payouts Samples](samples/runAll.js)

To run samples run the following command:
```sh
$ npm install
$ PAYPAL_CLIENT_ID=YOUR_SANDBOX_CLIENT_ID PAYPAL_CLIENT_SECRET=YOUR_SANDBOX_CLIENT_SECRET npm test
```

To try out different samples head to [this link](samples)

Note: Update the `payPalClient.js` with your sandbox  credentials or pass your client credentials as environment variable while executing the samples.

## Note

PayPalHttpClient used as part of this project returns Promises

You can read more about Promises here: https://www.promisejs.org/


## License
Code released under [SDK LICENSE](LICENSE)  