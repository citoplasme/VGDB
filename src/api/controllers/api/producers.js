const execQuery = require('../../controllers/api/utils').execQuery
const normalize = require('../../controllers/api/utils').normalize
const Producers = module.exports

Producers.list = () => {
    const query = `select distinct ?id ?name where{
        ?g rdf:type games:Producer .
        ?g games:name ?name .
    	bind(strafter(str(?g), 'video_games#') as ?id) .
    }`;
	return execQuery('query', query).then((response) => normalize(response));
}

Producers.findOne = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Producer .
        games:${id} games:name ?name .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)[0]
}

Producers.findGames = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Producer .
        ?i rdf:type games:VideoGame .
    	?i games:producedby games:${id} .
    	?i games:title ?name .
    	bind(strafter(str(?i), 'video_games#') as ?id) .
    } order by asc (?name)`;
    const response = await execQuery('query', query)
    return normalize(response)
}