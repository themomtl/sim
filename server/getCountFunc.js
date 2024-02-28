
const connection = require('./connection');
const getDistinct = require('./getDistinctFunc');
//function to get all distinct tickers

module.exports = async function getCount(){
    try {
        const distinct = await getDistinct();

        const promises = distinct.map(async d => {
        let sql = `SELECT COUNT(ticker) AS count, ticker FROM stocklist WHERE ticker = '${d.ticker}'`;
        const [result] = await connection.query(sql);
        return result[0];
        });

        const dataList = await Promise.all(promises);
        return dataList;
    } catch (error) {
        next(error);
    }
}