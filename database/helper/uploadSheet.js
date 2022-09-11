const readXlsxFile = require('read-excel-file/node');
const {connectToMongo} = require('../../connectDb');
const Question = require('../../models/question');

const KIND = process.argv[2];
const schema = {
    'firstOperand' : {
        prop:'firstOperand',
        type:Number
    },
    'secondOperand' : {
        prop: 'secondOperand',
        type:Number
    },
    'operator': {
        prop: 'operator',
        type: String
    },
    'answer' : {
        prop: 'answer',
        type: Number
    },
    'level' : {
        prop: 'level',
        type: Number
    },
    'standard' : {
        prop: 'standard',
        type: Number
    },
    'kind':{
        prop:'kind',
        type:String
    }
}
function getPathOfSheet(kind){
    switch(kind){
       case "multiply":
        return pathOfSheet='material/multiplication.xlsx';
       case "addition":
        return pathOfSheet = 'material/addition.xlsx';
       case "division":
        return pathOfSheet = 'material/division.xlsx';
       case "subtraction":
        return pathOfSheet = 'material/subtraction.xlsx';
       default:
        return pathOfSheet = 'material/multiplication.xlsx'; 
    }
}

const path = getPathOfSheet(KIND);
async function uploadSheet(path){
    await connectToMongo();
    const result = await readXlsxFile(path, {schema}).then((rows,errors) => {
        if(rows.errors.length !== 0){
            return errors;
        }else{
            return rows
        }
    });
    const {rows} = result;
    const res =   rows.map(async (el,index)=>{
        const {firstOperand,secondOperand,operator,answer,standard,level,kind} = el;
        const string = `${firstOperand} ${operator} ${secondOperand} = ${answer} `;
        console.log(string);
        const question = new Question({
            firstOperand,
            secondOperand,
            operator,
            answer,
            level,
            standard,
            kind
        });
        await question.save().then(res => console.log(index));
    });
    
}
uploadSheet(path);

