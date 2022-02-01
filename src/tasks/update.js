const AWS = require('aws-sdk')

const updateTask = async (event) => {
  const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

  const { id } = event.pathParameters
  const { state, title, descripcion, done } = JSON.parse(event.body)
  const currentDate = new Date().toISOString()

  const updatedTask = {
    updatedAt: currentDate,
    state,
    title,
    descripcion,
    done
  }

  const params = {
    TableName: 'Tasks',
    Key: {
      id
    },
    UpdateExpression: "set updatedAt = :a, #estado = :b, title = :c, descripcion = :d, done = :e",
    ExpressionAttributeValues: {
      ':a': updatedTask.updatedAt,
      ':b': updatedTask.state,
      ':c': updatedTask.title,
      ':d': updatedTask.descripcion,
      ':e': updatedTask.done
    },
    /*
      // Palabras reservadas de DynamoDB y uso de alias
    https://stackoverflow.com/questions/48653365/update-attribute-timestamp-reserved-word
    https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeNames.html
    https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/ReservedWords.html
    */
    ExpressionAttributeNames: {
      "#estado": "state"
    },
    /*
      // ReturnValues
    * 'UPDATED_NEW' -> Devuelve solamente los campos actualizados
    * 'ALL_NEW' -> Devuelve el objeto completo, despues de la operacion
    * 'ALL_OLD' -> Devuelve el objeto completo, antes de la operacion
    */
    ReturnValues: 'ALL_NEW'
  }

  const result = await dynamoDBClient.update(params).promise()
  const response = result.Attributes

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

module.exports = {
  updateTask
}
