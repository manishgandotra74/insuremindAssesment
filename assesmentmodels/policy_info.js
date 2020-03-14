const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    policy_number: {type:String , require:true},
     policy_start_date: {type:Date , require:true},
     policy_end_date: {type:Date , require:true},
     policy_category_id: {type:String , require:true},
     company_collection_id: {type:String , require:true},
     user_id: {type:String , require:true},
    });   
      
module.exports = mongoose.model('PolicyInfo', userSchema);



