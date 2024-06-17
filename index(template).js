const https = require("https");
const AWS = require('aws-sdk');
const fs = require('fs');
const os = require('os');
const axios = require("axios");
//the npm module can be used later on, so use it accordingly

exports.handler = async (event) => {
  let WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  
  let response;
  if (event?.requestContext?.http?.method === "GET") {
    let queryParams = event?.queryStringParameters;
    if (queryParams != null) {
      const mode = queryParams["hub.mode"];
      if (mode == "subscribe") {
        const verifyToken = queryParams["hub.verify_token"];
        if (verifyToken == VERIFY_TOKEN) {
          let challenge = queryParams["hub.challenge"];
          response = {
            "statusCode": 200,
            "body": challenge,
            "isBase64Encoded": false
          };
        } else {
          response = {
            "statusCode": 403,
            "body": "Error, wrong validation token"
          };
        }
      } else {
        response = {
          "statusCode": 403,
          "body": "Error, wrong mode"
        };
      }
    } else {
      response = {
        "statusCode": 403,
        "body": "Error, no query parameters"
      };
    }
  } 
  else if (event?.requestContext?.http?.method === "POST") {
    let body = JSON.parse(event.body);
    let entries = body.entry;
    let curr_wamid = null;
    for (let entry of entries) {
      for (let change of entry.changes) {
        let value = change.value;
        let wappid = '';
        if (value != null) {
          let phone_number_id = value.metadata.phone_number_id;
          if (value.messages != null) {
            for (let message of value.messages) {
              console.log(message);
            }
          }
        }
      }
    }
  }
  else {
    response = {
      "statusCode": 403,
      "body": "Unsupported method"
    };
  }
  return response;
}
