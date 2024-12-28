const express=require('express');
const mongoose=require('mongoose');
const routers = require("./routes/routes");

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/tasks').then(()=>{
    console.log('connected to mongodb');
})
.catch(error=>{
    console.log('error to connect to mongodb' + error);
});

app.use('/tasks', routers);

app.listen(3000, ()=>{
    console.log("API is active on port 3000");
})




