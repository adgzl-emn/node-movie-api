const express = require('express');
const router = express.Router();

//model
const Movie = require('../models/Movie');


//top 10 list
router.get('/top10' ,(req,res) => {
    const movies = Movie.find().limit(10).sort({ imdb_score: -1 });

    movies.then(data => {
        res.json(data);
    }).catch((err) =>{
        res.json(err)
    });
});

//all get
router.get('/',(req,res) => {
    const movies = Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'directors'
            }
        }
    ]);


    movies.then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json(err)
    })
});

//get by id
router.get('/:movie_id' ,(req,res,next) => {
   const movies  = Movie.findById(req.params.movie_id);

   movies.then(data => {
       if (!data)
           next({message: 'Movie Not Found'});
       res.json(data);
   }).catch(err => {
       res.status(500).json(err)
   })
});

//between get
router.get('/between/:start_at/:end_at' , (req,res) => {
    const { start_at,end_at } = req.params;
    const movies = Movie.find(
        {
            year: { "$gte": parseInt(start_at), "$lte": parseInt(end_at) }
        }
        //gte == buyuk veya esit ,gt == buyuk ,lte == kucuk veya esit ,lt == kucuk
    );

    movies.then(data => {
        res.json(data);
    }).catch((err) =>{
        res.json(err)
    });
});

//add movie
router.post('/add', (req, res, next) => {
   //const data = req.body;

   const {title,category,country,year,imdb_score} = req.body;
   const movie = new Movie(req.body);

   movie.save()
       .then(data => {
          res.json(data);
       })
       .catch(err => {
          res.status(500).json(err);
       });

});

//update movie
router.put('/update/:movie_id' ,(req,res,next) => {
    const movies  = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new: true
        }
    );

    movies.then(data => {
        if (!data)
            next({message: 'Movie Not Found'});
        res.json(data);
    }).catch(err => {
        res.status(500).json(err)
    })
});

//delete movie
router.delete('/delete/:movie_id' ,(req,res,next) => {
    const movies  = Movie.findByIdAndDelete(req.params.movie_id);

    movies.then(data => {
        if (!data)
            next({message: 'Movie Not Found'});
        res.json({message: "Silindi"});
    }).catch(err => {
        res.status(500).json(err)
    })
});


module.exports = router;


