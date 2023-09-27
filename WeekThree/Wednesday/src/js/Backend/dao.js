const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
dynamoDB = new AWS.DynamoDB.DocumentClient(); 
const viewGroceriesDAO = () => { 
    const params = {
        TableName: 'GroceryTable', 
    }
    return dynamoDB.scan(params).promise();
};
module.exports = {viewGroceriesDAO};