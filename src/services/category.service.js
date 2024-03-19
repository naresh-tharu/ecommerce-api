const Joi = require("joi");
const CategoryModel = require("../model/category.model");
const { default: slugify } = require("slugify");
class CategoryService {
    validateCategoryRequest = async (data) => {
        try {
            let rules = Joi.object({
                name: Joi.string().required(),
                status: Joi.string().required(),
                description: Joi.string().allow(null, ""),
                image: Joi.string().allow(null, ""),
                parent: Joi.string().allow(null).default(null),
            })
            let validation = await rules.validateAsync(data);
            return validation

        } catch (except) {
            // console.log(except);
            throw { code: 400, msg: except?.details?.[0]?.message }
        }
    }

    addCategoryData = async (data) => {
        try {
            let categoryObje = new CategoryModel(data)
            return await categoryObje.save(); // insert Operation
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Data validation failure" }
        }
    }

    getAllCategories = async ({ perPage = 10, page = 1, filter = {} }) => {
        try {
            let skip = (page - 1) * perPage;  // 3 => 3-1 *10 => 20
            // 100, => 0-9
            // 1, 10 => 0-9
            // 2, 10 => 10-19
            let categoryData = await CategoryModel.find(filter)
                .populate("parent")
                .sort({ _id: -1 })
                .limit(perPage)
                .skip(skip);
            return categoryData;
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query exception" }
        }
    }
    getTotalCount = async () => {
        return await CategoryModel.count();
    }
    getCategoryForHomePage = async () => {
        try {
            let data = await CategoryModel.find({
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

    getCategoryById = async (id) => {
        try {
            let categoryData = await CategoryModel.findById(id);
            return categoryData;
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }

    updateCategoryByid = async (data, id) => {
        try {
            let response = await CategoryModel.findByIdAndUpdate(id, {
                $set: data
            })
            return response
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }
    deleteCategoryById = async (id) => {
        try {
            let deleteResponse = await CategoryModel.findByIdAndRemove(id);
            return deleteResponse
            // let deleteResponse = await CategoryModel.deleteMany({
            //     _id: {$in: [id]}
            // })
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }

    getUniqueSlug = async (str) => {    // abc123234
        let slug = slugify(str, { lower: true });
        let exists = await CategoryModel.findOne({
            slug: slug
        })
        if (!exists) {
            return slug;
        } else {
            slug += Math.ceil(Math.random() * 1000)// abc123234
            await this.getUniqueSlug(slug);
        }
    }

    getCategoryBySlug = async (slug) => {
        try {
            let catDetail = await CategoryModel.findOne({
                slug: slug
            })
                .populate('parent')
            return catDetail;
        } catch (err) {
            throw err;
        }
    }
}

const categorySvc = new CategoryService()
module.exports = categorySvc;