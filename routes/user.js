const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
	const { name, email, password } = req.body;

	try {
		// storing our user data into database
		const user = await User.create({
			name,
			email,
			password,
		});

		return res.send();
	} catch (error) {
		console.log(JSON.stringify(error));
		if (error.code === 11000) {
			return res.send({ status: "error", error: "email already exists" });
		}
		throw error;
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) return res.status(400).send({ error: "user not found" });

		if (!(await bcrypt.compare(password, user.password)))
			return res.status(401).send({ error: "invalid password" });

		const token = jwt.sign(
			{ id: user._id, username: user.email, type: "user" },
			process.env.JWT_ACCESS_SECRET,
			{ expiresIn: "30d" }
		);

		res.cookie("token", token, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		}).send({
			token,
			user,
		}); // maxAge: 30 days
	} catch (e) {
		console.log(e);
		res.status(500).send();
	}
});

router.get("/", auth, async (req, res) => {
	res.send(req.user);
});

module.exports = router;
