const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const auth = require("../middlewares/auth");
const Application = require("../models/apply");

// poster sees applications for post
router.get("/:postId", auth, async (req, res) => {
	try {
		// const posts = (
		// 	await Post.find({
		// 		user: req.user._id,
		// 		isDeleted: false,
		// 	})
		// ).map((post) => post._id);
		const postId = req.params.postId;

		const post = await Post.findById(postId, { isDeleted: false });

		if (!post) return res.status(404).send(); // 404: Post Not Found
		if (!post.user._id.equals(req.user._id)) return res.status(401).send(); // 401: User not Unauthorized
		const allApplications = await Application.find({
			post: post,
			// "post.isDeleted": false,
			isDeleted: false,
		}).sort({
			createdAt: 1,
		});

		// const applicationsByPostArray = allApplications.reduce((acc, curr) => {
		// 	if (acc[curr.post]) {
		// 		acc[curr.post].push(curr);
		// 	} else {
		// 		acc[curr.post] = [curr];
		// 	}
		// 	return acc;
		// }, {});
		res.send(allApplications);
	} catch (err) {
		console.log(err.message);
		res.status(500).send(err);
	}
});

router.post("/", async (req, res) => {
	const { name, telephoneNumber, supplyItems, postId } = req.body;
	try {
		const post = await Post.findOne({ _id: postId, isDeleted: false , isActive: true });
		if (!post) return res.status(404).send(); // 404: Post Not Found
		const application = await Application.create({
			name,
			telephoneNumber,
			supplyItems,
			post: postId,
		});

		res.status(201).send(application);
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}
});

router.delete("/:id", auth, async (req, res) => {
	const applyId = req.params.id;
	try {
		const application = await Application.findById(applyId, {
			isDeleted: false,
		}).populate("post");

		if (!application || application.post == null)
			return res.status(404).send();
		if (!application.post.user.equals(req.user._id)) {
			return res.status(401).send(); // user unauthorized
		}
		application.isDeleted = true;
		await application.save();

		res.status(200).send(application);
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}
});

//update application
router.put("/:id", auth, async (req, res) => {
	const { id } = req.params;
	const { name, telephoneNumber, supplyItems } = req.body;
	try {
		const update = { name, telephoneNumber, supplyItems };
		const option = { new: true };
		const updatedApplication = await Application.findByIdAndUpdate(
			id,
			update,
			option
		);
		if (!updatedApplication) return res.status(404).send();
		res.status(200).send(updatedApplication);
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}
});

module.exports = router;
