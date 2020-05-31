const execQuery = require('../../controllers/api/utils').execQuery
const normalize = require('../../controllers/api/utils').normalize
const Countries = module.exports

Countries.list = () => {
    const query = `select distinct ?id ?name where{
        ?g rdf:type games:Country .
        ?g games:name ?name .
    	bind(strafter(str(?g), 'video_games#') as ?id) .
    }`;
	return execQuery('query', query).then((response) => normalize(response));
}

Countries.findOne = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Country .
        games:${id} games:name ?name .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)[0]
}

Countries.findGames = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Country .
        ?i rdf:type games:VideoGame .
    	?i games:releasedin games:${id} .
    	?i games:title ?name .
    	bind(strafter(str(?i), 'video_games#') as ?id) .
    } order by asc (?name)`;
    const response = await execQuery('query', query)
    return normalize(response)
}