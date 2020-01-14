// Dependencies
const path = require("path")
const express = require("express")
const fs = require("fs")

// Set up Express App
const app = express()
var PORT = process.env.PORT || 3000

// Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
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
        note.forEach((item, i) => item.id = i + 1)
        console.log(note)
           fs.writeFile('db/db.json', JSON.stringify(note), 'utf8', function(err){
           if(err) throw err
           console.log('done')
       } )

    })
    res.json(newNote)
})
app.delete('/api/notes/:id', function (req, res) {
    var chosenNote = req.params.id
    console.log(chosenNote)
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err
        var note = JSON.parse(data)
        var index = parseInt(chosenNote) - 1
        note.splice(index, 1);
        fs.writeFile('db/db.json', JSON.stringify(note), 'utf8', function (err) {
            if (err) throw err
            console.log('Deleted post!')
        })
    })
    res.send(chosenNote)
})


// Listen
app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT)
})



