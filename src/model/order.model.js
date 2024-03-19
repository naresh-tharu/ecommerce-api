const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
  cartCode: {
    type: String,
    unique: true,
    required: true,

  },
  cartDetail:
    [{
      productId: { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      amount: { type: Number, required: true }
    }],

  subTotal: { type: Number, required: true },
  discount: { type: Number, required: false },
  vat: { type: Number, required: false },
  totalAmount: { type: Number, required: true },
  isPaid: Boolean,
  orderDate: Date
}, {
  timestamps: true,
  autoIndex: true
})

const OrderModel = mongoose.model("Order", OrderSchema)
module.exports = OrderModel