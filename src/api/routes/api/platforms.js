var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Platforms = require('../../controllers/api/platforms.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Platforms.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the platforms: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var platform = await Platforms.findOne(req.params.id) ;
        platform.games = await Platforms.findGames(req.params.id) ;
        res.jsonp(platform)
    } catch(erro){
        res.status(500).send(`Error in the getting of the platform ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
