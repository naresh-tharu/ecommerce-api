const mongoose = require("mongoose");
// name: Electronics
// parent: null
// id: 123

// id: 234
// name: Television
// parent: 123
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },
    description: String,
    image: String,
    status: {
        type: String,
        enum: ["active", 'inactive'],
        default: 'inactive'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    autoIndex: true
})

const CategoryModel = mongoose.model("Category", CategorySchema)
module.exports = CategoryModel