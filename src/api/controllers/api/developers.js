const execQuery = require('../../controllers/api/utils').execQuery
const normalize = require('../../controllers/api/utils').normalize
const Developers = module.exports

Developers.list = () => {
    const query = `select distinct ?id ?name where{
        ?g rdf:type games:Developer .
        ?g games:name ?name .
    	bind(strafter(str(?g), 'video_games#') as ?id) .
    }`;
	return execQuery('query', query).then((response) => normalize(response));
}

Developers.findOne = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Developer .
        games:${id} games:name ?name .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)[0]
}

Developers.findGames = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Developer .
        ?i rdf:type games:VideoGame .
    	?i games:developedby games:${id} .
    	?i games:title ?name .
    	bind(strafter(str(?i), 'video_games#') as ?id) .
    } order by asc (?name)`;
    const response = await execQuery('query', query)
    return normalize(response)
}