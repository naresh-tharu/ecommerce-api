const app = require("express").Router();
const authRoutes = require("./auth.routes");
const bannerRoutes = require("./banner.routes")
const brandRoutes = require("./brand.routes")
const categoryRoutes = require("./category.routes")
const productRoutes = require("./product.routes")
const cartRoutes = require("./cart.routes")


app.use("/auth", authRoutes)
app.use("/banner", bannerRoutes)
app.use("/brand", brandRoutes)
app.use("/category", categoryRoutes)
app.use("/product", productRoutes)
app.use("/cart", cartRoutes)

// const authCheck = require("../src/middleware/auth-check.middleware");




//const app = express();
// const app = express.Router();


// app.route("/brand")
//     .get((req, res, next) => {})
//     .post(authCheck,  (req, res, next) => {})   // loggin, admin role 

// app.route('/brand/:id')
//     .get((req, res, next) => {})
//     .put(authCheck, (req, res, next) => {})   // loggin, admin role 
//     .delete(authCheck, (req, res, next) => {}) // loggin, admin role 

// app.get("/brand", (req, res, next) => {}) // get 
// app.post("/brand", (req, res, next) => {})  // create
// app.put("/brand/:id", (req, res, next) => {}) // update 
// app.delete("/brand/:id", (req, res, next) => {}) // delete
// app.get("/brand/:id", (req, res, next) => {}) // detail of any one brand





// login check 
// app.use(
//     (req, res, next) => {
//         console.log("I am a first middleware call")
//         // login check 
//         req.user = "Test user"
//         // end 
//         next();

//         //res.json();
//     }, 
//     (req, res, next) => {
//         console.log("I am a second middleware");
//         //res.json();
//         console.log(req.user);
//         next();
//     }
// )

// // app.use()

// // /api/v1
// // route build
// // api 
// // url, method
// // / => get => home page data 
// app.get('/', (req, res, next) => {
//     // send(), sendStatus(), status(), render(), download(), end()
//     // default response => 200 
//     // db ope => user list
//          // null user
//      res.json({
//          data: {},
//          status: true,
//          msg: "Home Page Data Fetched",
//          meta: null
//      })
// })

// app.get("/user/:name/:role", (req, res, next) => {
//      let x = req.params;
//      res.json({
//          data: {
//              params: x
//          }
//      })
//      // {data: {params: {name: ..., role: ....}}}
// })

//  // params 
//  // req.params

//  // headers 
//  // req.headers 

//  // query
//  // req.query

//  // body 
//  // req.body

// app.post('/login', (req, res, next) => {

// })


module.exports = app;
