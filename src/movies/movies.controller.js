const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req,res,next){
    let data;
    if(req.query.is_showing === "true"){
        
        data = await moviesService.listShowing();
    }
    else{
        data = await moviesService.list(); 
    }
    res.json({data});
}
async function movieExists(req,res,next){
    const movie = await moviesService.read(req.params.movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    }
    next({status: 404, message: `Movie ${req.params.movieId} could not be found.`});
}

async function read(req,res,next){
    const {movie : data} = res.locals;
    res.json({data});
}

async function listTheatersByMovie(req,res,next){
    const data = await moviesService.listTheatersByMovie(req.params.movieId);
    res.json({data})
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [movieExists, asyncErrorBoundary(read)],
    listTheatersByMovie: asyncErrorBoundary(listTheatersByMovie),
}