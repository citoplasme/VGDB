import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Principal.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes das notícias
    {
      path: "/noticias",
      name: "noticias",
      component: () => import("./views/noticias/Noticias.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/noticias/criar",
      name: "criaNoticia",
      component: () => import("./views/noticias/NoticiasCria.vue"),
      meta: { levels: [4, 5, 6, 7] }
    },
    {
      path: "/noticias/editar/:idNoticia",
      name: "editaNoticia",
      component: () => import("./views/noticias/NoticiasEdita.vue"),
      meta: { levels: [4, 5, 6, 7] }
    },
    {
      path: "/noticias/:idNoticia",
      name: "consultaNoticia",
      component: () => import("./views/noticias/NoticiasConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos jogos
    {
      path: "/games",
      name: "games",
      component: () => import("./views/games/Games.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/games/:idGame",
      name: "viewGame",
      component: () => import("./views/games/GamesConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes das plataformas
    {
      path: "/platforms",
      name: "platforms",
      component: () => import("./views/platforms/Platforms.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/platforms/:id",
      name: "viewPlaform",
      component: () => import("./views/platforms/PlatformsConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos publishers
    {
      path: "/publishers",
      name: "publishers",
      component: () => import("./views/publishers/Publishers.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/publishers/:id",
      name: "viewPublisher",
      component: () => import("./views/publishers/PublishersConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos generos
    {
      path: "/genres",
      name: "genres",
      component: () => import("./views/genres/Genres.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/genres/:id",
      name: "viewGenre",
      component: () => import("./views/genres/GenresConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos paises
    {
      path: "/countries",
      name: "countries",
      component: () => import("./views/countries/Countries.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/countries/:id",
      name: "viewCountry",
      component: () => import("./views/countries/CountriesConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos ratings
    {
      path: "/ratings",
      name: "ratings",
      component: () => import("./views/ratings/Ratings.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/ratings/:id",
      name: "viewRating",
      component: () => import("./views/ratings/RatingsConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos game modes
    {
      path: "/modes",
      name: "modes",
      component: () => import("./views/modes/Modes.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/modes/:id",
      name: "viewMode",
      component: () => import("./views/modes/ModesConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos formats
    {
      path: "/formats",
      name: "formats",
      component: () => import("./views/formats/Formats.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/formats/:id",
      name: "viewFormat",
      component: () => import("./views/formats/FormatsConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos characters
    {
      path: "/characters",
      name: "characters",
      component: () => import("./views/characters/Characters.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/characters/:id",
      name: "viewCharacter",
      component: () => import("./views/characters/CharactersConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos composers
    {
      path: "/composers",
      name: "composers",
      component: () => import("./views/composers/Composers.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/composers/:id",
      name: "viewComposer",
      component: () => import("./views/composers/ComposersConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos designers
    {
      path: "/designers",
      name: "designers",
      component: () => import("./views/designers/Designers.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/designers/:id",
      name: "viewDesigner",
      component: () => import("./views/designers/DesignersConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos developers
    {
      path: "/developers",
      name: "developers",
      component: () => import("./views/developers/Developers.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/developers/:id",
      name: "viewDeveloper",
      component: () => import("./views/developers/DevelopersConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos directors
    {
      path: "/directors",
      name: "directors",
      component: () => import("./views/directors/Directors.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/directors/:id",
      name: "viewDirector",
      component: () => import("./views/directors/DirectorsConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes dos producers
    {
      path: "/producers",
      name: "producers",
      component: () => import("./views/producers/Producers.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/producers/:id",
      name: "viewProducer",
      component: () => import("./views/producers/ProducersConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes das brands
    {
      path: "/brands",
      name: "brands",
      component: () => import("./views/brands/Brands.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/brands/:id",
      name: "viewBrand",
      component: () => import("./views/brands/BrandsConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes das entidades
    {
      path: "/entities",
      name: "entities",
      component: () => import("./views/entities/Entities.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/entities/:id",
      name: "viewEntity",
      component: () => import("./views/entities/EntityConsulta.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Route para acesso aos favoritos
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("./views/favorites/Favorites.vue"),
      meta: { levels: [1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    // Routes da gestão de utilizadores
    {
      path: "/users/autenticacao",
      name: "autenticacao",
      component: () => import("./views/users/Autenticacao.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/users/registo",
      name: "registo",
      component: () => import("./views/users/Registo.vue"),
      meta: { levels: [0] }
    },
    {
      path: "/users/login",
      name: "login",
      component: () => import("./views/users/Login.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/users/recuperacao",
      name: "recuperacao",
      component: () => import("./views/users/Recuperacao.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/users/alteracaoPassword",
      name: "alteracaoPassword",
      component: () => import("./views/users/AlteracaoPassword.vue"),
      meta: { levels: [1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/users/alteracaoPasswordRecuperacao",
      name: "alteracaoPasswordRecuperacao",
      component: () => import("./views/users/AlteracaoPasswordRecuperacao.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/users/listagem",
      name: "listagem",
      component: () => import("./views/users/ListagemUsers.vue"),
      meta: { levels: [5, 6, 7] }
    },
    {
      path: "/users/registoAcesso",
      name: "registoDeAcesso",
      component: () => import("./views/users/RegistoAcesso.vue"),
      meta: { levels: [6, 7] }
    },
    //Métricas
    {
      path: "/gestao/metrica",
      name: "metrica",
      component: () => import("./views/gestao/Metrica.vue"),
      meta: { levels: [6, 7] }
    },
    //Chaves API
    {
      path: "/gestao/api/listagem",
      name: "listagemApi",
      component: () => import("./views/gestao/api/ListagemChavesApi.vue"),
      meta: { levels: [7] }
    },
    {
      path: "/gestao/api/registo",
      name: "registoApi",
      component: () => import("./views/gestao/api/RegistoChaveApi.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    {
      path: "/gestao/api/renovar",
      name: "renovarApi",
      component: () => import("./views/gestao/api/RenovarChaveApi.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    },
    //Pesquisa
    {
      path: "/search",
      name: "pesquisa",
      component: () => import("./views/search/Search.vue"),
      meta: { levels: [0, 1, 2, 3, 3.5, 4, 5, 6, 7] }
    }
  ]
});
