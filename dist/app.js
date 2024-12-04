"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Author: Kalle Liljeström
Sources: Course source codes
*/
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 3000;
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose_1.default.connect(mongoDB);
mongoose_1.default.Promise = Promise;
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
app.use(express_1.default.static('public'));
app.use("/", index_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
