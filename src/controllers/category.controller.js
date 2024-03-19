const categorySvc = require("../services/category.service");
const productSvc = require("../services/product.service");


class CategoryController {
    createCategory = async (req, res, next) => {
        try {
            let data = req.body;
            if (req.file) {
                data.image = req.file.filename;
            } else {
                data.image = null
            }

            // Foreign key 
            // data.parent
            if (!data.parent || data.parent === 'null') {
                data.parent = null;
            }

            let validationResponse = await categorySvc.validateCategoryRequest(data);
            validationResponse.slug = await categorySvc.getUniqueSlug(data.name)
            // 

            let response = await categorySvc.addCategoryData(validationResponse)
            res.json({
                result: response,
                status: true,
                msg: "Category Created Successfully",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    getAllparentCats = async (req, res, next) => {
        try {
            let pagReq = { perPage: req.query.perpage ?? 10, page: req.query.page ?? 1 };
            pagReq['filter'] = {
                parent: { $eq: null }
            }
            let totalData = await categorySvc.getTotalCount();
            let response = await categorySvc.getAllCategories(pagReq);
            res.json({
                result: response,
                msg: "Category Data fetched",
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

    listAllCategories = async (req, res, next) => {
        try {
            let pagReq = { perPage: req.query.perpage ?? 10, page: req.query.page ?? 1 };
            let totalData = await categorySvc.getTotalCount();
            let response = await categorySvc.getAllCategories(pagReq);
            res.json({
                result: response,
                msg: "Category Data fetched",
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

    listCategoriesForHomepage = async (req, res, next) => {
        try {
            let response = await categorySvc.getCategoryForHomePage()
            res.json({
                result: response,
                msg: "Category Data fetched",
                status: true,
                meta: null
            })
        } catch (except) {
            next(except);
        }
    }

    updateCategoryById = async (req, res, next) => {
        try {
            let category = await categorySvc.getCategoryById(req.params.id)

            let data = req.body;

            if (req.file) {
                data.image = req.file.filename;
            } else {
                data.image = category.image
            }

            // Foreign key 
            // data.parent
            if (!data.parent || data.parent === 'null') {
                data.parent = null;
            }

            let validationResponse = await categorySvc.validateCategoryRequest(data);
            let response = await categorySvc.updateCategoryByid(validationResponse, req.params.id)
            res.json({
                result: response,
                status: true,
                msg: "Category Updated Successfully",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }


    deleteCategoryById = async (req, res, next) => {
        try {
            let response = await categorySvc.deleteCategoryById(req.params.id);
            if (response) {
                res.json({
                    result: response,
                    msg: "Category Deleted Successfully",
                    status: true,
                    meta: null
                })
            } else {
                next({ code: 404, msg: "Category not found!!!" })
            }
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    getCategoryDetailBySlug = async (req, res, next) => {
        try {
            let catDetail = await categorySvc.getCategoryBySlug(req.params.slug)
            let productList = await productSvc.getProductByCatSlug(req.params.slug);

            res.json({
                result: { catDetail, productList },
                status: true,
                msg: "Category Detail fetched by slug",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    getCategoryById = async (req, res, next) => {
        try {
            let catDetail = await categorySvc.getCategoryById(req.params.id)
            console.log(catDetail)
            res.json({
                result: catDetail,
                status: true,
                msg: "Category Detail fetched by id",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }
}


const categoryCtrl = new CategoryController()
module.exports = categoryCtrl;