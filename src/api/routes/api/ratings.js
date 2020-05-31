var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Ratings = require('../../controllers/api/ratings.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Ratings.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the ratings: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Ratings.findOne(req.params.id) ;
        item.games = await Ratings.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the rating ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
