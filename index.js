const express = require('express')
const moment = require('moment')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const request = require('request');

var bodyParser = require('body-parser')
const app = express()
const port = 5000
const cors = require('cors');


app.use(cors())

app.use(bodyParser.json())

const userEmail = process.env.userEmail;

const payload = {
    iss: process.env.APIKey,
    exp: ((new Date()).getTime() + 5000)
};

const jwt_token = jwt.sign(payload, process.env.APISecret);

app.post('/event', (req, res) => {
    const startTime = moment(req.body.start);
    const end = moment(req.body.end);
    var duration = moment.duration(end.diff(startTime));

    var options = {
        'method': 'POST',
        'url': `https://api.zoom.us/v2/users/${userEmail}/meetings`,
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt_token}`,
        },
        body: JSON.stringify({
            "topic": req.body.val,
            "type":"2",
            "duration": duration.asMinutes(),
            "start_time":startTime.format('YYYY-MM-DDTHH:mm:ss'),
            "timezone":"Europe/Paris",
            "password":"123456",
            "agenda":"AGENDA"
        })
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        const data = JSON.parse(response.body)
        res.send({id: data.id, topic: data.topic})
      });
})



  
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

