const joi = require('joi');

const createAddress = joi.object({
  street: joi.string().required(),
  postalCode: joi.string().regex(/^[1-9]{5}$/).required(),
  subDistrict: joi.string().required(),
  district: joi.string().required(),
  city: joi.string().required(),
  province: joi.string().required()
});

const address = () => {
  const model = {
    addressId: '',
    street: '',
    postalCode: 0,
    subDistrict: '',
    district: '',
    city: '',
    province: '',
    createdAt: '',
    lastModified: ''
  };
  return model;
};

const updateAddress = joi.object({
  addressId: joi.string().required(),
  street: joi.string().required(),
  postalCode: joi.number(),
  subDistrict: joi.string(),
  district: joi.string(),
  city: joi.string(),
  province: joi.string()
});

const addressId = joi.object({
  addressId: joi.string().required()
});

module.exports = {
  createAddress,
  address,
  updateAddress,
  addressId
}; 

