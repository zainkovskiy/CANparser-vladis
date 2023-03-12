const cors = require('cors');
const request = require('request');
const express = require('express');
const convert = require('xml-js');
const fugureOutParsing = require('./builderObject');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  if (req?.body?.url) {
    request(req.body.url, (err, response, body) => {
      if (err) { res.send(err) }
      if (convert.xml2json(body, { compact: true, spaces: 4 })) {
        res.send({
          status: response.statusMessage,
          data: fugureOutParsing(JSON.parse(convert.xml2json(body, { compact: true, spaces: 2 })), req.body.platform),
          // data: JSON.parse(convert.xml2json(body, { compact: true, spaces: 2 })),
        });
      } else {
        res.send({
          status: 'not OK',
          error: 'Not possible to parse',
        })
      }
    })
  } else {
    res.send({
      status: 'not OK',
      error: 'Not possible to parse',
    })
  }
})

const port = 3000;
app.listen(port, () => {
  console.log(`listing ${port} port`)
});

