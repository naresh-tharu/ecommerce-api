const router = require("express").Router();
const cartCtrl = require("../src/controllers/cart.controller")
const authCheck = require("../src/middleware/auth-check.middleware")
const { isCustomer } = require('../src/middleware/rbac.middleware')

router.post("/cart-detail", cartCtrl.getCartDetail)
router.post('/create-order', authCheck, cartCtrl.placeOrder)
module.exports = router;