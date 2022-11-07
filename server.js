const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
var db, collection;

const url = "mongodb+srv://yoda-test:test@clustersw.jbs1d04.mongodb.net/nba?retryWrites=true&w=majority";
const dbName = "nba";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('stats').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(result)
    res.render('index.ejs', {messages: result})
    
  })
})

app.post('/player', (req, res) => {
  console.log(req.body)
  db.collection('stats').insertOne(
    {
      playerName: req.body.playerName, 
      team: req.body.team, 
      careerPoints: req.body.careerPoints,
      careerAssists:req.body.careerAssists,
    }, 
      (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// app.put('/player', (req, res) => {
//   console.log()
//   db.collection('stats')
//   .findOneAndUpdate({_id: ObjectId(req.body._id)}, {
//     $inc: {
//       thumbUp:1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

// app.put('/messages', (req, res) => {
//   console.log()
//   db.collection('stats')
//   .findOneAndUpdate({_id: ObjectId(req.body._id)}, {
//     $inc: {
//       thumbDown: 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.delete('/messages', (req, res) => {
  db.collection('stats').findOneAndDelete({playerName:req.body.playerName,team:req.body.team}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
