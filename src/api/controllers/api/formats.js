const execQuery = require('../../controllers/api/utils').execQuery
const normalize = require('../../controllers/api/utils').normalize
const Formats = module.exports

Formats.list = () => {
    const query = `select distinct ?id ?name where{
        ?g rdf:type games:Format .
        ?g games:name ?name .
    	bind(strafter(str(?g), 'video_games#') as ?id) .
    }`;
	return execQuery('query', query).then((response) => normalize(response));
}

Formats.findOne = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Format .
        games:${id} games:name ?name .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)[0]
}

Formats.findGames = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Format .
        ?i rdf:type games:VideoGame .
    	?i games:playablein games:${id} .
    	?i games:title ?name .
    	bind(strafter(str(?i), 'video_games#') as ?id) .
    } order by asc (?name)`;
    const response = await execQuery('query', query)
    return normalize(response)
}