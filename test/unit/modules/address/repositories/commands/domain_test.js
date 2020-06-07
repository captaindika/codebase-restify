const Address = require('../../../../../../bin/modules/address/repositories/commands/domain');
const command = require('../../../../../../bin/modules/address/repositories/commands/command');
const query = require('../../../../../../bin/modules/address/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');
const logger = require('../../../../../../bin/helpers/utils/logger');

describe('Address-commandDomain', () => {
  beforeEach(async () => {
    sinon.stub(logger, 'log');
    sinon.stub(logger, 'info');
    sinon.stub(logger, 'error');
  });

  afterEach(async () => {
    logger.log.restore();
    logger.info.restore();
    logger.error.restore();
  });

  describe('createAddress', () => {
    const db = {
      setCollection: sinon.stub()
    };
    const address = new Address(db);
    // it('should return error all field can\'t be empty', async () => {
    //   let queryResult = {
    //     err: null,
    //     data: {
    //       street: 'Jalan sukasuka no 33',
    //       postCode: '12345'
    //     }
    //   };
    //   let payload = {
    //     street: 'Jalan sukasuka no 33',
    //     postCode: '12345',
    //     subDistrict: 'Sukasari',
    //     district: 'Bogor Timur',
    //     city: 'Bogor',
    //     province: 'West Java'
    //   };

    //   sinon.stub(command.prototype, 'insertOneAddress').resolves(queryResult);
    //   const result = await address.createAddress(payload);
    //   console.log(result);
    //   command.prototype.insertOneAddress.restore();
    //   assert.equal(result.err.message, 'Field can\'t empty');
    // });

    it('should return internal server error', async() => {

      let payload = {
        street: 'Jalan sukasuka no 33',
        postalCode: '12345',
        subDistrict: 'Sukasari',
        district: 'Bogor Timur',
        city: 'Bogor',
        province: 'West Java'
      };

      sinon.stub(command.prototype, 'insertOneAddress').resolves({err: true});
      const result = await address.createAddress(payload);
      command.prototype.insertOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success create address', async () => {
      let payload = {
        street: 'Jalan sukasuka no 33',
        postalCode: '12345',
        subDistrict: 'Sukasari',
        district: 'Bogor Timur',
        city: 'Bogor',
        province: 'West Java'
      };
      sinon.stub(command.prototype, 'insertOneAddress').resolves({err: null, payload});
      const result = await address.createAddress(payload);
      command.prototype.insertOneAddress.restore();
      assert.equal(result.data.city, 'Bogor');
    });
  });

  describe('updateAddress', () => {
    const db = {
      setCollection: sinon.stub()
    };
    const address = new Address(db);

    it('should return internal server error', async () => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        street: 'Jalan sukasuka no 33',
        postCode: '12345',
        subDistrict: 'Sukasari',
        district: 'Bogor Timur',
        city: 'Bogor',
        province: 'West Java'
      };
      sinon.stub(command.prototype, 'upsertOneAddress').resolves(queryResult);
      const result = await address.updateAddress(payload);
      command.prototype.upsertOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success update user', async () => {
      let queryResult = {
        err: null,
        data: {
          street: 'Jalan sukasuka no 33',
          postCode: '12345',
          subDistrict: 'Sukasari',
          district: 'Bogor Timur',
          city: 'Bogor',
          province: 'West Java'
        }
      };
      let payload = {
        street: 'Jalan sukasuka no 33',
        postCode: '12345',
        subDistrict: 'Sukasari',
        district: 'Bogor Timur',
        city: 'Bogor',
        province: 'West Java'
      };
      sinon.stub(command.prototype, 'upsertOneAddress').resolves(queryResult);
      const result = await address.updateAddress(payload);
      command.prototype.upsertOneAddress.restore();
      assert.equal(result.data.postCode, '12345');
    });
  });

  describe('deleteAddress', () => {
    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);
    it('should return internal server error', async () => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        addressId: 'hoahoe',
      };
      sinon.stub(command.prototype, 'deleteOneAddress').resolves(queryResult);
      const result = await address.deleteAddress(payload);
      command.prototype.deleteOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success update address', async () => {
      let queryResult = {
        err: null,
        data: ''
      };
      let payload = {
        addressId: 'hoahoe',
      };
      sinon.stub(command.prototype, 'deleteOneAddress').resolves(queryResult);
      const result = await address.deleteAddress(payload);
      command.prototype.deleteOneAddress.restore();
      assert.equal(result.err, null);
    });
  });
});
