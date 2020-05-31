const execQuery = require('../../controllers/api/utils').execQuery
const normalize = require('../../controllers/api/utils').normalize
const Games = module.exports

Games.list = () => {
    const query = `select distinct ?id ?title where{
        ?g rdf:type games:VideoGame .
        ?g games:title ?title .
    	bind(strafter(str(?g), 'video_games#') as ?id) .
    }`;
	return execQuery('query', query).then((response) => normalize(response));
}

Games.search = (filtro) => {
    const query = `select distinct ?id ?title where{
        ?g rdf:type games:VideoGame .
        ?g games:title ?title .
        bind(strafter(str(?g), 'video_games#') as ?id) .
        ${filtro.country !== undefined ? `?g games:releasedin/games:name "${filtro.country}" .` : "" }
        ${filtro.platform !== undefined ? `?g games:availablein/games:name "${filtro.platform}" .` : "" }
        ${filtro.genre !== undefined ? `?g games:isdefinedby/games:name "${filtro.genre}" .` : "" }
        ${filtro.rating !== undefined ? `?g games:restrainedby/games:name "${filtro.rating}" .` : "" }
        ${filtro.mode !== undefined ? `?g games:allows/games:name "${filtro.mode}" .` : "" }
        ${filtro.format !== undefined ? `?g games:playablein/games:name "${filtro.format}" .` : "" }    
        ${filtro.publisher !== undefined ? `?g games:publishedby/games:name "${filtro.publisher}" .` : "" }
        ${filtro.composer !== undefined ? `?g games:composedby/games:name "${filtro.composer}" .` : "" }
        ${filtro.designer !== undefined ? `?g games:designedby/games:name "${filtro.designer}" .` : "" }
        ${filtro.developer !== undefined ? `?g games:developedby/games:name "${filtro.developer}" .` : "" }
        ${filtro.director !== undefined ? `?g games:directedby/games:name "${filtro.director}" .` : "" }
        ${filtro.producer !== undefined ? `?g games:producedby/games:name "${filtro.producer}" .` : "" }
    }`;
    return execQuery('query', query).then((response) => normalize(response));
}

Games.findOne = async (id) => {
    const query = `select ?title ?logo where{
        games:${id} rdf:type games:VideoGame .
        games:${id} games:title ?title .
        optional { games:${id} games:logo ?logo . }
    }`;
    const response = await execQuery('query', query)
    return normalize(response)[0]
}

Games.availableIn = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:availablein ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.composedBy = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:composedby ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.definedBy = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:isdefinedby ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.designedBy = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:designedby ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.developedBy = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:developedby ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.publishedBy = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:publishedby ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.releasedIn = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:releasedin ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.restrainedBy = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:restrainedby ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.directedBy = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:directedBy ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.modes = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:allows ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.formats = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:playablein ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.producers = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:producedby ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.characters = async (id) => {
    const query = `select ?id ?name where{
        games:${id} a games:VideoGame .
        games:${id} games:contains ?i .
        ?i games:name ?name .
        bind(strafter(str(?i), 'video_games#') as ?id) .
    }`;
    const response = await execQuery('query', query)
    return normalize(response)
}

Games.total = () => {
    const query = `select (count(distinct ?game) as ?total) where { 
        ?game a games:VideoGame .
    }`;
    return execQuery('query', query).then((response) => normalize(response)[0]);
}