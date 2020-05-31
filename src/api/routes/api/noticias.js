var Auth = require('../../controllers/auth.js');
var Noticias = require('../../controllers/api/noticias.js')
var url = require('url')

var express = require('express')
var router = express.Router()

// Lista todas as noticias: data, titulo, desc
router.get('/', Auth.isLoggedInKey, (req, res) => {
    var validKeys = ["titulo", "desc", "data", "ativa"];
    var queryData = url.parse(req.url, true).query;
    
    var filtro = Object.entries(queryData)
        .filter(([k, v]) => v !== undefined && validKeys.includes(k))

    filtro = Object.assign({}, ...Array.from(filtro, ([k, v]) => ({[k]: v}) ));
    
    // api/noticias?recentes=sim
    if (queryData.recentes && queryData.recentes == 'sim') {
        Noticias.recentes()
            .then(dados => res.jsonp(dados))
		    .catch(erro => res.status(500).send(`Error in the listing of recent news: ${erro}`))
	} else {
        Noticias.listar(filtro)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).send(`Error in the listing of news: ${erro}`))
    }
})

// Consulta de uma noticia: titulo, data, desc
router.get('/:id', Auth.isLoggedInKey, (req, res) => {
    Noticias.consultar(req.params.id)
        .then(dados => dados ? res.jsonp(dados) : res.status(404).send(`Error: The news '${req.params.id}' does not exist.`))
	    .catch(erro => res.status(500).send(`Error in the getting of the news '${req.params.id}': ${erro}`))
})

// Update de uma Noticia
router.put('/:id', Auth.isLoggedInUser, Auth.checkLevel([4, 5, 6, 7]), (req, res) => {
    var titulo = req.body.titulo
    var desc = req.body.desc
    var ativa = req.body.ativa
    var data = req.body.data
    if(typeof titulo !== "undefined" && typeof desc !== "undefined" && typeof ativa !== "undefined" && typeof data !== "undefined")
        Noticias.update(req.params.id,titulo,desc,data, ativa)
            .then(dados => {
                if(dados) res.jsonp("News modified with success.")
                else res.status(404).jsonp("Error in the update of the news "+req.params.id)
            })
            .catch(erro => res.status(404).jsonp("Error in the update of the news "+req.params.id+": " + erro))    
    else res.status(404).jsonp("Error in the update of the news "+req.params.id+": missing fields.")
})

// Adiciona uma noticia
router.post('/', Auth.isLoggedInUser, Auth.checkLevel([4, 5, 6, 7]), (req, res) => {
    var titulo = req.body.titulo
    var desc = req.body.desc
    var data = req.body.data
    var ativa = req.body.ativa
    if(typeof titulo !== "undefined" && typeof desc !== "undefined" && typeof data !== "undefined" && typeof ativa !== "undefined") {
        Noticias.criar({titulo,data, desc, ativa})
            .then(dados => {
                if(dados) res.jsonp("News created with success.")
                else res.status(404).jsonp("Error in the creation of the news " + req.body.titulo)
            })
            .catch(erro => res.status(404).jsonp("Error in the creation of the news "+req.body.titulo+": " + erro))
    } else res.status(404).jsonp("Error in the creation of the news: missing fields.")
})

router.delete('/:id', Auth.isLoggedInUser, Auth.checkLevel([4, 5, 6, 7]), async function(req, res) {
    Noticias.eliminar(req.params.id, function(err, user){
        if(err){
            res.status(500).send("Error while deleting the news.");
        }else{
            res.send('News deleted with success.');
        }
    })
});

module.exports = router;
