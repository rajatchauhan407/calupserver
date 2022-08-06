const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
        firstOperand:{
            type:Number,
            required: true
        },
        secondOperand:{
            type:Number,
            required: true
        },
        operator: {
            type: String,
            required: true
        },
        answer:{
            type: Number,
            required: true
        },
        level:{
            type: Number
        },
        standard:{
            type:Number
        },
        kind:{
            type:String
        }
})

module.exports = mongoose.model('Question',QuestionSchema);