const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
	const user = req.user;
	const {
		title,
		description,
		city,
		town,
		address,
		telephoneNumber,
		email,
		whatsappLink,
		supplyItems,
	} = req.body;
	try {
		// storing our user data into database
		const post = await Post.create({
			title,
			description,
			user: user._id,
			city,
			town,
			address,
			telephoneNumber,
			email,
			whatsappLink,
			supplyItems,
		});

		return res.status(201).send(post);
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}
});

router.get("/", async (req, res) => {
	const { city, town, supplyItemTypes } = req.body;
	const { page, limit } = req.query;

	try {
		const options = {
			page: page || 0,
			limit: limit || 10,
			sort: { urgency: -1, date: -1 },
		};

		const where = { isDeleted: false };
		if (city) where.city = city;
		if (town) where.town = town;
		if (supplyItemTypes) where["supplyItems.type"] = supplyItemTypes;

		const paginatedPosts = await Post.paginate(where, options);

		res.status(200).send(paginatedPosts);
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}
});

//update post
router.put("/:id", auth, async (req, res) => {
	const {
		title,
		description,
		city,
		town,
		address,
		telephoneNumber,
		email,
		whatsappLink,
		supplyItems,
	} = req.body;
	const postId = req.params.id;
	try {
		const update = {
			title,
			description,
			city,
			town,
			address,
			telephoneNumber,
			email,
			whatsappLink,
			supplyItems: supplyItems,
		};
		const option = { new: true };
		const curPost = await Post.findById(postId);

		const updatedPost = await Post.findByIdAndUpdate(
			postId,
			update,
			option
		);
		if (!updatedPost) return res.status(404).send();
		res.status(200).send(updatedPost);
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}
});

router.get("/:id", async (req, res) => {
	const userId = req.params.id;

	try {
		const posts = await Post.find({ user: userId, isDeleted: false });

		res.status(200).send(posts);
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}
});

router.delete("/", auth, async (req, res) => {
	const user = req.user;
	const { postId } = req.body;

	try {
		const post = await Post.findById(postId);
		if (!post) return res.status(404).send();

		if (post.user.toString() !== user._id.toString())
			return res.status(401).send();

		post.isDeleted = true;
		await post.save();

		res.send();
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}
});

module.exports = router;
