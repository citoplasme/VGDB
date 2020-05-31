var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Modes = require('../../controllers/api/modes.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Modes.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the game modes: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Modes.findOne(req.params.id) ;
        item.games = await Modes.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the game mode ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
