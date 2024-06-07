"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var app = (0, express_1.default)();
var PORT = 3000;
app.use((0, cors_1.default)());
app.get("/", function (req, res) {
    res.send("Hi Backend Stated");
});
app.listen(PORT, function () {
    console.log("Hi Server Started...", "".concat(PORT));
});
