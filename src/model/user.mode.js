const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30,
        index: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        index: true
    },
    password: String,
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin',"seller",'customer'],
        default: "customer"
    },
    status: {
        type: String, 
        enum: ['active','inactive'],
        default:"inactive"
    },
    activationToken: {
        type: String
    },
    image: String, 
    address: {
        shipping: String

            // province: {
            //     type: String, 
            //     enum: ["Koshi",'Madhesh','Bagmati',"Gandaki",'Lumbini','Karnali','Sudur Paschim'],
            //     default: null
            // },
            // distict: {
            //     type: mongoose.Types.ObjectId,
            //     ref: "District"
            // }
        ,
        billing: String
    }
}, {
    autoIndex: true, 
    autoCreate: true,
    timestamps: true
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;