var axios = require("axios");
const lhost = require("@/config/global").host;

async function getCLAVToken(store) {
  var apikey;

  try {
    var response = await axios.get(lhost + "/chaves/vgdbToken");
    apikey = response.data.token;

    store.commit("guardaTokenCLAV", apikey);
    store.commit("guardaExpTokenCLAV", response.data.exp);
  } catch (erro) {
    apikey = "";
  }

  return apikey;
}

async function getAuthToken(store) {
  var auth = "";

  if (store.state.token != "") {
    auth = "token " + store.state.token;
  } else {
    var apikey;

    if (store.state.clavToken != "") {
      var expDate = new Date(store.state.expClavToken * 1000);
      var atualDate = new Date();

      //verifica se o token ainda não expirou
      if (expDate.getTime() >= atualDate.getTime()) {
        apikey = store.state.clavToken;
      } else {
        apikey = await getCLAVToken(store);
      }
    } else {
      apikey = await getCLAVToken(store);
    }
    auth = "apikey " + apikey;
  }

  return auth;
}

function parseError(erro, path, store, router) {
  if (erro.response && erro.response.status) {
    var httpStatus = erro.response.status;

    if (httpStatus == 401 && path != "/users/login") {
      store.commit("guardaTokenUtilizador", "");
      store.commit("guardaNomeUtilizador", "");
      store.commit("guardaTokenCLAV", "");
      store.commit("guardaExpTokenCLAV", "");

      router.push(
        "/users/autenticacao?erro=" +
          encodeURIComponent("Your session has expired. Please log in again.")
      );
    } else if (httpStatus == 403) {
      router.push(
        "/?erro=" +
          encodeURIComponent(
            "You do not have enough permissions to place your order."
          )
      );
    } else {
      throw erro;
    }
  } else {
    throw erro;
  }
}

async function exec(type, path, data, config, store, router) {
  config = config || null;
  data = data || null;
  var authToken = await getAuthToken(store);
  var url = lhost + path;

  if (config == null) {
    config = { headers: { Authorization: authToken } };
  } else {
    if (config.headers) {
      config.headers.Authorization = authToken;
    } else {
      config.headers = { Authorization: authToken };
    }
  }

  try {
    switch (type) {
      case "get":
        return await axios.get(url, config);
      case "post":
        return await axios.post(url, data, config);
      case "put":
        return await axios.put(url, data, config);
      case "delete":
        return await axios.delete(url, config);
      default:
        throw "Wrong REST method or not supported!";
    }
  } catch (erro) {
    parseError(erro, path, store, router);
  }
}

const request = {
  install(Vue) {
    Vue.prototype.$request = async function(type, path, data, config) {
      return await exec(type, path, data, config, this.$store, this.$router);
    };
    Vue.prototype.$getAuthToken = async function() {
      return await getAuthToken(this.$store);
    };
  }
};

export default request;
