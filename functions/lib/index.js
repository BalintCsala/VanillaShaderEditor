"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
const functions = require("firebase-functions");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line camelcase
const cors_anywhere_1 = require("cors-anywhere");
const server = cors_anywhere_1.cors_proxy.createServer({
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: [
        "cookie",
        "cookie2",
    ],
});
exports.cors = functions.https.onRequest((req, res) => {
    server.emit("request", req, res);
});
//# sourceMappingURL=index.js.map