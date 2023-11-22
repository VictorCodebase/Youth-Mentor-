const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const { ObjectID } = require('bson');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const router = express.Router();
const port = 3200;
const session = require('express-session')
let collectionID;

const uri = ("mongodb+srv://VictorKithinji:MarkDB@annekithinjiclientdb.9f94r.mongodb.net/test")


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
    secret: "User-secret-key",
    resave: false,
    saveUninitialized: true
}))
//

//?landPage
app.get('/', (req, res) => {
    res.render('Home.ejs')
    console.log("home rendered")
})


MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log('Error connecting to MongoDB:', err);
        return;
    }

    app.post('/api/messages', (req, res) => {
        const db = client.db('newTestDB2');
        const collection = db.collection('Messages')
        app.locals.collection = collection;

        collection.findOne({ contactID: req.body.contactID })
            .then(doc => {
                if (doc) {
                    console.log("Document found. Doc:", doc)
                    collectionID = doc._id
                    res.status(200).send("User")
                }
                else if (!doc) {
                    console.log("New User!!!!!")
                    createNewClient()
                }
            })
            .catch(err => {
                console.log("error occured when looking for doc. Err:", err)
            });

        function createNewClient() {
            const data = {
                name: req.body.name,
                contactID: req.body.contactID
            };
            collection.insertMany([data])
                .then(result => {
                    console.log("Data inserted successfully to MongoDB");
                    collectionID = result.insertedIds[0].toString();
                    app.locals.collectionID = collectionID;
                    res.cookie("AccountID", collectionID)
                    res.status(200).send();
                })
                .catch(err => {
                    console.log('Error inputing Data to MongoDB:', "\n", err);
                    res.status(500).send("Internal server error");
                })
        }


    }
    );

    //!Updating unsers conversation
    app.patch("/update-message", (req, res) => {
        const collection = req.app.locals.collection;
        const message = req.body.text;
        const timestamp = new Date().toISOString();
        app.use((req, res, next) => {
            console.log(req.app.locals.collection);
            next();
        });
        console.log("router accessed")
        try {
            if (collection) {
                collection.updateOne(
                    { _id: ObjectID(app.locals.collectionID) },
                    { $push: { message: message, time: timestamp } },
                    (err, result) => {
                        if (err) console.log("Server error when updating: ", err);
                        else console.log("Server successfully sent update: ", result);
                    })
            } else {
                console.log("Collection undefined. Check defination")
                console.log(app.locals.collection)
            }

        } catch (error) {
            console.log("Update opertaion failed: ", error.message);
        }
        res.status(200).send("Server status: 200");
    })



    //! Receiving and storing errors from client
    app.post('/api/errors', (req, res) => {
        const db = client.db('newTestDB2');
        const errCollection = db.collection('testErrordb')
        console.log("contacted")
        //? add collection to app.locals if necessary

        const errData = {
            overview: req.body.overview,
            error: req.body.error,
            errorTrace: req.body.trace,
        }
        console.log(req.body.error)
        errCollection.insertMany([errData])
            .then(result => {
                console.log("mongoDB received error successfully")
                res.status(200).send("error occured sent")
            })
            .catch(err => {
                res.status(500).send(err)
            })
    })

});






app.use('/api', router)
app.get('/MyApproach.html', (req, res) => {
    res.render("MyApproach.ejs");
    console.log("Approach page rendered")
})
app.get('/Discover.html', (req, res) => {
    res.render("Discover.ejs");
    console.log("Approach page rendered")
})
console.log(`Web app active on LocalHost:${port}`)
app.listen(`${port}`)

