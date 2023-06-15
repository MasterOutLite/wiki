import crypto from 'crypto';
import util from 'util';

const randomBytesAsync = util.promisify(crypto.randomBytes);

const getPasswordSalt = async length => {
  const randomBytes = await randomBytesAsync(Math.ceil(length / 2));
  return randomBytes.toString('hex').slice(0, length);
};

export const sha512 = async (password, salt) => {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHmac('sha512', salt);
      hash.update(password);
      const value = hash.digest('hex');
      resolve({
        salt,
        passwordHash: value,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const saltHashPassword = async password => {
  const salt = await getPasswordSalt(16);
  return await sha512(password, salt);
};
