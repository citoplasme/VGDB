<template>
  <div>
    <Loading v-if="!dadosReady" :message="'new'" />
    <EditaNoticia v-else :t="noticia" />
  </div>
</template>

<script>
import EditaNoticia from "@/components/noticias/EditaNoticia.vue";
import Loading from "@/components/generic/Loading";

export default {
  components: {
    EditaNoticia,
    Loading
  },

  data: () => ({
    noticia: {},
    dadosReady: false
  }),

  methods: {
    preparaNoticia: async function(not) {
      try {
        let myNoticia = {
          titulo: not.titulo,
          data: not.data,
          desc: not.desc,
          ativa: not.ativa
        };
        return myNoticia;
      } catch (e) {
        return {};
      }
    }
  },

  created: async function() {
    try {
      let idNoticia = this.$route.path.split("/")[3];

      let infoNoticia = await this.$request("get", "/noticias/" + idNoticia);

      this.noticia = await this.preparaNoticia(infoNoticia.data);

      this.dadosReady = true;
    } catch (e) {
      return e;
    }
  }
};
</script>
