const Joi = require('joi');
const UserModel = require('../model/user.mode');

class UserService {
    validateRegister = (data) => {
        try {

            let rules = Joi.object({
                name: Joi.string().min(3).max(30).required(),
                email: Joi.string().email().required(),
                phone: Joi.string().allow(null, ''),
                role: Joi.string().pattern(/customer|seller|admin/).default('customer'),
                image: Joi.string(),
                address: Joi.string()
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
                throw exception.details[0].message
            }
        }
    }

    createUser = async (data) => {
        try {
            let user = new UserModel(data);
            // let user  =UserModel.create(data)
            return await user.save();   // store the data in db
        } catch (err) {
            throw err;
        }
    }

    getUserByEmail = async (userCred) => {
        try {
            let userDetail = await UserModel.findOne({ email: userCred.email })
            return userDetail;
        } catch (err) {
            throw err;
        }
    }

    getUserByType = async (role) => {
        try {
            let userDetail = await UserModel.find({ role: role })
            return userDetail;
        } catch (err) {
            throw err;
        }
    }

    updateUser = async (data, filter) => {
        try {
            let response = await UserModel.updateOne(filter, {
                $set: data
            })
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    deleteUser = async (filter) => {
        try {
            let response = await UserModel.deleteOne(filter);
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    getUserById = async (id) => {

        try {
            let userDetail = await UserModel.findById(id, { password: 0 });
            return userDetail;
        } catch (err) {
            throw err;
        }
    }

    getUserByActivationToken = async (activationToken) => {

        try {
            let userDetail = await UserModel.findOne({
                $and: [
                    { activationToken: activationToken },
                    { activationToken: { $ne: null } }
                ]
            }, { password: 0 });
            return userDetail;
        } catch (err) {
            throw err;
        }
    }
    getUserByFilter=async(filter={})=>{
        try{
            let userDetail = await UserModel.find(filter)
            return userDetail
        }catch(exception){
            throw exception
        }
    }

}

const userSvc = new UserService()
module.exports = userSvc;