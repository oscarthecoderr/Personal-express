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
    res.render('index.ejs', {info: result})
    
  })
})

app.post('/player', (req, res) => {
  console.log(req.body)
  db.collection('stats').insertOne(
    {
      fullName: req.body.fullName, 
      empCode: req.body.empCode, 
      address: req.body.address,
      city:req.body.city,
      fullEmail:req.body.fullEmail
    }, 
      (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/edit', (req, res) => {
  console.log(req.body)
  db.collection('stats')
  .findOneAndUpdate({_id: ObjectId(req.body._id)}, {
    $set: {
      fullName:req.body.newText.trim()
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

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

app.delete('/delete', (req, res) => {
  db.collection('stats').findOneAndDelete({_id: ObjectId(req.body._id)}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
