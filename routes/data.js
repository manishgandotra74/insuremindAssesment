const express = require('express');
const router = express.Router();
const agent = require("../assesmentmodels/agent");
const policy_career = require("../assesmentmodels/policy_career");
const policy_category = require("../assesmentmodels/policy_category");
const policy_info = require("../assesmentmodels/policy_info");
const User = require("../assesmentmodels/user");
const useraccount = require("../assesmentmodels/useraccount");

// add demo data with these APIs
router.post('/addUser', function (req, res, err) {
    const user = new User({
        firstname:req.query.firstname,
        Dob:req.query.Dob,
        address:req.query.address,
        phone_number:req.query.phone_number,
        state:req.query.state,
        zip_code:req.query.zip_code,
        email:req.query.email,
        gender:req.query.gender,
        userType:req.query.userType
        });
        user.save().then(createdPost => {
            res.status(201).json({
              message: "User added successfully",
              postId: createdPost._id
            });
        })
});
router.post('/saveAgent', function (req, res, err) {
    const agents = new agent({
        agent_name:req.query.agentname
        });
        agents.save().then(createdPost => {
            res.status(201).json({
              message: "Agent added successfully",
              postId: createdPost._id
            });
        })
});
router.post('/addCompany', function (req, res, err) {
    const policycareer = new policy_career({
        company_name:req.query.company_name
        });
        policycareer.save().then(createdPost => {
            res.status(201).json({
              message: "Company added successfully",
              postId: createdPost._id
            });
        })
});
router.post('/AddAccount', function (req, res, err) {
    const user_account = new useraccount({
        account_name:req.query.account_name
        });
        user_account.save().then(createdPost => {
            res.status(201).json({
              message: "Account added successfully",
              postId: createdPost._id
            });
        })
});
router.post('/addPolicyCategory', function (req, res, err) {
    const policycategory = new policy_category({
        category_name:req.query.category_name
        });
        policycategory.save().then(createdPost => {
            res.status(201).json({
              message: "Policy Category added successfully",
              postId: createdPost._id
            });
        })
});
router.post('/addPolicyInfo', function (req, res, err) {
          
            policy_category.find({category_name:req.query.category_name}).then(createdPost => {
                if (createdPost.length>0){
                    policy_career.find({company_name:req.query.company_name}).then(createdPost2 => {
                        if (createdPost2.length>0){
                            User.find({firstname:req.query.username}).then(createdPost3 => {
                                if (createdPost3.length>0){
                                    const policyinfo = new policy_info({
                                        policy_number:req.query.policy_number,
                                        policy_start_date:req.query.policy_start_date,
                                        policy_end_date:req.query.policy_end_date,
                                        policy_category_id:createdPost[0]._id, // update
                                        company_collection_id:createdPost2[0]._id, // update
                                        user_id:createdPost3[0]._id //update
                                        });
                                        policyinfo.save().then(createdPost => {
                                            res.status(201).json({
                                                message: "Policy Info added successfully",
                                                postId: createdPost._id
                                              });
                                          })                     
                                                }
                              else {
                
                              res.send('error company name ')   
                                }   
                            })   
                            }
                      else {
        
                      res.send('error company ')   
                        }   
                    })   
                    }
              else {

              res.send('error ')   
                }   
            })
           
})

module.exports = router;



