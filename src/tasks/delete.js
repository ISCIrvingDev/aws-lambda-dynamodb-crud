const AWS = require('aws-sdk')

const deleteTask = async (event) => {
  const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

  const { id } = event.pathParameters

  const params = {
    TableName: 'Tasks',
    Key: {
      id
    },
    ConditionExpression: 'done = :val', // Eliminara solamente si el id coincide y "done == true"
    ExpressionAttributeValues: {
      ':val': true
    }
  }

  let response = 'Task deleted successfully'
  let wasSuccessful = true

  try {
    await dynamoDBClient.delete(params).promise()
  } catch (err) {
    response = `${err}`
    wasSuccessful = false
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      wasSuccessful,
      msn: response
    })
  }
}

module.exports = {
  deleteTask
}
