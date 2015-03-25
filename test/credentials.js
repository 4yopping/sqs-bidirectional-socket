var should = require('chai').should(),
    AWS = require('aws-sdk');
 
describe ('When you try to execute this application', function () {
    it ('should have an environment variable set for AWS_ACCESS_KEY_ID', function () {
        AWS.config.credentials.accessKeyId.should.exists;
        AWS.config.credentials.accessKeyId.should.not.empty;
    });
    it ('should have an environment variables set for AWS_SECRET_KEY', function () {
        AWS.config.credentials.secretAccessKey.should.exists;
        AWS.config.credentials.secretAccessKey.should.not.empty;
    })
});
