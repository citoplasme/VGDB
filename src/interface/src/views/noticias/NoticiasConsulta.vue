<template>
  <v-card class="ma-4">
    <Loading v-if="!noticiaReady" :message="'a new'" />
    <v-card-title v-else class="indigo darken-4 white--text">{{
      this.titulo
    }}</v-card-title>
    <v-card-text>
      <p>{{ this.noticia.data }}</p>
      <p class="text-justify" v-html="compiledMarkdown" />
      <v-spacer />

      <v-row>
        <v-col>
          <v-btn
            class="indigo accent-4 white--text mr-4"
            @click="$router.go(-1)"
            >Back</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import marked from "marked";
import Loading from "@/components/generic/Loading";

export default {
  components: {
    Loading
  },
  data: () => ({
    idNoticia: "",
    noticia: {
      titulo: "",
      data: "",
      desc: ""
    },
    titulo: "",
    noticiaReady: false
  }),
  computed: {
    compiledMarkdown: function() {
      //return marked(this.noticia.desc, { sanitize: true });
      return marked(this.noticia.desc);
    }
  },
  methods: {
    preparaNoticia: async function(not) {
      try {
        var myNoticia = {
          titulo: not.titulo,
          data: not.data,
          desc: not.desc
        };
        return myNoticia;
      } catch (e) {
        return {};
      }
    }
  },
  created: async function() {
    try {
      this.idNoticia = window.location.pathname.split("/")[2];

      // Informações sobre a noticia
      var response = await this.$request("get", "/noticias/" + this.idNoticia);
      this.titulo = response.data.titulo;
      this.noticia = await this.preparaNoticia(response.data);

      this.noticiaReady = true;
    } catch (e) {
      return e;
    }
  }
};
</script>
