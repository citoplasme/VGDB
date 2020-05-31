<template>
  <Loading v-if="!noticiasReady" :message="'news'" />
  <v-card v-else class="ma-4 pa-2">
    <v-toolbar color="indigo darken-4" dark>
      <v-toolbar-title>News</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel v-for="(n, index) in this.noticias" :key="index">
          <v-expansion-panel-header class="blue lighten-5">
            {{ n.titulo }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>{{ n.data }}</p>
            <p class="text-justify" v-html="compiledMarkdown(n.desc)" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <div>
        <v-btn
          v-for="item in this.fops"
          color="indigo accent-4"
          dark
          class="ma-2"
          @click="go(item.url)"
          :key="item.url"
          >{{ item.label }}</v-btn
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import marked from "marked";
import Loading from "@/components/generic/Loading";

export default {
  props: ["level"],
  data: () => ({
    noticias: [],
    noticiasReady: false,
    publicPath: process.env.BASE_URL,
    operacoes: [
      {
        label: "See More",
        url: "/noticias",
        level: [0, 1, 2, 3, 3.5, 4, 5, 6, 7]
      },
      {
        label: "Add",
        url: "/noticias/criar",
        level: [4, 5, 6, 7]
      }
    ]
  }),
  components: {
    Loading
  },
  methods: {
    go: function(url) {
      if (url.startsWith("http")) {
        window.location.href = url;
      } else {
        this.$router.push(url);
      }
    },
    filtraOps: function(operacoes) {
      var filtered = [];
      for (var i = 0; i < operacoes.length; i++) {
        var levelsSet = new Set();
        operacoes[i].level.forEach(l => levelsSet.add(l));
        var levels = Array.from(levelsSet);
        if (levels.includes(this.level)) {
          filtered.push({
            label: operacoes[i].label,
            url: operacoes[i].url,
            level: operacoes[i].level
          });
        }
      }
      return filtered;
    },
    compiledMarkdown: function(d) {
      return marked(d || "");
    }
  },
  computed: {
    fops: function() {
      return this.filtraOps(this.operacoes);
    }
  },

  created: async function() {
    try {
      let response = await this.$request("get", "/noticias?recentes=sim");

      this.noticias = response.data;

      this.noticiasReady = true;
    } catch (e) {
      return e;
    }
  }
};
</script>
