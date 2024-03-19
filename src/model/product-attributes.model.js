const mongoose = require("mongoose")
const ProductAttrSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    attrValue: [{
        type: String,

    }]
})
const ProductAttributeModel = mongoose.model("ProductAttribute", ProductAttrSchema)
module.exports = ProductAttributeModel