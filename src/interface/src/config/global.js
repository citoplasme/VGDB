const dominioDefault = "http://localhost:7779";

const dominio = process.env.API_URL || dominioDefault;
const apiVersion = process.env.API_VERSION || "v2";

module.exports.host = dominio + "/" + apiVersion;
