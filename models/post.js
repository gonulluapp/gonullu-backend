import mongoose from 'mongoose';

const supplyItemSchema = new mongoose.Schema(
    type = { 
        type: String, 
        enum : ['GIDA ', 'INSAN_GUCU', 'KIYAFET', ],
        required: true
    },
    description = { type: String, required: true },
    urgency = { 
        type: String, 
        enum : ['ACIL', 'NORMAL', 'ACIL_DEGIL'],
        required: true
    },
        
);


const postSchema = new mongoose.Schema(
    title = { type: String, required: true },
    description = { type: String, required: true },
    date = { type: Date, default: Date.now },
    city = { type: String, required: true },
    town = { type: String, required: true },
    address = { type: String, required: true },
    telephoneNumber = { type: String},
    email = { type: String },
    whatsappLink = { type: String},
);

const Post = mongoose.model("Post", postSchema);
export default Post;