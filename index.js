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
    },
    title: {
        type:String,
        require:true
    },
    sampleText:{
        type:String,
        require:false
    }
})

const collection = new mongoose.model('Demo@', Schema);
// meaning DBconnect db will use the schema called Schema 


app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

const identificationData = [];
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
        title: "req.body.ClientName",
        sampleText: req.body.Message
        }
        try{
            collection.insertMany([data])
            console.log(data)
        }catch{
            console.log("Error caught when sending received data to mongoDB")
        }
 })

 app.get('/MyApproach.html', (req, res)=>
 {
    res.render("MyApproach.ejs");
    console.log("Approach page rendered")
 })
 app.get('/Discover.html', (req, res)=>
 {
    res.render("Discover.ejs");
    console.log("Approach page rendered")
 })
console.log(`Web app active on LocalHost:${port}`)
app.listen(`${port}`)

