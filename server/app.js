import express from 'express';
import API from './routes/API.js';
import session from 'express-session';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(cors({
    origin: true,
    credentials: true
}));
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static('C:\\Users\\sznic\\OneDrive\\Coding Projects\\React\\TradingSim\\sim\\server\\dist'));

// Route for serving index.html
app.get('/', function(req, res) {
    res.sendFile('C:\\Users\\sznic\\OneDrive\\Coding Projects\\React\\TradingSim\\sim\\server\\dist\\index.html');
});


// Mount API routes
app.use('/api', API);

// Error handling middleware
app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500);
    res.send(err.message);
});

app.listen(8080, () => {
    console.log('Server is running on port 3000');
});
