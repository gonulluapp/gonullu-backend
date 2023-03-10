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
	const { city, town, supplyItemTypes, isActive, page } = req.query;
	//	console.log(req.query);
	// const { page } = req.query;
	try {
		const options = {
			page: page || 1,
			limit: 20,
			sort: { isActive: -1, updatedAt: -1 },
			populate: {select: '-password', path: 'user'},
		};

		const where = { isDeleted: false};   // TODO: added isActive match
		if (city) where.city = city;
		if (town) where.town = town;
		if (isActive) where.isActive = isActive;
		if (supplyItemTypes && supplyItemTypes.length !== 0)
			where["supplyItems.type"] = supplyItemTypes;

		// const availablePosts = await Post.find(where).sort({ isActive: -1, updatedAt: -1 }).populate("user", '-password');  //TODO: changed sorting to updatedAt
		const availablePosts = await Post.paginate(where, options);

		res.status(200).send(availablePosts);
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}
});

//get specific post by id
router.get("/:id", async (req, res) => {
	const postId = req.params.id;
	try {
		const post = await Post.findOne({
			_id: postId,
			isDeleted: false,
		}).populate("user");
		if (!post) return res.status(404).send();
		return res.status(200).send(post);
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
		isActive,
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
			isActive,
		};
		const option = { new: true };

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
// get specific user's posts
router.get("/user/:id/posts", async (req, res) => {
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
