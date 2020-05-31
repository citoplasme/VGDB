<template>
  <v-row>
    <v-col>
      <Info />
      <Operacoes />
    </v-col>

    <v-col>
      <Noticias :level="level" />
      <Pesquisa />
      <Gestao v-if="level > 0" :level="level" />
    </v-col>
  </v-row>
</template>

<script>
import Info from "@/components/principal/Info.vue";
import Noticias from "@/components/principal/Noticias.vue";
import Gestao from "@/components/principal/Gestao.vue";
import Operacoes from "@/components/principal/Operacoes.vue";
import Pesquisa from "@/components/principal/Pesquisa.vue";

export default {
  components: {
    Info,
    Noticias,
    Gestao,
    Operacoes,
    Pesquisa
  },

  methods: {
    go: function(url) {
      this.$router.push(url);
    }
  },
  data() {
    return {
      panelHeaderColor: "indigo accent-4",
      level: 0
    };
  },
  mounted: async function() {
    this.level = await this.$userLevel(this.$store.state.token);
  }
};
</script>
