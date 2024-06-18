# Deploy Echobot on Whatsapp using Whatsapp Business API and AWS Lambda
## Integrating Whatsapp API (Meta Developer Account). Creating an EchoBot to make an automated integrated responsive bot with webhook, lambda layers and message template

This project is a method on deploying an echobot for Whatsapp using AWS Lambda. note that it will need a Meta Developer Account to later authenticate via lambda function. In this project, it will cover:
  - Configuring Webhook with Lambda URL
  - Retrieving message object from whatsapp.
  - Creating custom message template

# Set Up
## Set Up Application
  - Visit the https://developers.facebook.com/ and log in with your account credentials. 
  - Create a Bussiness type application. 
  - On the left hand navigation bar, navigate to **Whatsapp** and click **API Setup**.
  - There should be some crucial information for the API. Keep notes on this:
    - Access Token (click here to learn how to create a permanent acess token)
    - Phone Number ID
    - Whatsapp Business Account ID
  
## Set up Lambda Function
  - Navigate to AWS Lambda.
  - Create a new function.
  - Choose **Author from Scratch**, Runtime **Node.js 16.x**, Architecture **x86_64**
  - Click the Advance Settings and **Enable function URL**.
  - For security and privacy, you can use the Environment Variables Function by Lambda to store a private information (e.g. access token, phone number id)
  - The template of index.js can be downloaded in the repository.
  - Set up the verify token, since it will be use for verifying the webhook via API.

## Set up Webhook 
  - Copy the Lambda Function URL, as it will be the webhook to send the message object from Whatsapp. (POST or GET is available in the template)
  - Going back to the developer web portal, Navigate to the **Webhook** option, and **Add or Edit Subscription**.
  - Input the **Lambda Function URL** and **Verify Token**
  - After that, Subscribe to the **message** plan

# Processing Message Object
Documentation of message object can be seen by Meta Developer https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples/. In the documentation, it will be give examples on the message object according to the user. This part will mostly talk about sending the message back. 

```JSON
  {
    "object": "whatsapp_business_account",
    "entry": [
      {
        "id": "<WHATSAPP_BUSINESS_ACCOUNT_ID>",
        "changes": [
          {
            "value": {
              "messaging_product": "whatsapp",
              "metadata": {
                "display_phone_number": "<BUSINESS_DISPLAY_PHONE_NUMBER>",
                "phone_number_id": "<BUSINESS_PHONE_NUMBER_ID>" //phone number id use to sent the message back
              },
              "contacts": [
                {
                  "profile": {
                    "name": "<WHATSAPP_USER_NAME>" //username can change according to the user
                  },
                  "wa_id": "<WHATSAPP_USER_ID>"
                }
              ],
              "messages": [
                {
                  "from": "<WHATSAPP_USER_PHONE_NUMBER>", //this is the user phone number
                  "id": "<WHATSAPP_MESSAGE_ID>",
                  "timestamp": "<WEBHOOK_SENT_TIMESTAMP>",
                  "text": {
                    "body": "<MESSAGE_BODY_TEXT>" //this is the text message
                  },
                  "type": "text"
                }
              ]
            },
            "field": "messages"
          }
        ]
      }
    ]
  }
```

To send a message back create a function that serve what to send. There are several types of message to be sent. refer to this documentation: https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-message-templates

In general, you can follow the sendMessage.js file in the repository. Note that when calling the function use **await** keyword to make sure that it is sent before the lambda function ended it's execution. 


