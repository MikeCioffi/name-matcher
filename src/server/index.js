// Import builtin NodeJS modules to instantiate the service
const https = require("https");
const express = require('express');
const mongoose = require('mongoose');
const mongoString = "mongodb+srv://admin:iBzgYkDnMFXUJJWs@cluster0.hckdkha.mongodb.net/Prod?retryWrites=true&w=majority";
const routes = require('./routes/routes');
const cors = require('cors')
mongoose.connect(mongoString);
const database = mongoose.connection;
const fs = require('fs');

// const key = fs.readFileSync('private.key')
// const cert = fs.readFileSync('certificate.crt')


const options = {
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('certificate.crt')
};




database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();


const bodyParser = require('body-parser');
// const { data } = require('autoprefixer');

// create application/json parser
const jsonParser = bodyParser.json()




const corsOptions = {
    origin: 'https://baby-name-finder.netlify.app',
    credentials: true,            //access-control-allow-credentials:true
    headers: { "Access-Control-Allow-Origin": "*" },
    optionSuccessStatus: 200
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors(corsOptions));


app.use('/api', routes)
https
    .createServer(options, app)
    .listen(8080, () => {
        console.log('server is runing at port 8080')
    });
// app.listen(8080, () => {
//     console.log(`Server Started at port ${8080}`)
// })
