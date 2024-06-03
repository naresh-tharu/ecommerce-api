const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config();
const userSvc = require("../services/user.service");

const authCheck = async (req, res, next) => {
    try {
        let token = null;

        if (req.headers['authorization']) {
            token = req.headers['authorization']
        }

        if (req.headers['x-xsrf']) {
            token = req.headers['x-xsrf']
        }

        if (req.query['token']) {
            token = req.query['token'];
        }

        if (!token) {
            next({ code: 401, msg: "Token not provided" })
        }

        // "bearer token" => ["bearer", "token"].pop => "token"
        token = token ? (token.split(" ")).pop() : null;

        if (!token) {
            next({ code: 401, msg: "Token undefined" })
        }


        let data = jwt.verify(token, process.env.JWT_SECRET);

        let userDetail = await userSvc.getUserById(data.id);

        if (userDetail) {
            req.authUser = userDetail
            next()
        } else {
            next({ code: 401, msg: "User not loggedin..." })
        }
    } catch (exception) {
        if (exception instanceof jwt.TokenExpiredError) {
            next({ code: 401, msg: "Token expired..." })
        }
        next({ code: 401, msg: "Unauthorized access" })
    }
}
module.exports = authCheck;