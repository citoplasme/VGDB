var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Publishers = require('../../controllers/api/publishers.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Publishers.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the publishers: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Publishers.findOne(req.params.id) ;
        item.games = await Publishers.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the publisher ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
