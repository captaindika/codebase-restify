
const Command = require('./command');
const Query = require('../queries/query');
const model = require('./command_model');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { BadRequestError, InternalServerError } = require('../../../../helpers/error');
const uuidv4 = require('uuid/v4');
const common = require('../../utils/common');

class User {

  constructor(db) {
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async createUser(data) {
    const ctx = 'createUser';
    if (/^(\+62|62|0)/.test(data.mobileNumber)) {
      data.mobileNumber = data.mobileNumber.replace(/^(\+62|62|0)/, '0');
    }
    const checkUser = await this.query.findOneUser({ email: data.email });
    if (checkUser.err) {
      const user = model.user();
      user.userId = uuidv4();
      user.fullName = data.fullName;
      user.mobileNumber = data.mobileNumber;
      user.email = data.email;
      user.password = await common.generateHash(data.password);
      user.createdAt = new Date();
      user.lastModified = new Date();

      const saveUser = await this.command.insertOneUser(user);
      if (saveUser.err) {
        logger.error(ctx,'error', 'Internal server error', saveUser.err);
        return wrapper.error(new InternalServerError('Internal server error'));
      }
      delete user.password;
      logger.info(ctx, 'success', 'Create user success', user);
      return wrapper.data(user, 'Create user success', 100);
    }
    logger.log(ctx, 'fail', 'Email is already taken!');
    const errData = {
      message: 'Email is already taken!',
      code: 1003
    };
    return wrapper.error(new BadRequestError(errData));
  }

  async updateUser(data) {
    const ctx = 'updateUser';
    if (/^(\+62|62|0)/.test(data.mobileNumber)) {
      data.mobileNumber = data.mobileNumber.replace(/^(\+62|62|0)/, '0');
    }

    const document = {
      $set: {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber
      }
    };

    const saveUser = await this.command.upsertOneUser({ userId: data.userId }, document);
    if (saveUser.err) {
      logger.error(ctx,'error', 'Internal server error', saveUser.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }
    delete saveUser.data.password;
    logger.info(ctx, 'success', 'Update user success', saveUser.data);
    return wrapper.data(saveUser.data, 'Update user success', 200);
  }

  async deleteUser(data) {
    const ctx = 'deleteUser';
    const delUser = await this.command.deleteOneUser({ userId: data.userId });
    if (delUser.err) {
      logger.error(ctx,'error', 'Internal server error', delUser.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }

    logger.info(ctx, 'success', 'Delete user success', '');
    return wrapper.data('', 'Delete user success', 200);
  }

}

module.exports = User;
