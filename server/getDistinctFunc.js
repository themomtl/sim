
const connection = require('./connection');
//function to get all distinct tickers
module.exports = async function getDistinct(){
    const sqlOne = 'SELECT DISTINCT ticker FROM `stocklist`'; 
    try {
      const [result] = await connection.query(sqlOne);
      return result;
    } catch (error) {
      return next(error);
    }
  }