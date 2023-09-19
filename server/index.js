import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: '12072002',
  port: 1880,
});
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json('Hi');
})

app.use(bodyParser.json());

app.post('/sensor',(req, res)=>{
    const data = req.body;
    console.log('Принятые данные:', data);
    res.status(200).send('Данные успешно приняты');
})

app.get('/presence', (req, res, next) => {
    console.log("Данные студентов :");
    pool.query('SELECT * FROM "STUDENT"')
        .then(StudentData => {
            console.log(StudentData);
            res.send(StudentData.rows);
        })
  })

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK!');
});