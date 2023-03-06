const cors = require('cors');
const request = require('request');
const express = require('express');
const convert = require('xml-js');

const fugureOutParsing = (parser) => {
  if (parser?.feed?.object?.length > 0) {
    return parser?.feed?.object.map((item) => {
      return {
        id: item?.ExternalId?._text || '',
        description: item?.Description?._text || ''
      }
    })
  }
  return []
}

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  request('https://novosibirsk.vladis.ru/export_cian_1mtc2bvnyhv', (err, response, body) => {
    if (err) { res.send(err) }
    if (convert.xml2json(body, { compact: true, spaces: 4 })) {
      res.send({
        status: response.statusMessage,
        data: fugureOutParsing(JSON.parse(convert.xml2json(body, { compact: true, spaces: 2 }))),
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

