const mongoose = require("mongoose");

const supplyItemSchema = new mongoose.Schema(
    {type : { 
        type: String, 
        enum : ['ERZAK', 'INSAN_GUCU', 'KIYAFET', 'TEMIZLIK_MALZEMESI'],
        required: true
    },
    name: { type: String },
    amountNeeded : { type: Number, required: true },
    // 3 2 1
    urgency : { 
        type: Number,
        required: true
    },
    }
);

module.exports = supplyItemSchema;