var express = require('express');
var router = express.Router();
const connection = require('../connection');

router.delete('/',async (req,res,next)=>{
    try {
        console.log(req.params)
        const [result] = await connection.query('DELETE FROM stocklist WHERE id = ?', [req.params.id]);
        console.log(result)
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
})

module.exports = router;