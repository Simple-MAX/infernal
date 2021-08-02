"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var gun_1 = __importDefault(require("gun"));
var app = express_1.default();
var port = 3030;
app.use(gun_1.default);
var server = app.listen(port, function () {
    console.log("localhost:3030");
});
gun_1.default({ web: server });
//# sourceMappingURL=index.js.map