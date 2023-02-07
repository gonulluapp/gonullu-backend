const cors = require("cors");
const express = require("express");

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.get('/', (req, res) => {
    res.send({ message: "Server is running"});
});

module.exports = app;