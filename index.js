const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();
const port = 3200;

//mongoose.connect('mongodb://localhost:27017/DemoDBAnneKIthinji')
mongoose.connect("mongodb+srv://VictorKithinji:MarkDB@annekithinjidbdemo.51erqxt.mongodb.net/test")
.then(() =>
{
    console.log("MongoDB connected")
})
.catch((e)=>
{
    console.log(`Ooopsie=> ${e}`)
})

const Schema = new mongoose.Schema({
     id:{
         type:String
     }
     ,
    title: {
        type:String,
        require:true
    }
    // ,
    // sampleText:{
    //     type:String,
    //     require:false
    // }
})



const collection = new mongoose.model('Demo@', Schema);
// meaning DBconnect db will use the schema called Schema 


app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))


const message =[];


//?landPage
app.get('/', (req, res) =>
{
    res.render('Home.ejs')
    console.log("home rendered")
})
app.post('/', (req, res) =>
{
    
    data ={
        id: Date.now().toString(),
        title: req.body.Message
        //Text: req.body.SampleText
}
    try{
        collection.insertMany([data])
        console.log(data)
        message.push(data)
        console.log("message", message)
    }catch{
        console.log("Error caught when sending received data to mongoDB")
    }
    //res.redirect('/')
})

console.log(`Web app active on LocalHost:${port}`)
app.listen(`${port}`)

