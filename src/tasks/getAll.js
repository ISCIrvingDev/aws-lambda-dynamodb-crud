const AWS = require('aws-sdk')

const getAllTasks = async (event) => {
  const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

  const params = { TableName: 'Tasks' }

  const result = await dynamoDBClient.scan(params).promise()
  const response = result.Items

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

module.exports = {
  getAllTasks
}
