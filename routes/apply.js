const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const auth = require("../middlewares/auth");
const Application = require("../models/apply");

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.user._id,
      isDeleted: false,
    });

    let allApplications = [];
    for (let post of posts) {
      const applications = await Application.find({
        post: post._id,
      });
      allApplications.push({ postId: post._id, applications: applications });
    }
    res.send(allApplications);
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

//update application
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { name, telephoneNumber, supplyItems } = req.body;
  try {
    const update = { name, telephoneNumber, supplyItems };
    const option = { new: true };
    const updatedApplication = await Application.findByIdAndUpdate(id, update, option);
    if (!updatedApplication) return res.status(404).send();
    res.status(200).send(updatedApplication);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send();
  }

});

module.exports = router;
