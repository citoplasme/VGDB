var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Developers = require('../../controllers/api/developers.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Developers.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the developers: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Developers.findOne(req.params.id) ;
        item.games = await Developers.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the developer ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
