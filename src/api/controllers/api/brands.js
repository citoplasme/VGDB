const execQuery = require('../../controllers/api/utils').execQuery
const normalize = require('../../controllers/api/utils').normalize
const Brands = module.exports

Brands.list = () => {
    const query = `select distinct ?id ?name where{
        ?g rdf:type games:Brand .
        ?g games:name ?name .
    	bind(strafter(str(?g), 'video_games#') as ?id) .
    }`;
	return execQuery('query', query).then((response) => normalize(response));
}

Brands.findOne = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Brand .
        games:${id} games:name ?name .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)[0]
}

Brands.findPlatforms = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Brand .
        games:${id} games:owns ?i .
    	?i games:name ?name .
    	bind(strafter(str(?i), 'video_games#') as ?id) .
    } order by asc (?name)`;
    const response = await execQuery('query', query)
    return normalize(response)
}