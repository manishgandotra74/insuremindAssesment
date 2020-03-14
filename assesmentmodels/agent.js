const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    agent_name: {type:String , require:true},
 
    });   
      
module.exports = mongoose.model('Agent', userSchema);



