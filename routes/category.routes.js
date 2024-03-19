const router = require("express").Router();
const categoryCtrl = require("../src/controllers/category.controller");
const authCheck = require("../src/middleware/auth-check.middleware")
const { isAdmin } = require('../src/middleware/rbac.middleware')
const uploader = require("../src/middleware/uploader.middleware");

const dirPath = (req, res, next) => {
    req.uploadPath = "./public/uploads/category"
    next()
}
// TODO: 
router.get("/all-parents", categoryCtrl.getAllparentCats)
router.get("/:slug/byslug", categoryCtrl.getCategoryDetailBySlug)
// CRUD 
router.route("/")
    .post(authCheck, isAdmin, dirPath, uploader.single('image'), categoryCtrl.createCategory)
    .get(authCheck, isAdmin, categoryCtrl.listAllCategories)

router.get('/active', categoryCtrl.listCategoriesForHomepage)

router.route('/:id')
    .get(categoryCtrl.getCategoryById)
    .patch(authCheck, isAdmin, dirPath, uploader.single('image'), categoryCtrl.updateCategoryById)
    .delete(authCheck, isAdmin, categoryCtrl.deleteCategoryById)

module.exports = router;