const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.DB_URL, {
    autoCreate: true,
    autoIndex: true
}).then((res) => {
    console.log("Db connected successfully...")
}).catch((err)=> {
    console.log({err})
    console.error("Error establishing db connection...")
})