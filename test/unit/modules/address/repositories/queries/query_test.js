const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/address/repositories/queries/query');

describe('findAddresses', () => {
  const db = {
    setCollection: sinon.stub(),
    findMany: sinon.stub().resolves({
      'err': null,
      'data': [
        {
          '_id': '5ed88cf16c866903f851a09a',
          'addressId': '6b9692b6-5f14-47c1-b483-e77b9e5c5149',
          'street': 'Jalan Sukasari III no 47',
          'postalCode': '12345',
          'subDistrict': 'Sukasari',
          'district': 'Bogor Timur',
          'city': 'Bogor',
          'province': 'West Java'
        }
      ]
    })
  };

  it('should return success get addresses', async () => {
    const query = new Query(db);
    const result = await query.findAddresses({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.length, 1);
  });
});

describe('findOneAddress', () => {
  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {
        '_id': '5ed88cf16c866903f851a09a',
        'addressId': '6b9692b6-5f14-47c1-b483-e77b9e5c5149',
        'street': 'Jalan Sukasari III no 47',
        'postalCode': '12345',
        'subDistrict': 'Sukasari',
        'district': 'Bogor Timur',
        'city': 'Bogor',
        'province': 'West Java'
      }
    })
  };

  it('should return success get address', async () => {
    const query = new Query(db);
    const result = await query.findOneAddress({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.city, 'Bogor');
  });
});
