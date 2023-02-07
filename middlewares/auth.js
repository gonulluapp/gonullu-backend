const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);

        const {id} = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        req.user = await User.findOne({_id: id});

        next();
    } catch (e) {
        console.log(e);
        res.status(401).send({ error: "unauthenticated" });
    }
};

module.exports = auth;