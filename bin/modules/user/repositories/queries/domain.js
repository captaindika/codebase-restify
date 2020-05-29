
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');
const logger = require('../../../../helpers/utils/logger');

class User {

  constructor(db) {
    this.query = new Query(db);
  }

  async getUsers() {
    const ctx = 'getUsers';
    const user = await this.query.findUsers({});
    if (user.err) {
      logger.error(ctx, 'error', 'Can not find users', user.err);
      return wrapper.error(new NotFoundError('Can not find users'));
    }
    const { data } = user;
    data.map(v => {
      delete v.password;
    });

    logger.info(ctx, 'success', 'Get users success', data);
    return wrapper.data(data);
  }

  async getUser(payload) {
    const ctx = 'getUser';
    const user = await this.query.findOneUser({ userId: payload.userId });
    if (user.err) {
      logger.error(ctx, 'error', 'Can not find user', user.err);
      return wrapper.error(new NotFoundError('Can not find user'));
    }
    const { data } = user;
    delete data.password;

    logger.info(ctx, 'success', 'Get user success', data);
    return wrapper.data(data);
  }
}

module.exports = User;
