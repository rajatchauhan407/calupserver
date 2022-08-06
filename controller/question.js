const Question = require('../models/question');


exports.getMultiplyQuestions = async (req, res, next)=>{
    const {kind} = req.body;
    if(kind === "multiply"){
        const response = await Question.find({
            kind:"multiply"
        });
        res.status(201).json({
            questions:response
        })
        
    }
}