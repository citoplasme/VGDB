var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Designers = require('../../controllers/api/designers.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Designers.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the designers: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Designers.findOne(req.params.id) ;
        item.games = await Designers.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the designer ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
