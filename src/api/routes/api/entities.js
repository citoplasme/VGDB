var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Entities = require('../../controllers/api/entities.js')
var Directors = require('../../controllers/api/directors.js')
var Composers = require('../../controllers/api/composers.js')
var Designers = require('../../controllers/api/designers.js')
var Developers = require('../../controllers/api/developers.js')
var Producers = require('../../controllers/api/producers.js')
var Publishers = require('../../controllers/api/publishers.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Entities.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the entities: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Entities.findOne(req.params.id) ;  
        item.directed = await Directors.findGames(req.params.id) ;
        item.composed = await Composers.findGames(req.params.id) ;
        item.designed = await Designers.findGames(req.params.id) ;
        item.developed = await Developers.findGames(req.params.id) ;
        item.produced = await Producers.findGames(req.params.id) ;
        item.published = await Publishers.findGames(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the entity ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
