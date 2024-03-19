const router = require("express").Router();
const brandCtrl = require("../src/controllers/brand.controller");
const authCheck = require("../src/middleware/auth-check.middleware")
const { isAdmin } = require('../src/middleware/rbac.middleware')
const uploader = require("../src/middleware/uploader.middleware");

const dirPath = (req, res, next) => {
    req.uploadPath = "./public/uploads/brand"
    next()
}
// CRUD 
router.route("/")
    .post(authCheck, isAdmin, dirPath, uploader.single('image'), brandCtrl.createBrand)
    .get(authCheck, isAdmin, brandCtrl.listAllBrands)

router.get('/active', brandCtrl.listBrandsForHomepage)

router.route('/:id')
    .get(authCheck, isAdmin, brandCtrl.getBrandById)
    .patch(authCheck, isAdmin, dirPath, uploader.single('image'), brandCtrl.updateBrandById)
    .delete(authCheck, isAdmin, brandCtrl.deleteBrandById)

module.exports = router;