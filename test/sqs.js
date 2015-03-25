var should = require('chai').should(),                                                    
    request = require('supertest'),
    AWS = require('aws-sdk'),
    sqs = new AWS.SQS({apiVersion: 'latest',region:'us-east-1'}),
    sqsurl = 'https://sqs.us-east-1.amazonaws.com/079577709174/test';
                                                                                          
describe ('When you try to call the AWS SQS service', function () {                       
    it ('if you send a Message to the Queue, it should respond with the proper object', function (done) {    

        var params = {
            MessageBody: 'Tito tito capotito, sube al cielo y pega un grito',
            QueueUrl: sqsurl,
            DelaySeconds: 0
        };

        sqs.sendMessage(params, function (err, data) {
            if (err) {
                return done(err);
            }
            data.ResponseMetadata.should.exist.and.be.a('object');
            data.ResponseMetadata.RequestId.should.be.a('string').and.exists;
            data.MD5OfMessageBody.should.exist.and.be.a('string');
            data.MessageId.should.exist.and.be.a('string');
            done();
        });

    });
    it ('if you receive a Message, it should respond with the proper object', function (done) {    

        sqs.receiveMessage({
            QueueUrl: sqsurl,
            MaxNumberOfMessages: 1, 
            VisibilityTimeout: 60, 
            WaitTimeSeconds: 3 
        },function(err, data){
            if(err)return done(err);
            data.ResponseMetadata.should.exist.and.be.a('object');
            data.ResponseMetadata.RequestId.should.be.a('string').and.exists;
            data.Messages.should.exist.and.be.a('array');
            data.Messages[0].Body.should.exist.and.be.an('string');
            done();
        });

    });

});
