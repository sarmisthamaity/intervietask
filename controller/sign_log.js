require('dotenv').config();
const Joi = require('joi');
const passRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

const mobileNumber = require('../helper/phone');
const { signLogServices, loginServices } = require('../services/sign_log');

// create user/signup
const userSignUp = async(req, res) => {
    const datas = req.body;

    const userSchema = Joi.object({
        name: Joi.string().required().min(3).max(20),
        email: Joi.string().required(),
        password: Joi.string().regex(RegExp(passRegex)).min(8).max(20).required()        
    });

    let validatedmobileNumber;
    if(req.body.phone) {
        validatedmobileNumber = await mobileNumber.regexPhoneNumber(req.body.phone);
    }

    if(validatedmobileNumber == "invalid"){
        return res.status(300).send({
            status: 300,
            message: 'invalid mobile number'
        });
    }

    const data = {
        name: datas.name,
        email: datas.email,
        password: datas.password,
    };

    let SchemaValidation = userSchema.validate(data);

    if(SchemaValidation.error){
        return res.status(400).send({
            status: 400,
            error: SchemaValidation.error.details[0].message
        });
    } else{
        SchemaValidation = SchemaValidation.value;
    };
    SchemaValidation.phone = validatedmobileNumber ? validatedmobileNumber : null

    const user = await signLogServices(SchemaValidation);


    if (user === 'email already exists') {
        return res.status(400).send({
            status: 400,
            message: 'user Already Exists',
        });
    } else {

        return res.status(200).send({
            status: 200,
            success: true,
            user
        });

    }

};

// login the user
const userLogin = async(req, res) => {
    
    const dataValidation = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(RegExp(passRegex)).min(8).max(20).required()
    });

    let dataValidationWithJoi = dataValidation.validate(req.body);

    if(dataValidationWithJoi.error){
        return res.status(400).send({
            status: 400,
            error: dataValidationWithJoi.error.message
        });
        
    } else{
        dataValidationWithJoi = dataValidationWithJoi.value;
    };

    const login = await loginServices(dataValidationWithJoi); 

    if (login === 'email or password not exists') {
        return res.status(400).send({
            status: 400,
            message: 'email or password not exists',
        });
    } else {

        return res.status(200).send({
            status: 200,
            success: true,
            login
        });
    }

};



module.exports = { 
    userSignUp,
    userLogin
};