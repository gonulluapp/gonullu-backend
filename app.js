const cors = require("cors");
const express = require("express");

const app = express();

const userRouter = require("./routes/user");

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.get('/', (req, res) => {
    res.send({ message: "Server is running"});
});

app.use('/user', userRouter);

module.exports = app;