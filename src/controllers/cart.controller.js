const productSvc = require("../services/product.service");

const helpers = require("../../config/helpers")
const OrderModel = require("../model/order.model");

class CartController {
  placeOrder = async (req, res, next) => {
    try {
      let payload = req.body;
      let productIds = payload.map((item) => item.productId);

      let prodDetail = await productSvc.getProductByFilter({
        _id: { $in: productIds }
      })

      let cartDetail = [];
      let totalAmount = 0;

      prodDetail.map((product) => {
        payload.map((cartItem) => {
          if (product._id.equals(cartItem.productId)) {
            cartItem.price = product.afterDiscount;
            cartItem.image = product.images[0]
            cartItem.amount = Number(cartItem.qty) * product.afterDiscount
            totalAmount += cartItem.amount;
            cartDetail.push(cartItem);
          }
        })
      })

      let orderItem = {
        buyerId: req.authUser._id,
        cartDetail: cartDetail,
        cartCode: helpers.randomString(10),
        subTotal: totalAmount,
        discount: 0,
        vat: (totalAmount - 0) * 0.13,
        totalAmount: totalAmount + ((totalAmount - 0) * 0.13),
        isPaid: false,
        orderDate: new Date()
      }
      const order = new OrderModel(orderItem);
      let response = await order.save();

      // notify 

      res.json({
        result: order,
        status: true,
        msg: "Order Placed successfully"
      })

      // qty, amount

      // [{productId, qty}]

    } catch (excption) {
      next(excption);
    }
  }

  getCartDetail = async (req, res, next) => {
    try {
      let payload = req.body;
      let productIds = payload.map((item) => item.productId);

      let prodDetail = await productSvc.getProductByFilter({
        _id: { $in: productIds }
      })

      let cartDetail = [];

      prodDetail.map((product) => {
        payload.map((cartItem) => {
          if (product._id.equals(cartItem.productId)) {
            cartItem.name = product.name;
            cartItem.price = product.afterDiscount;
            cartItem.image = product.images[0]
            cartItem.amount = Number(cartItem.qty) * product.afterDiscount
            cartDetail.push(cartItem);
          }
        })
      })

      res.json({
        result: cartDetail,
        status: true,
        msg: "Cart Detail fetched"
      })

      // qty, amount

      // [{productId, qty}]

    } catch (excption) {
      next(excption);
    }
  }
}


const cartCtrl = new CartController()
module.exports = cartCtrl;