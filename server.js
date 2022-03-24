// create my ports here and the listen to port
const express = require('express');
// const path = require('path');

const app = express();


const PORT = process.env.PORT || 3001;

// middlewear is what happens between our requsts and response servers
// serves a static directory called 'public'
// public just means that it is public
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



// serves up home apge, but this is not set to get sent to the index.html file
// this is naturally set up to go to an html file in the public
app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})



// the apps ^ do not work unless this is listed
// app listen is listening to the apps above
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
