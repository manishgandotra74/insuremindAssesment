const express = require('express');
const csv = require('csv-parser');
const moment = require('moment')
const mongoose = require('mongoose')
const router = express.Router();
var Message = require('../assesmentmodels/messagemodel');
var username=require('../assesmentmodels/user');
var policy =require('../assesmentmodels/policy_info');
var usernData =require('../assesmentmodels/user-csv-test');
var path = require('path')

var infoData=[];
/// CSV Task Here 
router.post('/upload_CSV', function (req, res, err) {
 
  infoData=[];
    var Excel = require('exceljs');
var workbook = new Excel.Workbook(); 
var filename = 'csvvs.csv';
if (path.extname(filename)==='.csv'){
  workbook.csv.readFile(filename) .then(function(worksheet) 
  { 
    worksheet.eachRow({ includeEmpty: true },
     function(row, rowNumber) 
  { 
    if (rowNumber>1){ 
      const user = new usernData({
        name:row.values[1],
        password: row.values[2],
          });
          // Save Data here as per entry
         user.save().then(createdPost => {
          //After getting data saved its viewed here 
            if (createdPost){
            usernData.find({}).then(createdPost => {
            //After getting data saved its viewed here 
            res.send(createdPost)
  
            }); 
  }
        }) 
   
    }
    
   
  
      });
  });
}else {
  workbook.xlsx.readFile(filename) .then(function(worksheet) 
  { 
    worksheet.eachRow({ includeEmpty: true },
     function(row, rowNumber) 
  { 
    if (rowNumber>1){ 
      const user = new usernData({
        name:row.values[1],
        password: row.values[2],
          });
          // Save Data here as per entry
         user.save().then(createdPost => {
          //After getting data saved its viewed here 
            if (createdPost){
            usernData.find({}).then(createdPost => {
            //After getting data saved its viewed here 
            res.send(createdPost)
  
            }); 
  }
        }) 
   
    }
    
   
  
      });
  });
}

});
// send message
router.post('/sendmessage', function (req, res, err) {
    console.log(req.query , req.params , req.body);

    const message = new Message({
        message:req.query.message,
        day:moment(new Date()).format('MM:YY:YY'),
        time:moment(new Date()).format('hh:mm:ss'),

          });
          // Save Data here as per entry
         message.save().then(createdPost => {
            //After getting data saved its viewed here 
       res.send('Message sent ')
});
})

// search policy info 
router.get('/searchpolicyInfo', function (req, resp, err){
    var dbo = mongoose.connection;
    dbo.collection('policyinfos').aggregate([
        
        { $lookup:
           {
             from: 'userinfos',
             localField: 'user_id',
             foreignField: '_id',
             as: 'orderdetails',
           }
         }
        ]).toArray(function(err, res) {
        if (err) throw err;
        resp.send(res)
        console.log((res));
        // db.close();
      });
})
// search policy info by username

router.get('/getpolicybyusername', function (req, res, err){
    username.find({_id:req.query.username}).then(createdPost => {
   if (createdPost){

policy.find({_id:createdPost[0]._id}).then(data => {
res.send(data)
})       
   }
});
})



module.exports = router;