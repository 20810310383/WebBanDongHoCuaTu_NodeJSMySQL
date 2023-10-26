require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const doAnRoutes = require('./routes/doAnRouter');
const connection = require('./config/database');

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// config template engine
configViewEngine(app);

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({extended: true}))   // for form data

// khai bao route
app.use('/', doAnRoutes);


// test connection


//simple query 



app.listen(port, hostname, () => {
    console.log(`ĐÃ CHẠY ...   >>>  http://localhost:${port}`)
})