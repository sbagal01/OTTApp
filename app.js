const express=require('express');
let app=express();
let cors=require('cors');
let mongoose=require('mongoose');
const path=require('path');
const userRoutes=require('./routes/UserRoutes.js');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://test:test123@cluster0.4nol0av.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB connected');
})

app.use('/api/user',userRoutes);

//--------------------------------
//deployment
const __dirName1=path.resolve();
console.log(__dirName1)
if(true){
    app.use(express.static(path.join(__dirName1,"/movieui/build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirName1,"movieui", "build","index.html"));
    })
}else{
    app.get("/",(req,res)=>{
        res.send('API is running Successfully');
    })
}

//--------------------------------
app.listen(5000,()=>{
    console.log('Listening to port 5000');
})