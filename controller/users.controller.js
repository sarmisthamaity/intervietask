const { searchUser, editServices } = require('../services/users.services');
const Joi = require('joi');
const mobileNumber = require('../helper/phone');

const userList = async(req, res, next) => {

    try {
      const query = { $and: [] };
      query['$and'].push({ name: { $regex: req.query.name, $options: 'i' } });

      const result = await searchUser(query)

      return res.status(200).json({
        result
      })

    } catch(err) {
      console.log(err);
      return res.status(400).json({
        error: err
      })
    }
}

const updateUser = async (req, res, next) => {
  const tokenData = req.tokenData;

  const userSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string(),
  });

  const data = {
    name: req.body.name,
    email: req.body.email,
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

  SchemaValidation.phone = validatedmobileNumber;

  try {
      const data = await editServices(SchemaValidation, tokenData)
      console.log('data', data);

      return res.status(202).send({
        status: 202,
        data
      });

  } catch (err) {
      console.log(err);
      return res.status(300).send({
        status: 300,
        error: err
      });
  };
};

module.exports = {
    userList,
    updateUser
}