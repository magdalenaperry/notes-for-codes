const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
// const res = require('express/lib/response');
// const { response } = require('express');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// set up our server
const app = express();
const PORT = process.env.PORT || 3001;

// // routing files
// const apiRoutes = require('./routes/APIroute');
// const htmlRoutes = require('./routes/HTMLroute');

// middleware 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// GET route for notes page
app.get('/api/notes', function(req, res) {
    readFileAsync('./db/db.json', 'utf-8').then((data) => {
        noteList = [].concat(JSON.parse(data))
        res.json(noteList);
    })
}) 

app.post('/api/notes', function(req, res){
    const noteBody = req.body;
    readFileAsync('./db/db.json', 'utf-8').then((data) => {
        const noteList = [].concat(JSON.parse(data));
        noteBody.id = noteList.length + 1
        noteList.push(noteBody);
        return noteList
    }).then(function(noteList){
        writeFileAsync('./db/db.json', JSON.stringify(noteList))
        res.json(noteBody);
    })
})

app.delete('/api/notes/:id',(req, res)=>{
    const idDeleted = parseInt(req.params.id);
    readFileAsync('db/db.json', 'utf-8').then((data) => {
        const newNotes = []
        const noteBody = [].concat(JSON.parse(data));
        for (let i = 0; i < noteBody.length; i++) {
            if (!idDeleted == noteBody[i].id) {
                newNotes.push(noteBody[i])
            }
        }
        return newNotes
    }).then(function(noteBody){
        writeFileAsync('db/db.json', JSON.stringify(noteBody))
        res.send('you successfully deleted');
    })
})

app.get('/notes',(req, res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get("*", (req, res)=> {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// starts server
app.listen(PORT, () =>
    console.log(`Listening to PORT: http://localhost:${PORT}`)
);
