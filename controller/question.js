const Question = require('../models/question');


exports.getMultiplyQuestions = async (req, res, next)=>{
    const {kind} = req.body;
    if(kind){
        const response = await Question.find({
            kind:kind
        });
        res.status(201).json({
            questions:response
        })
        
    }
}