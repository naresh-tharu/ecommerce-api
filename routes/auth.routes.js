const authCtrl = require("../src/controllers/auth.controller");
const authCheck = require("../src/middleware/auth-check.middleware");
const { isAdminOrSeller } = require("../src/middleware/rbac.middleware");
const uploader = require('../src/middleware/uploader.middleware');
const router = require("express").Router();
// http://localhost:3005/api/v1/auth/me
router.post('/login', authCtrl.login);

const dirPath = (req, res, next) => {
    req.uploadPath = "./public/uploads/users"
    next()
}

// public/uploads/users/fileupload.ext


router.post("/register",dirPath, uploader.single('image'), authCtrl.register);

router.get("/verify/:token", authCtrl.getUserFromActivationToken);
router.post('/active/:token', authCtrl.activateUser)
router.post('/forget-password', authCtrl.forgetPassword)
router.post("/logout", authCtrl.logout)
router.post("/password-reset" ,authCtrl.updatePassword)

router.get("/refresh-token", authCheck, authCtrl.refreshToken)

// 'Admin users'
router.get('/admin', authCheck, isAdminOrSeller, authCtrl.getAdmin)
router.get("/me", authCheck, authCtrl.getLoggedInUser)

module.exports = router;