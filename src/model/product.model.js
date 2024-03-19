const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        requried: true,
    },
    categories: [{
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }],
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    discount: {
        type: Number,
        min: 0,
        max: 99
    },
    afterDiscount: {
        type: Number,
        required: true
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand"
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    attributes: [{
        type: Object,
    }],
    // attributes: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: "ProductAttribute"
    //     }
    // ],
    images: [{
        type: String
    }]
}, {
    timestamps: true,
    autoIndex: true
})
const ProductModel = mongoose.model("Product", ProductSchema)
module.exports = ProductModel