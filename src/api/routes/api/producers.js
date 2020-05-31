var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Producers = require('../../controllers/api/producers.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Producers.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the producers: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Producers.findOne(req.params.id) ;
        item.games = await Producers.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the producer ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
