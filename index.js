const express = require('express')
const moment = require('moment')
const request = require('request');

var bodyParser = require('body-parser')
const app = express()
const port = 5000
const cors = require('cors');

const jwt_token;


app.use(cors())


// parse application/x-www-form-urlencoded
app.use(bodyParser.json())




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/events', (req, res) => {
    console.log(req)
    res.send('Hello World!')
  })

app.post('/event', (req, res) => {
    const startTime = moment(req.body.start);
    const end = moment(req.body.end);
    var duration = moment.duration(end.diff(startTime));

    var options = {
        'method': 'POST',
        'url': 'https://api.zoom.us/v2/users/sellam.leonard@gmail.com/meetings',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt_token}`,
        },
        body: JSON.stringify({
            "topic": req.body.val,
            "type":"2",
            "duration": duration.asMinutes(),
            "start_time":"2020-09-16T11:00:00",
            "timezone":"Europe/Paris",
            "password":"123456",
            "agenda":"AGENDA"
        })
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.send(response.body.id)
      });
})



  
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

