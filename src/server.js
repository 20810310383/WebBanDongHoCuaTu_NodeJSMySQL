require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const doAnRoutes = require('./routes/doAnRouter');
const connection = require('./config/database');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;


// config template engine
configViewEngine(app);

app.use(session({
    secret: 'secret',  // Chuỗi bí mật để mã hóa phiên
    resave: true,
    saveUninitialized: true
}));

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({extended: true}))   // for form data

// khai bao route
app.use('/', doAnRoutes)

app.listen(port, hostname, () => {
    console.log(`ĐÃ CHẠY ...   >>>  http://localhost:${port}`)
})