const AWS = require('aws-sdk')

const getTaskById = async (event) => {
  const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

  const { id } = event.pathParameters

  const params = {
    TableName: 'Tasks',
    Key: {
      id
    }
  }

  const result = await dynamoDBClient.get(params).promise()
  const response = result.Item

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

module.exports = {
  getTaskById
}
