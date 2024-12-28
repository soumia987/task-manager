const mongoose=require('mongoose');
// create tashschema
const taskSchema=new mongoose.Schema({
    id:Number,
    title:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:false
    }
});
// create task model
const Task =mongoose.model("taskdata", taskSchema);



module.exports = Task;



