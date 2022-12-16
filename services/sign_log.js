const userModel = require('../models/user.models');
const salt = process.env.ROUNDSALT;
const bcrypt = require('bcrypt');
const Auth = require('../middleware/token');

const signLogServices = async(SchemaValidation) => {

    try{
        const existinguser = await userModel.findOne({$or: [{email: SchemaValidation.email}]});
        
        if(existinguser){
            return 'email already exists';
        }
        const hashpassword = await bcrypt.hash(SchemaValidation.password, Number(salt));
        
        const userData = {
            name: SchemaValidation.name,
            email: SchemaValidation.email,
            password: hashpassword,
            phone: SchemaValidation.phone
        };

        const saveUserData = await userModel.create(userData);

        return saveUserData;
    } catch(err){
        // console.log(err);
        return err;
    }
}

const loginServices = async(dataValidationWithJoi) => {
    
    console.log('dataValidationWithJoi', dataValidationWithJoi)

    try{
        const existUser = await userModel.findOne({email: dataValidationWithJoi.email});

        const checkPassword = await bcrypt.compare(dataValidationWithJoi.password, existUser.password); // compare password

        dataValidationWithJoi.userId = existUser._id
        const token = await Auth.createToken(dataValidationWithJoi); // create token

        const resData = {
            message: 'login succesfull',
            token
        }
        if(checkPassword){
            return resData;

        } else {
            return 'email or password not exists'
            
        };
    } catch(err){
        console.log(err);
        return err;

    };
}

module.exports = {
    signLogServices,
    loginServices
}