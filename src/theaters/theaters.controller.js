const theatersService = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res,next){
    const data = await theatersService.list()

    const reduceMovies = reduceProperties("theater_id",{
        movie_id:["movies",null,"movie_id"],
        title: ["movies", null, "title"],
        rating: ["movies", null, "rating"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    })

    res.json({data: reduceMovies(data)})
}

module.exports = {
    list,
}