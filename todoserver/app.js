const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost/todos', ['lists', 'todo']);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.put('/todo', (req, res)=>{
  let schema = {
    title: req.body.title,
    id: req.body.id,
    complete: req.body.complete
  };

  db.todo.insert(schema, (err, docs)=>{
    err ? res.json({error: err, data: null}) : res.json({error: null, data: docs});
  });

});

app.post('/todo', (req, res)=>{
  let obj = {
    title: req.body.title,
    id: req.body.id,
    _id: req.body._id,
    complete: req.body.complete
  };

  db.todo.update(
    { _id: obj._id },
    obj, 
    (err, docs)=>{
      err ? res.json({error: err, data: null}) : res.json({error: null, data: docs});
    }
  );

});

app.get('/todo', (req, res)=>{
  db.todo.find({}, {}, (err, docs)=> err? res.json({error: err, todos:null}) : res.json({error: null, todos: docs}) );
});

server.listen(PORT, err=>{
  console.log('listen on *:',PORT);
});
