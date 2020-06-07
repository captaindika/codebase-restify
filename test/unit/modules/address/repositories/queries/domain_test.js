const Address = require('../../../../../../bin/modules/address/repositories/queries/domain');
const query = require('../../../../../../bin/modules/address/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');
const logger = require('../../../../../../bin/helpers/utils/logger');

describe('Address-queryDomain', () => {
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

  describe('getAddresses', () => {
    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);

    it('should return not found error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      sinon.stub(query.prototype, 'findAddresses').resolves(queryResult);
      const result = await address.getAddresses();
      query.prototype.findAddresses.restore();
      assert.notEqual(result.err, null);
    });

    it('should return get address success', async () => {
      let queryResult = {
        err: null,
        data: [
          {
            addressId: 'hoahoe',
            street: 'Jalan sukasuka no 33',
            postCode: '12345',
            subDistrict: 'Sukasari',
            district: 'Bogor Timur',
            city: 'Bogor',
            province: 'West Java"'
          }
        ]
      };
      sinon.stub(query.prototype, 'findAddresses').resolves(queryResult);
      const result = await address.getAddresses();
      query.prototype.findAddresses.restore();
      assert.equal(result.data.length, 1);
    });
  });

  describe('getAdress', () => {
    const db = {
      setCollection: sinon.stub()
    };
    const address = new Address(db);

    it('should return not found error', async () => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        addressId: 'hoahoe'
      };
      sinon.stub(query.prototype, 'findOneAddress').resolves(queryResult);
      const result = await address.getAddress(payload);
      query.prototype.findOneAddress.restore();
      assert.notEqual(result.err, null);
    });

    it('should return get address success', async () => {
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
        addressId: 'hoahoe'
      };
      sinon.stub(query.prototype, 'findOneAddress').resolves(queryResult);
      const result = await address.getAddress(payload);
      query.prototype.findOneAddress.restore();
      assert.equal(result.data.city, 'Bogor');
    });
  });
});
