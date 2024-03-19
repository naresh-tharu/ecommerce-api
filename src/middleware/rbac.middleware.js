const isAdmin = (req, res, next) => {
    try {
        let user = req.authUser
        if (user.role === 'admin') {
            next()
        } else {
            next({ code: 403, msg: "You do not have previliege to access this request." })
        }
    } catch (err) {
        next({ code: 403, msg: "Unauthorized access" })
    }
}

const isSeller = (req, res, next) => {
    try {
        let user = req.authUser
        if (user.role === 'seller') {
            next()
        } else {
            next({ code: 403, msg: "You do not have previliege to access this request." })
        }
    } catch (err) {
        next({ code: 403, msg: "Unauthorized access" })
    }
}

const isCustomer = (req, res, next) => {
    try {
        let user = req.authUser
        if (user.role === 'customer') {
            next()
        } else {
            next({ code: 403, msg: "You do not have previliege to access this request." })
        }
    } catch (err) {
        next({ code: 403, msg: "Unauthorized access" })
    }
}

const isAdminOrSeller = (req, res, next) => {
    try {
        let user = req.authUser
        if (['admin', 'seller'].includes(user.role)) {
            next()
        } else {
            next({ code: 403, msg: "You do not have previliege to access this request." })
        }
    } catch (err) {
        next({ code: 403, msg: "Unauthorized access" })
    }
}


module.exports = { isAdmin, isSeller, isCustomer, isAdminOrSeller }