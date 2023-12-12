const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');
const mongoose = require("mongoose");


//add
router.post('/add', (req, res, next) => {
    const director = new Director(req.body);

    director.save()
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
    });
});

//direktors
router.get('/', (req,res) => {
    const director = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        }
    ]);

    director.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

//select
router.get('/:director_id', (req,res) => {
    const director = Director.aggregate([
        {
            $match: {
                '_id': new mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        }
    ]);

    director.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});


//update direktors
router.put('/update/:director_id' ,(req,res,next) => {
    const directors  = Director.findByIdAndUpdate(
        req.params.director_id,
        req.body,
        {
            new: true
        }
    );

    directors.then(data => {
        if (!data)
            next({message: 'Director Not Found'});
        res.json(data);
    }).catch(err => {
        res.status(500).json(err)
    })
});


//delete director
router.delete('/delete/:director_id' ,(req,res,next) => {
    const directors  = Director.findByIdAndDelete(req.params.director_id);

    directors.then(data => {
        if (!data)
            next({message: 'Director Not Found'});
        res.json({message: "Silindi"});
    }).catch(err => {
        res.status(500).json(err)
    })
});


module.exports = router;
