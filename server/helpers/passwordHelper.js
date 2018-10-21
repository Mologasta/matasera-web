const crypto = require('crypto');

class PasswordHelper {
    static generateSalt() {
        return crypto.randomBytes(16).toString('hex');
    }

    static randomString(length) {
        return crypto.randomBytes(length).toString('hex');
    }

    static hash(password) {
        return crypto.createHash('md5').update(password).digest('hex');
    }

    static compare(password, hashedPassword) {
        return crypto.createHash('md5').update(password).digest('hex') === hashedPassword;
    }

    static generateDigits(count) {
        count = count || 4;
        let result = '';
        for (let i = 0; i < count; i++) {
            result += Math.random().toString().slice(-1);
        }
        return result;
    }
}

module.exports = PasswordHelper;




