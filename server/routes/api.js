import express from 'express';
import stockInfo from './StockInfo.js'
import users from './Users.js'
const router = express.Router()




router.use('/stockInfo', stockInfo)
router.use('/users', users)

export default router;