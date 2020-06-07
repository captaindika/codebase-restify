const commandHandler = require('../../../../../../bin/modules/address/repositories/commands/command_handler');
const Address = require('../../../../../../bin/modules/address/repositories/commands/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('Address-commandHandler', () => {
  const data = {
    success: true,
    data: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    message: 'Your request has been processed',
    code: 200
  };

  const payload = {
    email: 'test123456@gmail.com'
  };

  describe('createAddress', () => {
    it('should return create address', async() => {
      sinon.stub(Address.prototype, 'createAddress').resolves(data);
      const rs = await commandHandler.createAddress(payload);
      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      Address.prototype.createAddress.restore();
    });
  });

  describe('updateAddress', () => {
    it('should return update address', async() => {
      sinon.stub(Address.prototype, 'updateAddress').resolves(data);
      const rs = await commandHandler.updateAddress(payload);
      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);
      Address.prototype.updateAddress.restore();
    });
  });

  describe('deleteAddress', () => {
    it('should return delete address', async() => {
      sinon.stub(Address.prototype, 'deleteAddress').resolves(data);
      const rs = await commandHandler.deleteAddress(payload);
      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      Address.prototype.deleteAddress.restore();
    });
  });
});
