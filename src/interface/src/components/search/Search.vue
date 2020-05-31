<template>
  <Loading v-if="!dataReady" :message="'the needed data'" />
  <v-container v-else fluid>
    <v-row row wrap justify-center>
      <v-col>
        <v-card>
          <v-toolbar color="indigo darken-4" dark>
            <v-toolbar-title>Detailed Search</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Country</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.countries"
                  label="Country"
                  v-model="search.country"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Platform</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.platforms"
                  label="Platform"
                  v-model="search.platform"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Genre</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.genres"
                  label="Genre"
                  v-model="search.genre"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Age Rating</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.ratings"
                  label="Age Rating"
                  v-model="search.rating"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Game Mode</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.modes"
                  label="Game Mode"
                  v-model="search.mode"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Format</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.formats"
                  label="Format"
                  v-model="search.format"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Publisher</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.publishers"
                  label="Publisher"
                  v-model="search.publisher"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Composer</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.composers"
                  label="Composer"
                  v-model="search.composer"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Designer</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.designers"
                  label="Designer"
                  v-model="search.designer"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Developer</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.developers"
                  label="Developer"
                  v-model="search.developer"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Director</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.directors"
                  label="Director"
                  v-model="search.director"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Producer</div>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="this.producers"
                  label="Producer"
                  v-model="search.producer"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" dark @click="cancelar">
              Cancel
            </v-btn>
            <v-btn color="indigo darken-4" dark @click="pesquisar">
              Search
            </v-btn>
            <v-btn color="indigo darken-4" dark @click="clear">
              Clear
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="indigo darken-4 white--text" dark>
            Results
            <v-spacer></v-spacer>
            <v-text-field
              v-model="pesquisa"
              append-icon="search"
              label="Filter"
              single-line
              hide-details
              dark
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="results"
              :search="pesquisa"
              class="elevation-1"
              :footer-props="footer_props"
              v-if="this.headers[this.cabecalhos.length - 1]"
            >
              <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning"
                  >No results were found for "{{ pesquisa }}".</v-alert
                >
              </template>

              <template v-slot:item="props">
                <GameListing
                  :item="props.item"
                  @rowClicked="go($event.id)"
                  @iconClicked="
                    switchOperacao($event.operacao.descricao, props.item.id)
                  "
                />
              </template>

              <template v-slot:pageText="props">
                Results: {{ props.pageStart }} - {{ props.pageStop }} of
                {{ props.itemsLength }}
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="indigo darken-4" dark @click="clearResults">
              Clear
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      :top="true"
    >
      {{ text }}
      <v-btn text @click="fecharSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import Loading from "@/components/generic/Loading";
import GameListing from "@/components/games/GameListing.vue";

export default {
  data: () => ({
    countries: [],
    platforms: [],
    publishers: [],
    genres: [],
    ratings: [],
    modes: [],
    formats: [],
    composers: [],
    designers: [],
    developers: [],
    directors: [],
    producers: [],
    dataReady: false,
    search: {
      country: "",
      platform: "",
      genre: "",
      rating: "",
      mode: "",
      format: "",
      publisher: "",
      composer: "",
      designer: "",
      developer: "",
      director: "",
      producer: ""
    },
    results: [],
    footer_props: {
      "items-per-page-options": [10, 20, 100],
      "items-per-page-text": "Show"
    },
    pesquisa: "",
    headers: [],
    cabecalhos: [],
    campos: [],
    snackbar: false,
    text: "",
    color: "",
    timeout: 4000
  }),
  components: {
    Loading,
    GameListing
  },
  methods: {
    cancelar() {
      this.$router.push("/");
    },
    clear() {
      this.search.country = "";
      this.search.platform = "";
      this.search.genre = "";
      this.search.rating = "";
      this.search.mode = "";
      this.search.format = "";
      this.search.publisher = "";
      this.search.composer = "";
      this.search.designer = "";
      this.search.developer = "";
      this.search.director = "";
      this.search.producer = "";
    },
    clearResults() {
      this.results = [];
      this.pesquisa = "";
    },
    pesquisar() {
      // filtrar partes nao nulas do search
      var filtro = Object.entries(this.search).filter(
        ([k, v]) => v !== "" && v !== undefined
      );

      filtro = Object.assign(
        {},
        ...Array.from(filtro, ([k, v]) => ({ [k]: v }))
      );

      // Converter para QS
      var queryString = Object.keys(filtro)
        .map(key => key + "=" + filtro[key])
        .join("&");

      // Pedido
      this.$request("get", "/games?" + queryString)
        .then(res => {
          this.results = res.data;
          this.text = "Search successfully done.";
          this.color = "success";
          this.snackbar = true;
        })
        .catch(e => {
          this.text = e.response.data;
          this.color = "error";
          this.snackbar = true;
        });
    },
    preparaCabecalhos() {
      this.cabecalhos = ["Identifier", "Title"];
      this.campos = ["id", "title"];

      for (let i = 0; i < this.cabecalhos.length; i++) {
        this.headers[i] = {
          text: this.cabecalhos[i],
          value: this.campos[i],
          class: ["table-header", "subtitle-2", "font-weight-bold"]
        };
      }
    },
    preparaCampos: async function(array) {
      try {
        let res = array.map(v => {
          return {
            text: v.name,
            value: v._id
          };
        });
        return res;
      } catch (e) {
        return [];
      }
    },
    go(id) {
      this.$router.push("/games/" + id);
    },
    fecharSnackbar() {
      this.snackbar = false;
    }
  },
  created: async function() {
    this.preparaCabecalhos();

    // Países
    var paises = await this.$request("get", "/countries");
    this.countries = await this.preparaCampos(paises.data);

    // Plataformas
    var plataformas = await this.$request("get", "/platforms");
    this.platforms = await this.preparaCampos(plataformas.data);

    // Publishers
    var publicadores = await this.$request("get", "/publishers");
    this.publishers = await this.preparaCampos(publicadores.data);

    // Genres
    var generos = await this.$request("get", "/genres");
    this.genres = await this.preparaCampos(generos.data);

    // Ratings
    var age = await this.$request("get", "/ratings");
    this.ratings = await this.preparaCampos(age.data);

    // Modes
    var modos = await this.$request("get", "/modes");
    this.modes = await this.preparaCampos(modos.data);

    // Formats
    var formatos = await this.$request("get", "/formats");
    this.formats = await this.preparaCampos(formatos.data);

    // Composers
    var compositores = await this.$request("get", "/composers");
    this.composers = await this.preparaCampos(compositores.data);

    // Designers
    var designer = await this.$request("get", "/designers");
    this.designers = await this.preparaCampos(designer.data);

    // Developers
    var developer = await this.$request("get", "/developers");
    this.developers = await this.preparaCampos(developer.data);

    // Directors
    var diretores = await this.$request("get", "/directors");
    this.directors = await this.preparaCampos(diretores.data);

    // Producers
    var produtores = await this.$request("get", "/producers");
    this.producers = await this.preparaCampos(produtores.data);

    this.dataReady = true;
  }
};
</script>

<style scoped>
.expansion-panel-heading {
  background-color: #283593 !important;
  color: #fff;
  font-size: large;
  font-weight: bold;
}

.card-heading {
  font-size: x-large;
  font-weight: bold;
}

.info-label {
  color: #283593; /* indigo darken-3 */
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e8eaf6; /* indigo lighten-5 */
  font-weight: bold;
  margin: 5px;
  border-radius: 3px;
}
</style>
