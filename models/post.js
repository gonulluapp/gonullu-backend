const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const supplyItemSchema = require("./common_schemas/supplyItemSchema");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    city: { type: String, required: true },
    town: { type: String, required: true },
    address: { type: String, required: true },
    supplyItems: { type: [supplyItemSchema], required: true },
    telephoneNumber: { type: String },
    email: { type: String },
    whatsappLink: { type: String },
    isDeleted: { type: Boolean, default: false },
});

postSchema.plugin(mongoosePaginate);

postSchema.methods.toJSON = function () {
    const obj = this.toObject(); //or var obj = this;
    delete obj.isDeleted;
    return obj;
};
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
