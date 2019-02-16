const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/videos';
mongoose.Promise = global.Promise;
const Video = require('../models/video');


mongoose.connect(dbUrl, {useNewUrlParser: true}, (err) => {
    if (err) {
        console.log('Error', +err);
    }
    else {
        console.log("connection established");
    }
})

router.get('/videos', (req, res) => {
    console.log('get request for all videos');
    Video.find({}).exec((err, videos) => {
        if (err) {
            console.log("error get request", err);
        }
        else {
            res.json(videos);
        }
    });
});

router.get('/videos/:id', (req, res) => {
    console.log('get request for a single video');
    Video.findById(req.params.id).exec((err, videos) => {
        if (err) {
            console.log("error get request", err);
        }
        else {
            res.json(videos);
        }
    });
});

router.post('/video', (req, res) => {
    console.log("post a video");
    var newVideo = new Video;
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save((err, insertedVideo) => {
        if (err) {
            console.log("error post video", err);
        }
        else {
            res.json(insertedVideo);
        }
    })
})

router.put('/video/:id', (req, res) => {
    console.log("update a video");
    Video.findByIdAndUpdate(req.params.id,
        {
            $set: {title: req.body.title, url: req.body.url, description: req.body.description}
        },
        {
            new: true
        },
        (err, updateVideo) => {
            if (err) {
                res.send("error updating video");
            }
            else {
                res.json(updateVideo)
            }
        }
    )
});

router.delete('/video/:id', (req, res) => {
    console.log("delete video");
    Video.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
        if (err) {
            console.log("ERRO IN deleting video");
        }
        else {
            res.json(deletedVideo);
        }
    })
})

module.exports = router;