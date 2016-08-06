require("app-module-path").addPath(__dirname);

const express = require("express");
const parser = require("body-parser");
const app = express();

const config = require("./config");

/* Body Parser */
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

/* Routes / Controllers */
app.use("/", express.static(__dirname + "/public"));
app.use("/api", require("./controllers/"));
app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/views/Home.html");
});

/* Start Server */
app.listen(config.environment.port, () => {
    console.log("~~Server running on port", config.environment.port);
});