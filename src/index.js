const cors = require('cors');
const request = require('request');
const express = require('express');
const convert = require('xml-js');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  request('https://www.w3schools.com/xml/cd_catalog.xml', (err, response, body) => {
    if (err) { res.send(err) }
    if (convert.xml2json(body, { compact: true, spaces: 4 })) {
      res.send({
        status: response.statusMessage,
        data: convert.xml2json(body, { compact: true, spaces: 4 })
      });
    } else {
      res.send({
        status: 'not OK',
        error: 'Not possible to parse',
      })
    }
  })
})

const port = 3000;
app.listen(port, () => {
  console.log(`listing ${port} port`)
});

