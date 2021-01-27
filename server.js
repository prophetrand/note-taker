var express = require("express");
var fs = require("fs");
var path = require("path");
var db = require("./db/db.json");
var app = express();

var PORT = process.env.PORT || 3003;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Can move this GET method to the bottom of the GETs and replace '/' with '*' to be a catch-all, but gotta make sure it's the bottom one so it doesn't get caught first.
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", function(req, res) {
    res.json(db);
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = Math.ceil(Math.random() * 10000);
    db.push(newNote);
    res.json(newNote);
});

app.delete("/api/notes/:id", function(req, res) {
    var deleteId = req.params.id;
    // console.log(deleteId);
    // var temp = [];
    for (element of db){
        if (element.id === parseInt(deleteId)) {
            console.log("Yes! Finally a hit! Also: " + element.title);
        }
    }

    for (var i = 0; i < db.length; i++) {
        if (db[i].id === deleteId) {
            console.log(i + "is what I've always wanted");
            // db.splice(i, 1);
        }
    }
    // db = temp;
    // console.log(db);
    res.send("note deleted");
});

// Start the server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});