var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Games = require('../../controllers/api/games.js')
var url = require('url')

const validKeys = ["country", "platform", "genre", "rating", "mode", "format", "publisher", "composer", "designer", "developer", "director", "producer"];

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
    // Filtrar pares da QS que podem ser utilizadas
    var queryData = url.parse(req.url, true).query;
    
    var filtro = Object.entries(queryData)
        .filter(([k, v]) => validKeys.includes(k))

    filtro = Object.assign({}, ...Array.from(filtro, ([k, v]) => ({[k]: v}) ));
    
    if(filtro !== undefined && Object.keys(filtro).length > 0){
        try{
            res.jsonp(await Games.search(filtro))
        } catch(erro){
            res.status(500).send(`Error while searching the Games: ${erro}`)
        }
    } else {
        try{
            res.jsonp(await Games.list())
        } catch(erro){
            res.status(500).send(`Error in the listing of the Games: ${erro}`)
        }
    }
})

router.get('/total', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        let total = await Games.total();
        res.jsonp(total);
    } catch(erro){
        res.status(500).send(`Error while calculating the total of Games: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var game = await Games.findOne(req.params.id) ;
        game.platforms = await Games.availableIn(req.params.id) ;
        game.composers = await Games.composedBy(req.params.id) ;
        game.genres = await Games.definedBy(req.params.id) ;
        game.designers = await Games.designedBy(req.params.id) ;
        game.developers = await Games.developedBy(req.params.id) ;
        game.publishers = await Games.publishedBy(req.params.id) ;
        game.release_countries = await Games.releasedIn(req.params.id) ;
        game.ratings = await Games.restrainedBy(req.params.id) ;
        game.directors = await Games.directedBy(req.params.id) ;
        game.modes = await Games.modes(req.params.id) ;
        game.formats = await Games.formats(req.params.id) ;
        game.producers = await Games.producers(req.params.id) ;
        game.characters = await Games.characters(req.params.id) ;
        res.jsonp(game)
    } catch(erro){
        res.status(500).send(`Error in the getting of the Game ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
