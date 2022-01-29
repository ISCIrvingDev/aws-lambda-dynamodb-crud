const { v4 } = require('uuid')
const AWS = require('aws-sdk')

const createTask = async (event) => {
  const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

  const { title, descripcion } = event
  const id = v4()
  const currentDate = new Date().toISOString()

  const newTask = {
    id,
    createdAt: currentDate,
    updatedAt: currentDate,
    title,
    descripcion
  }

  const params = {
    TableName: 'Tasks',
    Item: newTask
  }

  const res = await dynamoDBClient.put(params).promise()
  const response = res.$response.error
    ? {
      msn: 'Unable to add a task',
      err: res.$response.error
    }
    : {
      msn: 'Task added successfully',
      body: newTask
    }

  return {
    statusCode: 200,
    response: JSON.stringify(response)
  }
}

module.exports = {
  createTask
}
