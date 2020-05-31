var express = require('express');
var router = express.Router();
var Formats = require('../../controllers/api/formats.js')

router.get('/', async (req, res, next) => {
	try{
        res.jsonp(await Formats.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the formats: ${erro}`)
    }
})

router.get('/:id', async (req, res, next) => {
	try{
        var item = await Formats.findOne(req.params.id) ;
        item.games = await Formats.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the format ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
