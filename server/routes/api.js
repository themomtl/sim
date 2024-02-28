var express = require('express');
var router = express.Router();

const finnhub = require('finnhub');

const connection = require('../connection');
const getDistinct = require('../getDistinctFunc')
const getCount = require('../getCountFunc')

const totals = require('./totals')
const sessions = require('./sessions');


const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c6s0ql2ad3ifcngb8qvg"
const finnhubClient = new finnhub.DefaultApi()

// router.use(expressSessions({
//   secret: 'my mom is the best',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))



router.use('/', sessions);
router.use('/',totals)

//Get all ticker agrigated and with a count 
router.route('/').get(async function(req, res, next) {
  try {
    const distinct = await getDistinct();
    const promises = distinct.map(async d => {
      let sql = `SELECT COUNT(ticker) AS count, AVG(price) AS avg, ticker FROM stocklist WHERE ticker = '${d.ticker}'`;
      const [result] = await connection.query(sql);
      return result[0];
    });

    const dataList = await Promise.all(promises);
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(dataList));
  } catch (error) {
    next(error);
  }
  
})
//Post a ticker to the data base
.post(async function(req, res, next) {
  let sql = 'INSERT INTO stocklist(user,ticker,price) VALUES(?,?,?)';

  try {
    const [result] = await connection.execute(sql,[req.body.user, req.body.ticker, req.body.price]);    
  } catch (error) {
    return next(error);
  }
  res.sendStatus(204);
})

router.post('/login', async (req, res,next) => {
  const sql = 'SELECT * FROM users WHERE username=? AND password=?'
  try {
    const [result] = await connection.execute(sql,[req.body.username, req.body.password])
    res.status(200).send(result[0])
    console.log(result[0])
  } catch (error) {
    return next(error);
  }
  
})

//this will delete one with the same ticker fifo
router.delete('/:ticker',async function(req, res, next) {
  let sqlTwo = `DELETE FROM stocklist WHERE ticker = ? ORDER BY id ASC LIMIT 1`;

  try {
    const [result] = await connection.execute(sqlTwo,[req.params.ticker]);
    if(!result.affectedRows){
      res.sendStatus(422)
    }
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
});









module.exports = router;
