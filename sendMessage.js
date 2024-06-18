//template option
const optIn = (phone_number_id, whatsapp_token, to, name) => { //pass necessary element to be used.
  return new Promise((resolve, reject) => { // wrapped in promise
    let json = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "template",
      template: {
        name: "<TEMPLATE_NAME>",
        language: { code: "<LANGUAGE_CODE>" },
        components: [
          {
            type: "header",
            parameters: [ //parameters are optional but in the template this is to fill in the unknown variable.
              {
                type: "text",
                text: name
              }
            ]
          },
        ]
      }
    };
    let data = JSON.stringify(json);
    let path = "/v12.0/" + phone_number_id + "/messages?access_token=" + whatsapp_token;
    let options = {
      host: "graph.facebook.com",
      path: path,
      method: "POST",
      headers: { "Content-Type": "application/json" }
    };
    let req = https.request(options, (response) => {
      let str = "";
      response.on("data", (chunk) => {
        str += chunk;
      });
      response.on("end", () => {
        try {
          let responseData = JSON.parse(str);
          console.log("Response data:", responseData);
          resolve(responseData);
        } catch (err) {
          console.error("Error parsing response:", err);
          reject(err);
        }
      });
    });
    req.on("error", (e) => {
      reject(e);
    });
    req.write(data);
    req.end();
    console.log("SENT");
  });
}