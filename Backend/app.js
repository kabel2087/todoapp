const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
}));

app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'))




const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '127.0.0.1', 
     user:'root', 
     password: '',
     database: 'db',
     connectionLimit: 5
}); 


app.get('/task/all', (req, res) =>{
     pool.getConnection()
    .then(conn => {
     conn.query("SELECT * FROM task")
     .then((rows) => {
          res.send(rows);
     })
     .then((res) => {
          console.log(res);
          conn.end();
     }).catch(err => {
          console.log('Nepripojene k DB');
          res.sendStatus(500);
     })
     })}

)

app.delete('/task/:id', (req, res) =>{
     pool.getConnection().then(conn => {
          conn.query("DELETE from task WHERE id=?", [req.params.id]).then((rows) => {
               conn.query("SELECT * FROM task").then((rows) => {
                    res.send(rows);
                    conn.end();
               }).catch((err) => {
                    res.sendStatus(500);
               })
          }).then((res) => {
               conn.end();
          })
     }).catch((err) => {
          console.log('Nepripojene k DB');
          res.sendStatus(500);
     })
     
     
})

app.post('/task', (req,res) =>{
     console.log(req.body);
     pool.getConnection().then(conn => {
          conn.query("INSERT INTO task (task) VALUES (?)", [req.body.task]).then((rows) => {
               conn.query("SELECT * FROM task").then ((rows) => {
                    res.send(rows);
                    conn.end();
               }).catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
               })
          }).then ((rows) => {
               conn.end();
          }).catch((err) => {
               console.log(err);
               res.sendStatus(500);
          })
     })
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))