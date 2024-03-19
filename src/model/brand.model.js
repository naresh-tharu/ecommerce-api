const mongoose = require("mongoose");
const BrandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    autoIndex: true
});


const BrandModel = mongoose.model("Brand", BrandSchema)
module.exports = BrandModel;