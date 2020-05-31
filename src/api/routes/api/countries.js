var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Countries = require('../../controllers/api/countries.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Countries.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the countries: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Countries.findOne(req.params.id) ;
        item.games = await Countries.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the country ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
