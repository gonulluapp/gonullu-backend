const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const auth = require("../middlewares/auth");
const Application = require("../models/apply");

router.get("/", auth, async (req, res) => {
  try {
    const applications = await Application.find({
    //   "post.user": req.user._id,
    //   'post.isDeleted': false,
    });
    res.send(applications);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post("/", async (req, res) => {
  const { name, telephoneNumber, supplyItems, postId } = req.body;
  try {
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

module.exports = router;
