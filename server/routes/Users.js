import express from 'express';
import finnhub from 'finnhub';
import session from 'express-session';
import bcrypt from 'bcrypt';

import account from './account.js';
import { MongoClient, ServerApiVersion }  from 'mongodb'
const uri = 'mongodb+srv://MYCoding:QV9BcLxtJqrInZB4@mycoding.pzucnk1.mongodb.net/test';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecatedErrors: true
  }
});

const router = express.Router()

//mongo db middle ware
router.use(async (req, res, next) => {
    try {
      await client.connect();
      const database = client.db('stocksim');
      req.database = database;
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }); 
  
//finnhub middelware
router.use((req,res,next)=>{
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "c6s0ql2ad3ifcngb8qvg"
    req.finnhub = new finnhub.DefaultApi()
    next()
})


  router.post('/login', async (req, res) => {
    try{
        const users = req.database.collection('users');

        const user = await users.findOne({username: req.body.username});
        if(!user){
            return res.status(401).json({message: 'Invalid Username/password'})
        }
        if(!await bcrypt.compare(req.body.password, user.password)){
            return res.status(401).json({message: 'Invalid Username/password'})
        }
        req.session.username = req.body.username;
        res.sendStatus(204);
    }catch(err){
        err.statusCode = 401
        return next(err)
    }
   
})
router.post('/register', async (req, res,next) => {
    const users = req.database.collection('users');
    const user = await users.findOne({username: req.body.username});
    console.log(user)
    if(user){
        return res.status(401).json({message: 'Invalid Username/password'})
    }
    
    const hash = await bcrypt.hash(req.body.password, 10);
    await users.insertOne({username: req.body.username, password: hash});
    const account = req.database.collection('accounts');
    account.insertOne({username: req.body.username, cash: 1000000});
    req.session.username = req.body.username;
    res.send(200)
})  



router.route('/stock')
    .post( async (req, res,next) => {

    try {
        const stocks = req.database.collection('stocks');
        if(req.body.ticker){
            req.finnhub.quote(req.body.ticker,async (error, data) => {
            if(!data.c){
                return res.status(400).json({message: 'Invalid Ticker'})
            }

            const response = await stocks.insertOne({...req.body,price: data.c , username: req.session.username})
            res.status(201).send(data)
            })
        }
    } catch (error) {
        next(error)
    }
    
    
}).get(async (req, res) =>{
    try {
        const stocks = req.database.collection('stocks');
        const stocksList = await stocks.find({'username': req.session.username}).toArray()
        res.status(200)
        res.send(stocksList)
    } catch (error) {
        next(error)
    }
    
})



router.use('/account',account)




export default router;