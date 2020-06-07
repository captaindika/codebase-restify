const assert = require('assert');
const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/address/repositories/commands/command');
describe('Address-command', () => {
  describe('insertOneAddress', () => {
    const queryResult = {
      err: null,
      data: {
        _id: '6b9692b6-5f14-47c1-b483-e77b9e5c5149',
        street: 'Jalan Sukapurapura III no 99',
        postalCode: '45153',
        subDistrict: 'Sukasari',
        district: 'Bogor Timur',
        city: 'Bogor',
        province: 'West Java'
      }
    };
    it('should success to insert data to db', async () => {
      const db = {
        insertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.insertOneAddress({});
      assert.equal(res.data.street, queryResult.data.street);
    });
  });

  describe('upsertOneAddress', () => {
    const queryResult = {
      err: null,
      data: {
        _id: '6b9692b6-5f14-47c1-b483-e77b9e5c5149',
        street: 'Jalan Sukapurapura III no 99',
        postalCode: '45153',
        subDistrict: 'Sukasari',
        district: 'Bogor Timur',
        city: 'Bogor',
        province: 'West Java'
      }
    };

    it('should success to update data to db', async () => {
      const db = {
        upsertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.upsertOneAddress({});
      assert.equal(res.data.street, queryResult.data.street);
    });
  });

  describe('deleteOneAddress', () => {
    const queryResult = {
      err: null,
      data: ''
    };

    it('should success to delete data from db', async() => {
      const db = {
        deleteOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.deleteOneAddress({});
      assert.equal(res.err, null);
    });
  });
});
