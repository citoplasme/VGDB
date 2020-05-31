<template>
  <div>
    <Loading v-if="!gamesReady" :message="'brands'" />
    <v-card v-else class="ma-8">
      <v-card-title class="indigo darken-4 white--text" dark>
        {{ tipo }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
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
          :items="games"
          :search="search"
          class="elevation-1"
          :footer-props="footer_props"
          v-if="this.headers[this.cabecalhos.length - 1]"
        >
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning"
              >No results were found for "{{ search }}".</v-alert
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
      <!--v-dialog :value="eliminarId != ''" persistent max-width="290px">
        <v-card>
          <v-card-title class="headline">Confirmar ação</v-card-title>
          <v-card-text>
            Tem a certeza que pretende eliminar a notícia?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="eliminarId = ''">
              Cancelar
            </v-btn>
            <v-btn color="primary" text @click="remover(eliminarId)">
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog-->
      <v-snackbar
        v-model="snackbar"
        :color="color"
        :timeout="timeout"
        :top="true"
      >
        {{ text }}
        <v-btn text @click="fecharSnackbar">Close</v-btn>
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import Loading from "@/components/generic/Loading";
import GameListing from "@/components/brands/BrandListing.vue";
import { NIVEL_MINIMO_ALTERAR } from "@/utils/consts";

export default {
  data: () => ({
    tipo: "Brands",
    games: [],
    campos: [],
    cabecalhos: [],
    operacoes: [],
    gamesReady: false,
    search: "",
    headers: [],
    dialog: false,
    footer_props: {
      "items-per-page-options": [10, 20, 100],
      "items-per-page-text": "Show"
    },
    snackbar: false,
    text: "",
    color: "",
    timeout: 4000,
    eliminarId: "",
    done: false
  }),

  components: {
    Loading,
    GameListing
  },

  methods: {
    preparaOperacoes(level) {
      if (level >= NIVEL_MINIMO_ALTERAR) {
        /*
        this.operacoes = [
          { icon: "edit", descricao: "Alteração", cor: "indigo darken-2" },
          { icon: "delete", descricao: "Remoção", cor: "red" }
        ];
        */
      }
    },

    preparaCabecalhos(level) {
      if (level >= NIVEL_MINIMO_ALTERAR) {
        this.cabecalhos = ["Identifier", "Name"];
        this.campos = ["id", "name"];
        /*
        this.cabecalhos = ["Identifier", "Name", "Options"];
        this.campos = ["id", "name", "options"];
        */
      } else {
        this.cabecalhos = ["Identifier", "Name"];
        this.campos = ["id", "name"];
      }

      for (let i = 0; i < this.cabecalhos.length; i++) {
        if (this.campos[i] === "operacoes")
          this.headers[i] = {
            text: this.cabecalhos[i],
            value: this.campos[i],
            align: "end",
            width: "10%",
            class: ["table-header", "subtitle-2", "font-weight-bold"]
          };
        else
          this.headers[i] = {
            text: this.cabecalhos[i],
            value: this.campos[i],
            class: ["table-header", "subtitle-2", "font-weight-bold"]
          };
      }
    },

    preparaLista(level, listaNoticias) {
      let myTree = [];

      if (this.operacoes.length != 0) {
        for (let i = 0; i < listaNoticias.length; i++) {
          if (level >= NIVEL_MINIMO_ALTERAR) {
            myTree.push({
              id: listaNoticias[i].id,
              name: listaNoticias[i].name,
              operacoes: this.operacoes
            });
          } else {
            myTree.push({
              id: listaNoticias[i].id,
              name: listaNoticias[i].name,
              operacoes: this.operacoes
            });
          }
        }
      } else {
        for (let i = 0; i < listaNoticias.length; i++) {
          myTree.push({
            id: listaNoticias[i].id,
            name: listaNoticias[i].name
          });
        }
      }
      return myTree;
    },

    go(id) {
      this.$router.push("/brands/" + id);
    },

    goEditar(id) {
      this.$router.push("/brands/editar/" + id);
    },

    remover(id) {
      this.$request("delete", "/brands/" + id)
        .then(res => {
          this.text = res.data;
          this.color = "success";
          this.snackbar = true;
          this.eliminarId = "";
          this.done = true;
          this.getPlatforms();
        })
        .catch(e => {
          this.text = e.response.data;
          this.color = "error";
          this.snackbar = true;
          this.eliminarId = "";
          this.done = false;
        });
    },

    async switchOperacao(op, id) {
      switch (op) {
        case "Alteração":
          this.goEditar(id);
          break;

        case "Remoção":
          this.eliminarId = id;
          break;

        default:
          break;
      }
    },

    fecharSnackbar() {
      this.snackbar = false;
      if (this.done == true) this.getPlatforms();
    },

    async getPlatforms() {
      try {
        let response = await this.$request("get", "/brands");

        this.games = await this.preparaLista(level, response.data);

        this.gamesReady = true;
      } catch (e) {
        return e;
      }
    }
  },

  created: async function() {
    try {
      let response = await this.$request("get", "/brands");

      let level = await this.$userLevel(this.$store.state.token);

      this.preparaCabecalhos(level);

      this.preparaOperacoes(level);

      this.games = await this.preparaLista(level, response.data);

      this.gamesReady = true;
    } catch (e) {
      return e;
    }
  }
};
</script>
