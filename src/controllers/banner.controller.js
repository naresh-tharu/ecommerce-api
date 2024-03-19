const bannerSvc = require("../services/banner.service");

class BannerController {
    createBanner = async (req, res, next) => {
        try {
            let data = req.body;
            if (!req.file) {
                throw { code: 400, msg: "Image required" }
            }
            data.image = req.file.filename;

            let validationResponse = await bannerSvc.validateBannerRequest(data);
            let response = await bannerSvc.addBannerData(validationResponse)
            res.json({
                result: response,
                status: true,
                msg: "Banner Created Successfully",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    listAllBanners = async (req, res, next) => {
        try {
            let pagReq = { perPage: req.query.perpage ?? 10, page: req.query.page ?? 1 };
            let totalData = await bannerSvc.getTotalCount();
            let response = await bannerSvc.getAllBanners(pagReq);
            res.json({
                result: response,
                msg: "Banner Data fetched",
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

    listBannersForHomepage = async (req, res, next) => {
        try {
            let response = await bannerSvc.getBannerForHomePage()
            res.json({
                result: response,
                msg: "Banner Data fetched",
                status: true,
                meta: null
            })
        } catch (except) {
            next(except);
        }
    }

    getBannerById = async (req, res, next) => {
        try {
            let response = await bannerSvc.getBannerById(req.params.id);
            if (response) {
                res.json({
                    result: response,
                    msg: "Banner Data Fetched Successfully",
                    status: true,
                    meta: null
                })
            } else {
                next({ code: 404, msg: "Banner not found!!!" })
            }
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }

    updateBannerById = async (req, res, next) => {
        try {
            let banner = await bannerSvc.getBannerById(req.params.id)

            let data = req.body;

            if (req.file) {
                data.image = req.file.filename;
            } else {
                data.image = banner.image
            }


            let validationResponse = await bannerSvc.validateBannerRequest(data);
            let response = await bannerSvc.updateBannerByid(validationResponse, req.params.id)
            res.json({
                result: response,
                status: true,
                msg: "Banner Updated Successfully",
                meta: null
            })
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }


    deleteBannerById = async (req, res, next) => {
        try {
            let response = await bannerSvc.deleteBannerById(req.params.id);
            if (response) {
                res.json({
                    result: response,
                    msg: "Banner Deleted Successfully",
                    status: true,
                    meta: null
                })
            } else {
                next({ code: 404, msg: "Banner not found!!!" })
            }
        } catch (exception) {
            console.log({ exception });
            next(exception)
        }
    }
}


const bannerCtrl = new BannerController()
module.exports = bannerCtrl;