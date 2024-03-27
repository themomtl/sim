import express from 'express';
import finnhub from 'finnhub';



const router = express.Router()

router.use((req,res,next)=>{
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "c6s0ql2ad3ifcngb8qvg"
    req.finnhub = new finnhub.DefaultApi()
    next()
})
router.get('/:ticker', async (req, res,next) => {
    try {
        let fullData = {};
        req.finnhub.quote(req.params.ticker,(error, data, response) => {
            
            fullData = data;

            if(response.ok && req.params.ticker){
                req.finnhub.companyProfile2({'symbol': req.params.ticker},(error, data, response) => {
                fullData = { ...fullData, 
                    name: data.name};

                res.send(fullData)
                });
            }
        });
    } catch (error) {
        next(error)
    }
})

export default router;