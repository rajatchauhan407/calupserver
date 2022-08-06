const readXlsxFile = require('read-excel-file/node');
const {connectToMongo} = require('../../connectDb');
const pathOfSheet = 'material/multiplication.xlsx';
const Question = require('../../models/question');
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
uploadSheet(pathOfSheet);

