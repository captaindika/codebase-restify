const logger = require('../../../helpers/utils/logger');
const bcrypt = require('bcryptjs');

const generateHash = async (content) => {
  const ctx = 'getSha';
  try {
    const saltRounds = 10;
    const result = await bcrypt.hash(content, saltRounds);
    return result;
  } catch (error) {
    logger.log(ctx, error, 'unknown error');
  }
};

const decryptHash = async (plainText, hash) => {
  const ctx = 'decryptHash';
  try {
    const result = await bcrypt.compare(plainText, hash);
    return result;
  } catch (error) {
    logger.log(ctx, error, 'unknown error');
  }
};

module.exports = {
  generateHash,
  decryptHash
};
