const express = require('express');
const port = 4003;
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.static('./public'));

app.use(express.static('public'));
app.use('/:id', express.static('public'));

app.get('/categories/:video_id', (req,res)=>{
    axios.get(`http://localhost:8081/categories/${req.params.video_id}`).then((data)=>{
        res.send(data.data);
        res.end();
    }).catch(err=>{console.log(err)})
});

app.get('/usersthumbnail/:user_id', (req,res)=>{
    // const {id} = req.params;
    axios.get(`http://localhost:8081/usersthumbnail/${req.params.user_id}`).then((data)=>{
        res.send(data.data);
        res.end();
    }).catch(err=>{console.log(err)})
});

app.get('/userid/:username', (req,res)=>{
    axios.get(`http://localhost:8081/userid/${req.params.username}`).then((data)=>{
        res.send(data.data);
        res.end();
    }).catch(err=>{console.log(err)})
});

app.get('/videos/:id', (req, res) => {
    const { id } = req.params;

    axios.get(`http://localhost:3000/videos/${id}`)
      .then((response) => {
      let data = response.data;
      res.json(data);
      })
      .catch((error) => {
        console.error('ERROR IN PROXY CALL TO VIDEOS ENDPOINT', error);
      });
});

app.get('/details/:video_id', (req,res)=>{
    // const {id} = req.params;
    axios.get(`http://localhost:8081/details/${req.params.video_id}`).then((data)=>{
        res.send(data.data);
        res.end();
    }).catch(err=>{console.log(err)})
});

app.get('/videosByCategory/:category', (req,res)=>{
    // const {id} = req.params;
    console.log('PARAM ID', req.params);
    axios.get(`http://localhost:8081/videosByCategory/${req.params.category}`).then((data)=>{
        console.log('proxy data', data.data);
        res.send(data.data);
        res.end();
    }).catch(err=>{console.log(err)})
});

app.get('/comments/:video_id', (req,res)=>{
    // const {id} = req.params;
    // console.log('PARAM ID', req.params);
    axios.get(`http://localhost:8081/comments/${req.params.video_id}`).then((data)=>{
        console.log('proxy LENGTHTTTTTTTT', data.data.length);
        res.send(data.data);
        res.end();
    }).catch(err=>{console.log(err)})
});

app.post('/comments/:video_id', (req,res)=>{
    // const {id} = req.params;
    console.log('PARAM ID', req);
    let dataToSend = {
        video_id: req.body.video_id,
        user_id: req.body.user_id,
        comment: req.body.comment,
        date: req.body.date
    }
    axios.post(`http://localhost:8081/comments/${req.params.video_id}`, dataToSend).then(()=>{
        console.log('Done Sending');
        res.end();
    }).catch(err=>{console.log(err)})
})

app.listen(port, () => console.log(`Listening on port: ${port}`));

module.exports = app;