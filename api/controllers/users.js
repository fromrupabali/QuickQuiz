const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/users');

exports.get_all_users = (req, res, next) => {
    User.find()
    .exec()
    .then(users => {
       const response = {
           count: users.length,
           users: users.map(user =>{
              return{
                  _id: user._id,
                  email: user.email
              }
           })
       }
       console.log(users);
       res.status(200).json(response);
    })
    .catch(err=> {
        res.status(404).json({
            error: err
        })
    })
}

exports.create_user = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then( user => {
        if(user.length >= 1){
            res.status(409).json({
                message: "Email Already Exists"
            })
        }else{
          bcrypt.hash(req.body.password, 10, (err, hash) =>  {
             if(err){
                 return res.status(500).json({})
             }else{
               const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  email: req.body.email,
                  password: hash
          
              });
              
           user.save()
           .then(user => {
               console.log(user);
             res.status(200).json({
             message: "User cretated successfully",
             user: user
          })

       })
    .catch(err=> {
       res.status(404).json({
           error: err
         })
       })
      }
  });
         
}})     
}

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message:"Auth failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result) {
               const token = jwt.sign(
                {
                    email: user[0].email,
                    password: user[0].password

                }, 
                'secret', {
                    expiresIn: '1h'
                });
                return res.status(200).json({
                    messsage: 'Auth Sucessfull',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            })
        });
    })
    .catch(err => {
        res.status(404).json({
            errroe: err
        })
    })
}

exports.get_users_user =  (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .select(' _id, email password')
    .exec()
    .then(user=> {
        res.status(200).json({
            user
        });
    })
    .catch(err => {
        res.status(404).json({
           message: "Not Found"
        });
    })
}

exports.delete_user = (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id})
    .exec()
    .then(result  => {
        res.status(200).json({
            message: "User deleted Successfully"
        })
        console.log(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.update_user = (req, res, next) => {
    const id = req.params.userId;
    res.status(200).json({
        message: "Handling individual user Updated pr PATCH request",
        id: id
    });
}