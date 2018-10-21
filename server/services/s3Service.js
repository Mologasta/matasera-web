const AWS = require('aws-sdk');
const fs = require('fs');
const config = require('./../../config');
const env = process.env.NODE_ENV || 'dev';

AWS.config.region = config.aws.region;
AWS.config.apiVersions = {
    s3: '2006-03-01',
};
AWS.config.credentials = new AWS.Credentials({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
});
const S3 = new AWS.S3({ Bucket: config.aws.bucket });

class S3Service {

    /**
     * Uploads file to bucket
     * @param source
     * @param destPath
     * @param type
     * @returns {Promise.<string>}
     */
    static uploadFile(source, destPath, type = 'application/octet-stream') {
        return S3.upload({
            Bucket: config.aws.bucket,
            Key: `${env}/${destPath}`,
            Body: fs.createReadStream(source),
            ACL: 'public-read',
            ContentType: type
        })
            .promise()
            .then(result => result.Location);
    }
}

module.exports = S3Service;