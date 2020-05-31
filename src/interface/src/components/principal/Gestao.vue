<template>
  <v-card class="ma-4 pa-2">
    <v-toolbar :color="panelHeaderColor" dark>
      <v-toolbar-title>Platform Management</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in fops" :key="i">
          <v-expansion-panel-header>{{
            item.entidade
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-text>
              <p>{{ item.texto }}</p>
              <div>
                <v-btn
                  v-for="op in item.ops"
                  color="indigo accent-4"
                  dark
                  class="ma-2"
                  @click="go(op.url)"
                  :key="op.url"
                >
                  {{ op.label }}
                </v-btn>
              </div>
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["level"],
  methods: {
    go: function(url) {
      this.$router.push(url);
    },

    filtraOps: function(operacoes) {
      var filtered = [];
      for (var i = 0; i < operacoes.length; i++) {
        var levelsSet = new Set();
        operacoes[i].ops.forEach(b => b.level.forEach(l => levelsSet.add(l)));
        var levels = Array.from(levelsSet);

        if (levels.includes(this.level)) {
          filtered.push({
            entidade: operacoes[i].entidade,
            html: operacoes[i].html,
            texto: operacoes[i].texto,
            ops: operacoes[i].ops.filter(o => o.level.includes(this.level))
          });
        }
      }
      return filtered;
    }
  },

  computed: {
    fops: function() {
      return this.filtraOps(this.operacoes);
    }
  },

  data() {
    return {
      panelHeaderColor: "indigo darken-4",
      operacoes: [
        {
          entidade: "Users",
          texto: "",
          ops: [
            {
              label: "View Users",
              url: "/users/listagem",
              level: [5, 6, 7]
            },
            {
              label: "Access Log",
              url: "/users/registoAcesso",
              level: [6, 7]
            }
          ]
        },
        {
          entidade: "Metrics",
          texto: "",
          ops: [
            {
              label: "View Metrics",
              url: "/gestao/metrica",
              level: [6, 7]
            }
          ]
        },
        {
          entidade: "API Keys",
          texto: "",
          ops: [
            {
              label: "View API Keys",
              url: "/gestao/api/listagem",
              level: [7]
            }
          ]
        }
      ]
    };
  }
};
</script>
