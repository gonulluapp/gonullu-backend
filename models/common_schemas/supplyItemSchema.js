const mongoose = require("mongoose");

/* 
    We made a seperation here because the
    urgency field is not required for applySupplyItemSchema since
    it is not needed when applying for a post.
*/

const schemaObject = {
	type: {
		type: String,
		enum: ["ERZAK", "INSAN_GUCU", "KIYAFET", "TEMIZLIK_MALZEMESI"],
		required: true,
	},
	name: { type: String },
	amountNeeded: { type: Number },
};

const postSupplyItemSchema = new mongoose.Schema({
	...schemaObject,
	urgency: {
		type: Number,
		required: true,
	},
});

const applySupplyItemSchema = new mongoose.Schema(schemaObject);

module.exports = { applySupplyItemSchema, postSupplyItemSchema };
