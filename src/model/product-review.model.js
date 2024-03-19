const mongoose = require("mongoose")
const ProductReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    review: String,
    rating: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    }
}, {
    timestamps: true,
    autoIndex: true
})

const ProductReviewModel = mongoose.model("ProductReview", ProductReviewSchema)