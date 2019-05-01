const mongoose = require('mongoose');
const Quiz = require('../models/quizs');


exports.get_all_quizs = async (req, res, next) => {
    try{
        const docs = await Quiz.find()
        .limit(2)
        .select(' title description catagory')
        .populate('author')
        const response = docs.map(doc => {
             return {
                _id: doc._id,
                title: doc.title,
                catagory: doc.catagory,
                description: doc.description,
                quizImage: doc.quizImage,
                author: doc.author,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/quizs/' + doc._id
                }
             }
        }
        )
      res.status(200).json(response);

     }catch(err){
        res.status(404).json({
            message: "Not Found",
            error: err
        })
    }
}

exports.create_quiz = async (req, res, next) => {
     try{
        const newQuiz = new Quiz({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            catagory: req.body.catagory,
            quizImage: req.file.path,
            author: req.body.authorId
        });

        const quiz = await newQuiz.save();
        const response ={
            _id: quiz._id,
            title: quiz.title,
            description: quiz.description,
            catagory: quiz.catagory,
            quizImage: quiz.quizImage,
          _id: quiz._id,
           request: {
              type: 'GET',
              url:'http://localhost:5000/quizs/' + quiz._id
          }
       }

        res.status(200).json({
            messasge: 'User created successfully',
            quiz: response
        })
     }catch(err){
        res.status(501).json({
            error: err
        })
     }
}

exports.individual_quiz = async (req, res, next) => {
    try{
        const id = req.params.quizId;
        const quiz = await Quiz.findById(id)
        .select(' title description catagory _id')
        .populate('author')
        .exec()

        const response = {
            quiz,
            request:{
                type: 'GET',
                url: 'http://localhost:5000/quizs'
            }
        }
        res.status(200).json({
            quiz: response
        })
    }catch(err){
        res.status(404).json({
            message: "Not found",
            error: err
        })
    }
}

exports.delete_quiz = async (req, res, next) => {
    try{
        const id = req.params.quizId;
        if(id){
            const result = await Quiz.remove({ _id: id});
            res.status(200).json({
                message:'Quiz deleted',
                result: result
            })
        }
       
    }catch(err){
        res.status(404).json({
            error: err
        })
  }   
}

exports.update_quiz = async (req, res, next) => {
    try{
        const id = req.params.quizId;
        const updateOps = {};

        for(const ops of req.body) {
               updateOps[ops.propName] = ops.value;
        }

       const updatedQuiz = await Quiz.update({_id: id}, {$set: updateOps});

       res.status(200).json({
           message:"Updated sucessfully",
           quiz: updatedQuiz

       })}catch(err) {
        res.status(501).json({
            error: err
        })
       }
}