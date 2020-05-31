var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Directors = require('../../controllers/api/directors.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Directors.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the directors: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Directors.findOne(req.params.id) ;
        item.games = await Directors.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the director ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
