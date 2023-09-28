//const UserDAO = require('./dao.js')
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
dynamoDB = new AWS.DynamoDB.DocumentClient(); 
const params = {
    TableName: 'GroceryTable', 
}

const view = (req, res) => {
    dynamoDB.scan(params).promise()
    .then((data) => {
        res.status(200).send({Data: data});
    })
    .catch((err) => {
        res.status(200).send({Message: "Bad Request"});
    });
}
module.exports = {view};