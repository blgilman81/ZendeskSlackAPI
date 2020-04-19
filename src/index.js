const express = require('express');
const url = require('url');
const zdapi = require('./zdapi.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(express.json());

app.get('/test', async (req, res) => {
        try {
                const newSearch = await zdapi.searchURL();
                await zdapi.sendNotification(newSearch);
                res.send({ result: newSearch });
        } catch (e) {
                res.sendStatus(404).send();
        }
});

app.get('/test/search/:endpoint/:search1/:search2', async (req, res) => {
        try {
                console.log(req.test);
                const urlToPass = `${req.params.endpoint}?${req.params.search1} ${req.params.search2}`;
                const newSearch = await zdapi.searchURL(urlToPass);
                res.send(newSearch);
        } catch (e) {
                res.send(e);
        }
});

app.post('/test/post', async (req, res) => {
        try {
                const urlToPass = `${req.body.endpoint2}?${req.body.query1} ${req.body.query2}`;
                const newSearch = await zdapi.searchURL(urlToPass, req.body.resultFormat);
                res.send(newSearch);
        } catch (error) {
                res.status(404).send();
        }
});

app.listen(port);

// .then(result => {
//         console.log(result);
// })
// .catch(e => {
//         console.log(e);
// });
