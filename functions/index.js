const functions = require("firebase-functions");

const corsProxy = require("cors-anywhere").createServer({
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: [
    "cookie",
    "cookie2",
  ],
});

exports.cors = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  corsProxy.emit("request", req, res);
});
