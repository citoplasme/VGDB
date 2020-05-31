var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Genres = require('../../controllers/api/genres.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Genres.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the genres: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Genres.findOne(req.params.id) ;
        item.games = await Genres.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the genre ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
