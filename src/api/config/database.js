const ip = process.env.IP || 'localhost'
const port = process.env.PORT || '7779'
module.exports.apiVersion = process.env.API_VERSION || 'v2'

module.exports.onthology = process.env.GRAPHDB ? 'http://' + process.env.GRAPHDB +'/repositories/PRC_Games' : 'http://'+ip+':7200/repositories/PRC_Games'

module.exports.prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX games: <http://joaopimentel/ontologies/2020/3/video_games#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
`

module.exports.host = 'http://'+ip+':'+port

module.exports.swaggerURL = process.env.SWAGGER_URL || this.host 

module.exports.userDB = process.env.MONGODB ? 'mongodb://' + process.env.MONGODB + '/vgdb' : 'mongodb://localhost/vgdb'

module.exports.interfaceHosts = [
    "http://localhost:8080",
]
