<template>
  <v-row class="ma-1">
    <v-col>
      <v-card>
        <!-- Header -->
        <v-app-bar color="indigo darken-3" dark>
          <v-toolbar-title class="card-heading">New News</v-toolbar-title>
        </v-app-bar>

        <!-- Content -->
        <v-card-text>
          <v-row>
            <v-col cols="2">
              <div class="info-label">Visible</div>
            </v-col>
            <v-col>
              <v-radio-group v-model="noticia.ativa" row>
                <v-radio label="Yes" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <div class="info-label">Title</div>
            </v-col>
            <v-col>
              <v-text-field
                solo
                clearable
                color="indigo"
                counter="150"
                single-line
                v-model="noticia.titulo"
                maxlength="150"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <div class="info-label">Date</div>
            </v-col>
            <v-col>
              <v-menu
                ref="open"
                v-model="open"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    solo
                    v-model="noticia.data"
                    hint="AAAA-MM-DD"
                    persistent-hint
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                    :rules="regraData"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="open = false"
                  :max="dateCurrent"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <div class="info-label">Description</div>
            </v-col>
            <Editor v-model="noticia.desc"></Editor>
          </v-row>
        </v-card-text>
        <!-- Painel Operações -->
        <PainelOpsNot :t="noticia" :acao="'Criação'" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import marked from "marked";
import PainelOpsNot from "@/components/noticias/PainelOperacoesNoticias.vue";
import Editor from "@/components/generic/EditorMarkdown.vue";

export default {
  data: nt => ({
    noticia: {
      titulo: "",
      data: "",
      desc: "",
      ativa: false
    },
    dateCurrent: new Date().toISOString().substr(0, 10),
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: nt.formatDate(new Date().toISOString().substr(0, 10)),
    regraData: [
      v =>
        /[0-9]+-[0-9]+-[0-9]+/.test(v) || "This field is in the wrong format."
    ],
    open: false,
    snackbar: false,
    text: ""
  }),

  components: {
    PainelOpsNot,
    Editor
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  watch: {
    date(val) {
      this.noticia.data = this.formatDate(this.date);
    }
  },

  methods: {
    // vuetify datepicker
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${year}-${month}-${day}`;
    },

    parseDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // fechar o snackbar em caso de erro
    fecharSnackbar() {
      this.snackbar = false;
    }
  },
  created: function() {
    this.noticia.data = this.dateFormatted;
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
