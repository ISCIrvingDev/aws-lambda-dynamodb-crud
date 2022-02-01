# Info
An AWS Lambda basic CRUD operations with connection to DynamoDB

## Endpoints
* GET /tasks/getAll
* GET /tasks/getById/{id}
* POST /tasks/create
```js
// Request body example
{
  title: 'Your title',
  descripcion: 'Your descripcion'
}
```
* PUT /tasks/update/{id}
```js
// Request body example*
{
  state: true,
  title: 'Your new title',
  descripcion: 'Your new descripcion',
  done: true
}
```

---
**Notes**

> \* state property is true by default when created

> \* done property is false by default when created
---

* PUT /tasks/delete/{id}

# Steps
1) Set up your local AWS CLI

2) Clone the repository
```bash
git clone https://github.com/ISCIrvingDev/aws-lambda-dynamodb-crud.git
```

3) Install the dependencies
```bash
npm i
```

4) Deploy
```bash
npm run deploy
```

5) Enjoy 😁 & like 👍 !!!
