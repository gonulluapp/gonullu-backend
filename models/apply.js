const mongoose = require("mongoose");
const supplyItemSchema = require("./common_schemas/supplyItemSchema");
const applicationSchema = new mongoose.Schema({
	name: String,
	telephoneNumber: String,
	supplyItems: { type: [supplyItemSchema], required: true },
	post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
