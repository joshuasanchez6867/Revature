const AWS = require('aws-sdk');

 

// set  you aws region

AWS.config.update({

    region: 'us-east-1'

});

 

// create a dynamoDB client

const dynamoDB = new AWS.DynamoDB();

 

// print a list of the tables

dynamoDB.listTables({}, (err, data) => {

    if(err){

        console.error('Error', err);

    }else{

        console.log('Tables:', data.TableNames); 

    }

});
let params = {
    TableName: 'Test_Table',
    Item: {
      'User_ID' : {S: '001'},
      'emp_ID' : {S: '914296984'}
    }
  };
  
  // Call DynamoDB to add the item to the table
  dynamoDB.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
    
  params = {
    TableName: 'Test_Table',
    Key: {
      'User_ID': {S: '001'},
      'emp_ID' : {S: '914296984'}
    }
  };
  
  // Call DynamoDB to read the item from the table
  dynamoDB.getItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);
    }
  }); 