const router = require("express").Router();
const bannerCtrl = require("../src/controllers/banner.controller");
const authCheck = require("../src/middleware/auth-check.middleware")
const { isAdmin } = require('../src/middleware/rbac.middleware')
const uploader = require("../src/middleware/uploader.middleware");

const dirPath = (req, res, next) => {
    req.uploadPath = "./public/uploads/banner"
    next()
}
// CRUD 
router.route("/")
    .post(authCheck, isAdmin, dirPath, uploader.single('image'), bannerCtrl.createBanner)
    .get(authCheck, isAdmin, bannerCtrl.listAllBanners)

router.get('/active', bannerCtrl.listBannersForHomepage)

router.route('/:id')
    .get(authCheck, isAdmin, bannerCtrl.getBannerById)
    .patch(authCheck, isAdmin, dirPath, uploader.single('image'), bannerCtrl.updateBannerById)
    .delete(authCheck, isAdmin, bannerCtrl.deleteBannerById)

module.exports = router;