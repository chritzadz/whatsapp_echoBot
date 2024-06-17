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
