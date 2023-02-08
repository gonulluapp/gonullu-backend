const cors = require("cors");
const express = require("express");

const app = express();

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const applyRouter = require("./routes/apply");
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.get('/', (req, res) => {
    res.send({ message: "Server is running"});
});
app.use('/apply', applyRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

module.exports = app;