const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    company_name: {type:String , require:true},
     
    });   
      
module.exports = mongoose.model('PolicyCareer', userSchema);



