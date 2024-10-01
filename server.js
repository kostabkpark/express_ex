import express from  'express';

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/posts', function (req, res) {
  res.send('posts data')
})

app.get("/comments", function (req, res) {
  res.send('comments data')
})

app.listen(3003, () =>
  console.log("http://localhost:3003 server is ready")
)