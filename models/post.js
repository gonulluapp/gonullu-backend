import mongoose from 'mongoose';
import User from './User';

const supplyItemSchema = new mongoose.Schema(
    type = { 
        type: String, 
        enum : ['ERZAK', 'INSAN_GUCU', 'KIYAFET', 'TEMIZLIK_MALZEMESI'],
        required: true
    },
    description = { type: String, required: true },
    urgency = { 
        type: String, 
        enum : ['ACIL','ACIL_DEGIL'],
        required: true
    },
        
);


const postSchema = new mongoose.Schema(
    title = { type: String, required: true },
    description = { type: String, required: true },
    date = { type: Date, default: Date.now },
    user = { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    city = { type: String, required: true },
    town = { type: String, required: true },
    address = { type: String, required: true },
    supplyItems = { type: [supplyItemSchema], required: true},
    telephoneNumber = { type: String},
    email = { type: String },
    whatsappLink = { type: String},
    isDeleted = { type: Boolean, default: false },
);

const Post = mongoose.model("Post", postSchema);
export default Post;