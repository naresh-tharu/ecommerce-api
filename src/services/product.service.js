const Joi = require("joi");
const ProductModel = require("../model/product.model.js");
const { default: slugify } = require("slugify");
class ProductService {
    validateProductRequest = async (data) => {
        try {
            let rules = Joi.object({
                name: Joi.string().required(),
                status: Joi.string().required(),
                categories: Joi.array().allow(null, ""),
                description: Joi.string().allow(null, ""),
                price: Joi.number().min(1).required(),
                discount: Joi.number().min(0).max(99).default(0),
                brand: Joi.string().allow(null, ''),
                isFeatured: Joi.boolean().default(false),
                attributes: Joi.array().allow(null, ""),
                seller: Joi.string().allow(null, ""),
                images: Joi.array().allow(null, ""),
                parent: Joi.string().allow(null).default(null),
            })
            let validation = await rules.validateAsync(data);
            return validation

        } catch (except) {
            console.log(except);
            throw { code: 400, msg: except?.details?.[0]?.message }
        }
    }

    addProductData = async (data) => {
        try {
            let productObje = new ProductModel(data)
            return await productObje.save(); // insert Operation
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Data validation failure" }
        }
    }

    getAllProducts = async ({ perPage = 10, page = 1 }) => {
        try {
            let skip = (page - 1) * perPage;  // 3 => 3-1 *10 => 20

            let productData = await ProductModel.find()
                .populate("categories")
                .populate("brand")
                .populate("seller")
                .populate("attributes")
                .sort({ _id: -1 })
                .limit(perPage)
                .skip(skip);
            return productData;
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query exception" }
        }
    }
    getTotalCount = async () => {
        return await ProductModel.count();
    }
    getProductForHomePage = async () => {
        try {
            let data = await ProductModel.find({
                // startDate: {$lte: Date.now()},
                // endDate: {$gte: Date.now()},
                status: "active"
            })
                .populate("categories")
                .populate("brand")
                .populate("seller")
                .populate("attributes")
                .limit(5)
                .sort({ _id: -1 })
            return data;
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }

    getProductById = async (id) => {
        try {
            let productData = await ProductModel.findById(id)
                .populate("categories")
                .populate("brand")
                .populate("seller")
                .populate("attributes");
            return productData;
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }

    updateProductByid = async (data, id) => {
        try {
            let response = await ProductModel.findByIdAndUpdate(id, {
                $set: data
            })
            return response
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }
    deleteProductById = async (id) => {
        try {
            let deleteResponse = await ProductModel.findByIdAndRemove(id);
            return deleteResponse
            // let deleteResponse = await ProductModel.deleteMany({
            //     _id: {$in: [id]}
            // })
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query Exception" }
        }
    }

    getUniqueSlug = async (str) => {    // abc123234
        let slug = slugify(str, { lower: true });
        let exists = await ProductModel.findOne({
            slug: slug
        })
        if (!exists) {
            return slug;
        } else {
            slug += Math.ceil(Math.random() * 1000)// abc123234
            await this.getUniqueSlug(slug);
        }
    }

    getProductBySlug = async (slug) => {
        try {
            let catDetail = await ProductModel.findOne({
                slug: slug
            })
                .populate("categories")
                .populate("brand")
                .populate("seller")
                .populate("attributes")
            return catDetail;
        } catch (err) {
            throw err;
        }
    }

    getProductByFilter = async (filter) => {
        try {
            let allProds = await ProductModel.find(filter)
                .populate("categories")
                .populate("brand")
                .populate("seller")
                .populate("attributes")
            return allProds
        } catch (err) {
            throw err;
        }
    }

    getProductByCatSlug = async (catSlug) => {
        try {
            let pipeline = [
                {
                    '$lookup': {
                        'from': 'categories',
                        'localField': 'categories',
                        'foreignField': '_id',
                        'as': 'categories'
                    }
                },
                {
                    '$lookup': {
                        'from': 'brand',
                        'localField': 'brand',
                        'foreignField': '_id',
                        'as': 'brand'
                    }
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'seller',
                        'foreignField': '_id',
                        'as': 'seller'
                    }
                },
                {
                    '$lookup': {
                        'from': 'productAttributes',
                        'localField': 'attributes',
                        'foreignField': '_id',
                        'as': 'attributes'
                    }
                },
                {
                    '$match': {
                        'categories.slug': {
                            '$in': [
                                catSlug
                            ]
                        }
                    }
                }
            ]
            let products = await ProductModel.aggregate(pipeline);
            return products
        }
        catch (except) {
            throw except
        }
    }

}

const productSvc = new ProductService()
module.exports = productSvc;