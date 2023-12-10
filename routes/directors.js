const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');


//add
router.get('/add', function(req, res, next) {
    const director = new Director(req.body);

    director.save()
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
    });
});

module.exports = router;