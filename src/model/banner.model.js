const mongoose = require("mongoose");
const BannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    link: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    // startDate: {
    //     type: Date,
    // },
    // endDate:{
    //     type: Date
    // }
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    autoIndex: true
});


const BannerModel = mongoose.model("Banner", BannerSchema)
module.exports = BannerModel;