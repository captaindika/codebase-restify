const joi = require('joi');

const getUser = joi.object({
  userId: joi.string().required()
});

module.exports = {
  getUser
};
