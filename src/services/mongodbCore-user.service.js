const Joi = require('joi');
const MongoDBService = require('./mongodb.service');

class UserService extends MongoDBService {
    constructor() {
        super();
        // this.collection = this._db.collection("users");
    }
    validateRegister = (data) => {
        try {

            let rules = Joi.object({
                name: Joi.string().min(3).max(30).required(),
                email: Joi.string().email().required(),
                // password: Joi.string().min(8).max(25).required(),
                phone: Joi.string().allow(null, ''),
                role: Joi.string().pattern(/customer|seller/).default('customer'),
                image: Joi.string()
            });
            let response = rules.validate(data)
            if (response.error) {
                throw response.error.details[0].message
            } else {
                return response;
            }
        } catch (exception) {
            console.log(exception);
            throw exception;
        }
    }

    validateLogin = async (credentials) => {
        try {
            let rules = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            })
            let response = await rules.validateAsync(credentials);

            return response;

        } catch (exception) {
            // console.log("exception", exception)
            throw exception.details[0].message
        }
    }

    validatePassword = async (password) => {
        {
            try {
                let rules = Joi.object({
                    password: Joi.string().min(8).max(25).required(),
                    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
                })
                let response = await rules.validateAsync(password);

                return response;

            } catch (exception) {
                // console.log("exception", exception)
                throw exception.details[0].message
            }
        }
    }

    createUser = async (data) => {
        try {
            let response = await this._db.collection('users').insertOne(data);
            return response;
        } catch (err) {
            throw err;
        }
    }

    getUserByEmail = async (userCred) => {
        try {
            let userDetail = await this._db.collection('users').findOne(userCred);  // {}
            return userDetail;
        } catch (err) {
            throw err;
        }
    }

    updateUser = async (data, filter) => {
        try {
            let response = await this._db.collection("users").updateOne(filter, {
                $set: data
            })
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    deleteUser = async (filter) => {
        try {
            let response = await this._db.collection('users').deleteOne(filter);
            return response;
        } catch (exception) {
            throw exception;
        }
    }
}

const userSvc = new UserService()
module.exports = userSvc;