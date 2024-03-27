import express from 'express';



const router = express.Router()

router.use((req,res,next)=>{
    req.account = req.database.collection('accounts')
    req.stocks = req.database.collection('stocks')
    next()
})

router.use(async (req, res,next) => {
    
    try {
        //console.log(req.session.username)
        const user = await req.account.findOne({username: req.session.username})
        req.session.cash = user.cash
        next()
    } catch (error) {
        next(error)
    }
    


})

router.route('/').get(async (req, res,next) => {
        try {
            res.status(200).send(req.session.cash.toString())
        } catch (error) {
            next(error)
        }
}).post(async (req, res,next) => {
    try{
        const response  = await fetch(`https://finnhub.io/api/v1/quote?symbol=${req.body.ticker}&token=${'c6s0ql2ad3ifcngb8qvg'}`)
        if(!response.ok){
            return res.status(400).json({message: 'Invalid Ticker'})
        }
        const data = await response.json()
        req.session.cash = req.session.cash - data.c
        const response2 = await req.stocks.insertOne({...req.body,price: data.c , username: req.session.username})
        const response3 = await req.account.updateOne({username: req.session.username},{$set: {cash: req.session.cash}})

        res.status(201).send(data)
    } catch (error) {
        next(error)
    }
    
})
router.put('/sell/:ticker', async (req, res, next) => {
    
    try {
        // Find the stock in the database
        const stock = await req.stocks.findOne({ ticker: req.params.ticker, username:  req.session.username  });
        // Check if the stock exists
        if (!stock) {
            return res.status(404).send('Stock not found');
        }
        // Remove the stock from the database
        const remove = await req.stocks.deleteOne({ ticker: req.params.ticker, username: req.session.username });
        // Get the current price from finnhub
        const price = await fetch(`https://finnhub.io/api/v1/quote?symbol=${req.params.ticker}&token=${'c6s0ql2ad3ifcngb8qvg'}`)
        const priceJson = await price.json();
        // Uptade the cash amount in the database
        const user = await req.account.updateOne({username: req.session.username},{$set:{cash: (req.session.cash + priceJson.c)}})
        res.send(200)
    } catch (error) {
        next(error);
    }
})
router.get('/balance', async (req, res, next) => {
    console.log(req.session.username)
    try {
        const tickers = await req.stocks.find({ username: req.session.username }).toArray();

        // Create an array of promises for fetching stock data
        const promises = tickers.map(ticker =>
            fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker.ticker}&token=${'c6s0ql2ad3ifcngb8qvg'}`)
                .then(response => response.json())
        );
        const oldSum = tickers.reduce((acc, ticker) => acc + ticker.price, 0);
        // Wait for all promises to resolve
        const responses = await Promise.all(promises);

        // Calculate sum of current prices
        const sum = responses.reduce((acc, response) => acc + response.c, 0);
        
        // Calculate total balance
        const total = Number(req.session.cash) + sum;
        req.session.balance = total;
        // Send response
        res.send(total.toString());
    } catch (error) {
        next(error);
    }
});
router.get('/gains', async (req, res, next) => {
    
    try{
        const total = Number(req.session.balance) - 100000
        res.send(total.toString());
    } catch (error) {
        next(error);
    }
});


export default router;