const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4300;
const mongoose = require('mongoose');
var usage = require('usage');

// As application check every second when it reached 70% it restart server (Use Nodemon)
var CheckUsageEverySecond    = 1000; // every second 
var CpuPercentageUsage        = 70; // percentage

autoRestart = setInterval(function()
{
    usage.lookup(process.pid, function(err, result) 
    {
        if(!err)
        {            
            if(result.cpu > CpuPercentageUsage)
            {
                console.log('restart due to high cpu usage');
                process.exit();
            }
        }
    });
}, CheckUsageEverySecond);
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');// localhost
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const data = require('./routes/data');

const message = require('./routes/message');

app.use('/message', message);
app.use('/data', data);

mongoose.connect('mongodb://localhost:27017/NodeTest' ,
    { useNewUrlParser: true }
)

app.listen(port, function () {

    console.log('Server started on port: ' + port);

});
var db = mongoose.connection;
    db.on('error', function callback() {
        console.error.bind(console, 'connection error:')
    });
    db.once('open', function callback() {
        console.log('Conntected To Mongo Database');
    });