// Dependencies
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
var express = require("express");
var path = require("path");
var db = require("./db/db.json");

var app = express();
var PORT = process.env.PORT || 3003;

// Middleware
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.json(db);
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = Math.ceil(Math.random() * 10000);
    db.push(newNote);
    res.json(newNote);
});

app.delete("/api/notes/:id", function(req, res) {
    var deleteId = req.params.id;
    for (element of db){
        if (element.id === parseInt(deleteId)) {
            db.splice(element, 1);
        }
    }
    res.send("note deleted");
});

// Start the server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});