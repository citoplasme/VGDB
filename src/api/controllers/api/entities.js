const execQuery = require('../../controllers/api/utils').execQuery
const normalize = require('../../controllers/api/utils').normalize
const Entities = module.exports

Entities.list = () => {
    const query = `select distinct ?id ?name where{
        ?g rdf:type games:Entity .
        ?g games:name ?name .
    	bind(strafter(str(?g), 'video_games#') as ?id) .
    }`;
	return execQuery('query', query).then((response) => normalize(response));
}

Entities.findOne = async (id) => {
    const query = `select ?id ?name where{
        games:${id} rdf:type games:Entity .
        games:${id} games:name ?name .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)[0]
}
