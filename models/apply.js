const mongoose = require("mongoose");
const { applySupplyItemSchema } = require("./common_schemas/supplyItemSchema");

const applicationSchema = new mongoose.Schema({
	name: String,
	telephoneNumber: String,
	supplyItems: { type: [applySupplyItemSchema], required: true },
	post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
	createdAt: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
