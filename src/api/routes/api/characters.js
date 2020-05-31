var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Characters = require('../../controllers/api/characters.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Characters.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the characters: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Characters.findOne(req.params.id) ;
        item.games = await Characters.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the character ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
