const { v4 } = require('uuid')
const AWS = require('aws-sdk')

const createTask = async (event) => {
  const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

  const { title, descripcion } = JSON.parse(event.body)
  const id = v4()
  const currentDate = new Date().toISOString()

  const newTask = {
    id,
    createdAt: currentDate,
    updatedAt: currentDate,
    state: true,
    title,
    descripcion,
    done: false
  }

  const params = {
    TableName: 'Tasks',
    Item: newTask
  }

  await dynamoDBClient.put(params).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newTask)
  }
}

module.exports = {
  createTask
}
