const brandSvc = require("../services/brand.service");
const slugify = require("slugify");

class BrandController {
    createBrand = async (req, res, next) => {
        try {
            let data = req.body;
            if (!req.file) {
                throw { code: 400, msg: "Image required" }
            }
            data.image = req.file.filename;

            let validationResponse = await brandSvc.validateBrandRequest(data);

            validationResponse.slug = slugify(data.title, { lower: true });  // -
            let response = await brandSvc.addBrandData(validationResponse)
            res.json({
                result: response,
                status: true,
                msg: "Brand Created Successfully",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    listAllBrands = async (req, res, next) => {
        try {
            let pagReq = { perPage: req.query.perpage ?? 10, page: req.query.page ?? 1 };
            let totalData = await brandSvc.getTotalCount();
            let response = await brandSvc.getAllBrands(pagReq);
            res.json({
                result: response,
                msg: "Brand Data fetched",
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

    listBrandsForHomepage = async (req, res, next) => {
        try {
            let response = await brandSvc.getBrandForHomePage()
            res.json({
                result: response,
                msg: "Brand Data fetched",
                status: true,
                meta: null
            })
        } catch (except) {
            next(except);
        }
    }

    getBrandById = async (req, res, next) => {
        try {
            let response = await brandSvc.getBrandById(req.params.id);
            if (response) {
                res.json({
                    result: response,
                    msg: "Brand Data Fetched Successfully",
                    status: true,
                    meta: null
                })
            } else {
                next({ code: 404, msg: "Brand not found!!!" })
            }
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    updateBrandById = async (req, res, next) => {
        try {
            let brand = await brandSvc.getBrandById(req.params.id)

            let data = req.body;

            if (req.file) {
                data.image = req.file.filename;
            } else {
                data.image = brand.image
            }


            let validationResponse = await brandSvc.validateBrandRequest(data);
            let response = await brandSvc.updateBrandByid(validationResponse, req.params.id)
            res.json({
                result: response,
                status: true,
                msg: "Brand Updated Successfully",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }


    deleteBrandById = async (req, res, next) => {
        try {
            let response = await brandSvc.deleteBrandById(req.params.id);
            if (response) {
                res.json({
                    result: response,
                    msg: "Brand Deleted Successfully",
                    status: true,
                    meta: null
                })
            } else {
                next({ code: 404, msg: "Brand not found!!!" })
            }
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }
}


const brandCtrl = new BrandController()
module.exports = brandCtrl;