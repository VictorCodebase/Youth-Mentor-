const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3200;


const uri = ("mongodb+srv://VictorKithinji:MarkDB@annekithinjidbdemo.51erqxt.mongodb.net/test")


app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());


//?landPage
app.get('/', (req, res) =>
{
    res.render('Home.ejs')
    console.log("home rendered")
})

app.post('/api/messages', (req, res) => {


    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) =>
    {
        if(err){
        console.log('Error connecting to MongoDB:', err);
        res.status(500).send('Internal server error');
        return;
        }

        const db = client.db('newTestDB');
        const collection = db.collection('Messages')

        const data = {
            message: req.body.message,
            client: req.body.client
        };

        collection.insertMany([data])
        .then (() => {
            console.log("Data inserted successfully to MongoDB");
            res.status(200).send("Message sent Successfully");
        })
        .catch(err =>{
            console.log('Error inputing Data to MongoDB:', "\n", err);
            res.status(500).send("Internal server error");  
        });
    })
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

