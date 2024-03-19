const Joi = require("joi");
const BrandModel = require("../model/brand.model");
class BrandService {
    validateBrandRequest = async (data) => {
        try {
            let rules = Joi.object({
                title: Joi.string().required(),
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

    addBrandData = async (data) => {
        try {
            let brandObje = new BrandModel(data)
            return await brandObje.save(); // insert Operation
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Data validation failure" }
        }
    }

    getAllBrands = async ({ perPage = 10, page = 1 }) => {
        try {
            let skip = (page - 1) * perPage;  // 3 => 3-1 *10 => 20
            // 100, => 0-9
            // 1, 10 => 0-9
            // 2, 10 => 10-19
            let brandData = await BrandModel.find()
                .sort({ _id: -1 })
                .limit(perPage)
                .skip(skip);
            return brandData;
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query exception" }
        }
    }
    getTotalCount = async () => {
        return await BrandModel.count();
    }
    getBrandForHomePage = async () => {
        try {
            let data = await BrandModel.find({
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

    getBrandById = async (id) => {
        try {
            let brandData = await BrandModel.findById(id);
            return brandData;
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }

    updateBrandByid = async (data, id) => {
        try {
            let response = await BrandModel.findByIdAndUpdate(id, {
                $set: data
            })
            return response
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }
    deleteBrandById = async (id) => {
        try {
            let deleteResponse = await BrandModel.findByIdAndRemove(id);
            return deleteResponse
            // let deleteResponse = await BrandModel.deleteMany({
            //     _id: {$in: [id]}
            // })
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }

    getBrandBySlug = async (slug) => {
        try {
            let brandDetail = await BrandModel.find({
                slug: slug
            })
            return brandDetail
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }
}

const brandSvc = new BrandService()
module.exports = brandSvc;