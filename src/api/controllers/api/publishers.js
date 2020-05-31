const execQuery = require('../../controllers/api/utils').execQuery
const normalize = require('../../controllers/api/utils').normalize
const Publishers = module.exports

Publishers.list = () => {
    const query = `select distinct ?id ?name where{
        ?g rdf:type games:Publisher .
        ?g games:name ?name .
    	bind(strafter(str(?g), 'video_games#') as ?id) .
    }`;
	return execQuery('query', query).then((response) => normalize(response));
}

Publishers.findOne = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Publisher .
        games:${id} games:name ?name .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)[0]
}

Publishers.findGames = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Publisher .
        ?i rdf:type games:VideoGame .
    	?i games:publishedby games:${id} .
    	?i games:title ?name .
    	bind(strafter(str(?i), 'video_games#') as ?id) .
    } order by asc (?name)`;
    const response = await execQuery('query', query)
    return normalize(response)
}