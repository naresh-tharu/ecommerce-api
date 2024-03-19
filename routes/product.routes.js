const router = require("express").Router();
const productCtrl = require("../src/controllers/product.controller");
const authCheck = require("../src/middleware/auth-check.middleware")
const { isAdmin } = require('../src/middleware/rbac.middleware')
const uploader = require("../src/middleware/uploader.middleware");

const dirPath = (req, res, next) => {
    req.uploadPath = "./public/uploads/product"
    next()
}
// TODO: 
router.get("/:slug/byslug", productCtrl.getProductDetailBySlug)
router.get("/:catSlug/byCat", productCtrl.getProductListByCategorySlug)
router.get("/:brandSlug/byBrand", productCtrl.getProductListByBrandSlug)
// CRUD 
router.route("/")
    .post(authCheck, isAdmin, dirPath, uploader.array('images'), productCtrl.createProduct)
    .get(authCheck, isAdmin, productCtrl.listAllProducts)

router.get('/active', productCtrl.listProductsForHomepage)

router.route('/:id')
    .patch(authCheck, isAdmin, dirPath, uploader.array('images'), productCtrl.updateProductById)
    .delete(authCheck, isAdmin, productCtrl.deleteProductById)

module.exports = router;