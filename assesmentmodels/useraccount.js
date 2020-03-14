const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    account_name: {type:String , require:true},
     
    });   
      
module.exports = mongoose.model('UserAccount', userSchema);



