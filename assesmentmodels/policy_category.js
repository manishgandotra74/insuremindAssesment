const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    category_name: {type:String , require:true},
     
    });   
      
module.exports = mongoose.model('PolicyCategory', userSchema);



