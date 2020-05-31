var Auth = require('../../controllers/auth.js');
var express = require('express');
var router = express.Router();
var Brands = require('../../controllers/api/brands.js')

router.get('/', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        res.jsonp(await Brands.list())
    } catch(erro){
        res.status(500).send(`Error in the listing of the brands: ${erro}`)
    }
})

router.get('/:id', Auth.isLoggedInKey, async (req, res, next) => {
	try{
        var item = await Brands.findOne(req.params.id) ;
        item.platforms = await Brands.findPlatforms(req.params.id) ;
        res.jsonp(item)
    } catch(erro){
        res.status(500).send(`Error in the getting of the brand ${req.params.id}: ${erro}`)
    }
})

module.exports = router;
