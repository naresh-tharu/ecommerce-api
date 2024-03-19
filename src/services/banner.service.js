const Joi = require("joi");
const BannerModel = require("../model/banner.model");
class BannerService {
    validateBannerRequest = async (data) => {
        try {
            let rules = Joi.object({
                title: Joi.string().required(),
                link: Joi.string().default(null),
                status: Joi.string().required(),
                image: Joi.string().required()
            })
            let validation = await rules.validateAsync(data);
            return validation

        } catch (except) {
            // console.log(except);
            throw { code: 400, msg: except?.details?.[0]?.message }
        }
    }

    addBannerData = async (data) => {
        try {
            let bannerObje = new BannerModel(data)
            return await bannerObje.save(); // insert Operation
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Data validation failure" }
        }
    }

    getAllBanners = async ({ perPage = 10, page = 1 }) => {
        try {
            let skip = (page - 1) * perPage;  // 3 => 3-1 *10 => 20
            // 100, => 0-9
            // 1, 10 => 0-9
            // 2, 10 => 10-19
            let bannerData = await BannerModel.find()
                .sort({ _id: -1 })
                .limit(perPage)
                .skip(skip);
            return bannerData;
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query exception" }
        }
    }
    getTotalCount = async () => {
        return await BannerModel.count();
    }
    getBannerForHomePage = async () => {
        try {
            let data = await BannerModel.find({
                // startDate: {$lte: Date.now()},
                // endDate: {$gte: Date.now()},
                status: "active"
            })
                .limit(5)
                .sort({ _id: -1 })
            return data;
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }

    getBannerById = async (id) => {
        try {
            let bannerData = await BannerModel.findById(id);
            return bannerData;
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }

    updateBannerByid = async (data, id) => {
        try {
            let response = await BannerModel.findByIdAndUpdate(id, {
                $set: data
            })
            return response
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }
    deleteBannerById = async (id) => {
        try {
            let deleteResponse = await BannerModel.findByIdAndRemove(id);
            return deleteResponse
            // let deleteResponse = await BannerModel.deleteMany({
            //     _id: {$in: [id]}
            // })
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }
}

const bannerSvc = new BannerService()
module.exports = bannerSvc;