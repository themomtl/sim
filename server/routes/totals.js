var express = require('express');
var router = express.Router();
const connection = require('../connection');
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c6s0ql2ad3ifcngb8qvg"
const finnhubClient = new finnhub.DefaultApi()



const getCount = require('../getCountFunc')
const getDistinct = require('../getDistinctFunc')

//Get total cost 
router.get('/total', async function(req, res, next) {
    let sql = 'SELECT SUM(price) AS sum FROM stocklist';
    try {
        const [result] = await connection.execute(sql);
        res.status(200).send(JSON.stringify(result));
    } catch (error) {
        return next(error);
    }

    });
router.get('/total-now', async function(req, res, next) {
    try {
        const distinct = await getCount();
        let sum = 0;

        const promises = [];
        
        distinct?.forEach(d => {
        const promise = new Promise((resolve, reject) => {
            finnhubClient.quote(d.ticker, (error, data, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.c * d.count);
            }
            });
        });
        promises.push(promise);
        });

        // Wait for all promises to resolve and calculate the sum
        const quotes = await Promise.all(promises);
        sum = quotes?.reduce((acc, curr) => acc + curr, 0);
        sum = Math.round(sum * 100) / 100;
        res.status(200).send(JSON.stringify({sum}));
    } catch (error) {
        return next(error);
    }
});

module.exports = router