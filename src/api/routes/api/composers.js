var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Composers = require('../../controllers/api/composers.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Composers.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the composers: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Composers.findOne(req.params.id) ;
        item.games = await Composers.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the composer ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
