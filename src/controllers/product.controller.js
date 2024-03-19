const productSvc = require("../services/product.service");
const categorySvc = require("../services/category.service");
const brandSvc = require("../services/brand.service");


class ProductController {
    createProduct = async (req, res, next) => {
        try {
            let data = req.body;

            if (data.attributes && typeof data.attributes === 'string') {
                data.attributes = JSON.parse(data.attributes)
            }
            console.log(data);

            if (req.files) {
                data.images = req.files.map((item) => item.filename)
            } else {
                data.image = null
            }

            // for categories 
            if (data.categories && typeof data.categories === 'string') {
                data.categories = data.categories.split(',');   //647350c6a68d51b9fee89188,647350a2a68d51b9fee8918 => ["647350c6a68d51b9fee89188","647350a2a68d51b9fee89184"]
            } else {
                data.categories = null;
            }

            // for brand 
            if (!data.brand || data.brand === 'null') {
                data.brand = null;
            }

            if (!data.seller || data.seller === 'null') {
                data.seller = null;
            }

            let validationResponse = await productSvc.validateProductRequest(data);
            validationResponse.slug = await productSvc.getUniqueSlug(data.name)
            // 
            validationResponse.afterDiscount = data.price - data.price * data.discount / 100


            let response = await productSvc.addProductData(validationResponse)
            res.json({
                result: response,
                status: true,
                msg: "Product Created Successfully",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    listAllProducts = async (req, res, next) => {
        try {
            let pagReq = { perPage: req.query.perpage ?? 10, page: req.query.page ?? 1 };
            let totalData = await productSvc.getTotalCount();
            let response = await productSvc.getAllProducts(pagReq);
            res.json({
                result: response,
                msg: "Product Data fetched",
                status: true,
                meta: {
                    total: totalData,
                    ...pagReq
                }
            })
        } catch (except) {
            next(except)
        }
    }

    listProductsForHomepage = async (req, res, next) => {
        try {
            let response = await productSvc.getProductForHomePage()
            res.json({
                result: response,
                msg: "Product Data fetched",
                status: true,
                meta: null
            })
        } catch (except) {
            next(except);
        }
    }

    updateProductById = async (req, res, next) => {
        try {
            let product = await productSvc.getProductById(req.params.id)

            let data = req.body;

            if (req.file) {
                data.image = req.file.filename;
            } else {
                data.image = product.image
            }

            // Foreign key 
            // data.parent
            if (!data.parent || data.parent === 'null') {
                data.parent = null;
            }

            let validationResponse = await productSvc.validateProductRequest(data);
            let response = await productSvc.updateProductByid(validationResponse, req.params.id)
            res.json({
                result: response,
                status: true,
                msg: "Product Updated Successfully",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }


    deleteProductById = async (req, res, next) => {
        try {
            let response = await productSvc.deleteProductById(req.params.id);
            if (response) {
                res.json({
                    result: response,
                    msg: "Product Deleted Successfully",
                    status: true,
                    meta: null
                })
            } else {
                next({ code: 404, msg: "Product not found!!!" })
            }
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    getProductDetailBySlug = async (req, res, next) => {
        try {
            let catDetail = await productSvc.getProductBySlug(req.params.slug)
            res.json({
                result: catDetail,
                status: true,
                msg: "Product Detail fetched by slug",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    getProductListByCategorySlug = async (req, res, next) => {
        try {
            let catSlug = req.params.catSlug;
            // let catDetail = await categorySvc.getCategoryBySlug(catSlug);
            // if(!catDetail){
            //     next({status: 404, msg: "Category Does not exists"})
            // }
            // let products = await productSvc.getProductByFilter({
            //     categories: {$in: [catDetail._id]}
            // })
            let products = await productSvc.getProductByCatSlug(catSlug)
            res.json({
                result: {
                    products: products
                },
                status: true,
                msg: "Product By Category"
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    getProductListByBrandSlug = async (req, res, next) => {
        try {
            let brandSlug = req.params.brandSlug;
            let brandDetail = await brandSvc.getBrandBySlug(brandSlug);
            if (!brandDetail) {
                next({ status: 404, msg: "Category Does not exists" })
            }
            let products = await productSvc.getProductByFilter({
                brand: brandDetail._id
            })
            res.json({
                result: {
                    brandDetail: brandDetail,
                    products: products
                },
                status: true,
                msg: "Product By Brand"
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }
}


const productCtrl = new ProductController()
module.exports = productCtrl;