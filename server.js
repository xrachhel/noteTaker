// Dependencies
const path = require("path")
const express = require("express")
const fs = require("fs")

// Set up Express App
const app = express()
var PORT = process.env.PORT || 3000

// set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Data
var notes = []

// Routes
// app.get("/", function(req, res){
//     res.sendFile(path.join(__dirname, "./public/index.html"))
// })
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})
app.get("/api/notes", function(req, res){
    fs.readFile ('db/db.json', 'utf8', function(err, data){
        if (err) throw err
    
        var note = JSON.parse(data)
       res.json(note)
    })
})
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.post("/api/notes", function(req, res){
    var newNote = req.body
    console.log(newNote)
    fs.readFile('db/db.json', 'utf8', function(err,data){
        if(err) throw err
        var note = JSON.parse(data)
        note.push(newNote)

           fs.writeFile('db/db.json', JSON.stringify(note), 'utf8', function(err){
           if(err) throw err
           console.log('done')
       } )

    })
    res.json(newNote)
})
app.delete("api/notes/:id", function(req, res){
    
})


// Listen
app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT)
})

// fs.readFile ('./db.json', 'utf8', function(err, data){
//     if (err) throw err

//     var note = JSON.parse(data)
//    note.push({title: "hello", text: "text"})
//    console.log(note)

//    fs.writeFile('./db.json', JSON.stringify(note), 'utf8', function(err){
//        if(err) throw err
//        console.log('done')
//    } )
// })


