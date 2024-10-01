import express from  'express';
import mysql from 'mysql';

const app = express()
app.use(express.json());

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '1111',
  database : 'board'
});

connection.connect();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/posts/:id', function (req, res) {
  let { id } = req.params;
  // mysql  로 데이터 가져와서 보여주기
  let sql = `select * from posts where id = ${id}`;
  connection.query(sql, function (error, results) {
    if (error) {
      console.log(results);
      res.send('자료가 없습니다.');
    } else if(results) {
      let {title, views} = results[0];
      res.send(`${id} : ${title} (${views} 명이 조회함)`);
    }
  });
})

app.get('/qs', function (req, res) {
  console.log(req.query);
  let { id , pwd } = req.query;
  res.send(`query string id=${id}, pwd=${pwd}`);
})

app.get('/posts', function (req, res) {
  res.send('posts data')
})

app.post("/posts", (req, res) => {
  console.log("post 요청이 들어왔습니다.");
  console.log(req.body);
  let {id, title, views } = req.body;
  // mysql 로 posts 테이블에 저장한다.
  let sql = `insert into posts(title, views) values ('${title}', ${views})`;
  connection.query(sql, function (error, results) {
    if (error) throw error;
    // console.log(results)
    // console.log(results.affectedRows);
    // console.log(results.insertId);
    if(results.affectedRows == 1) {
      res.send(results.insertId + " 번 post가 저장되었습니다.");
    }
  });
  
});


app.listen(3003, () =>
  console.log("http://localhost:3003 server is ready...")
)