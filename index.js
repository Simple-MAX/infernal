"use strict";
exports.__esModule = true;
var express_1 = require("express");
var gun_1 = require("gun");
var app = express_1["default"]();
var port = 3030;
app.use(gun_1["default"]);
var server = app.listen(port, function () {
    console.log("localhost:3030");
});
gun_1["default"]({ web: server });
