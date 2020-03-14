const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname: {type:String , require:true},
    Dob: {type:Date , require:true},
    address: {type:String , require:true},
    phone_number: {type:String , require:true},
    state: {type:String , require:true},
    zip_code: {type:Number , require:true},
    email: {type:String , require:true},
    gender: {type:String , require:true},
    userType: {type:String , require:true}  
    });   
      
module.exports = mongoose.model('Userinfo', userSchema);



