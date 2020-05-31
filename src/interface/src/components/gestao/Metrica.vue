<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex
        md3
        sm6
        xs12
        full
        v-for="(stat, index) in stats"
        v-bind:key="index"
      >
        <v-card :class="stat.bgColor" dark>
          <v-container fluid grid-list-sm dark>
            <v-layout class="mt-0 mb-0 mx-0" row wrap>
              <v-flex sm3 hidden-xs-only>
                <v-icon class="mx-0" x-large dark>{{ stat.icon }}</v-icon>
              </v-flex>
              <v-flex sm9 xs12>
                <v-layout class="mt-0 mb-0 pa-0" row wrap>
                  <v-flex d-flex xs12>
                    <div class="silver--text subheading">{{ stat.title }}</div>
                  </v-flex>
                  <v-flex d-flex xs12 class="mx-4">
                    <div class="silver--text display-1">{{ stat.data }}</div>
                    &nbsp;&nbsp;
                    <v-btn
                      outlined
                      class="darkgrey--text darken-1"
                      v-if="stat.action.label.length > 0"
                      right
                      text
                      small
                      @click="go(stat.action.link)"
                    >
                      {{ stat.action.label }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="" row wrap>
      <v-flex md6 xs12>
        <v-card light>
          <doughnut></doughnut>
        </v-card>
      </v-flex>
      <v-flex md6 xs12>
        <v-card light>
          <bar></bar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Bar from "./chart/Bar";
import Doughnut from "./chart/Doughnut";
import LineChart from "./chart/LineChart";

export default {
  name: "Dashboard",
  components: {
    Bar,
    Doughnut //,
    //LineChart
  },
  data() {
    return {
      stats: []
    };
  },
  mounted() {
    this.getNumeroUtilizadores();
    this.getApiCalls();
    this.getNumeroChavesApi();
    this.getNumeroGames();
  },
  methods: {
    async getNumeroGames() {
      await this.$request("get", "/games/total")
        .then(res => {
          this.stats.push({
            bgColor: "primary",
            icon: "gamepad",
            title: "Games",
            data: res.data.total,
            action: {
              label: "See",
              link: "/games"
            }
          });
        })
        .catch(error => alert(error));
    },
    async getNumeroUtilizadores() {
      await this.$request("get", "/users")
        .then(res => {
          this.numeroUtilizadores = res.data.length;
          this.stats.push({
            bgColor: "primary",
            icon: "person",
            title: "Users",
            data: res.data.length,
            action: {
              label: "See",
              link: "/users/listagem"
            }
          });
        })
        .catch(error => alert(error));
    },
    async getApiCalls() {
      await this.$request("get", "/stats/total")
        .then(res => {
          this.stats.push({
            bgColor: "primary",
            icon: "lock",
            title: "API Requests",
            data: res.data,
            action: {
              label: "",
              link: ""
            }
          });
        })
        .catch(error => alert(error));
    },
    async getNumeroChavesApi() {
      await this.$request("get", "/chaves/")
        .then(res => {
          this.numeroChavesApi = res.data.length;
          this.stats.push({
            bgColor: "primary",
            icon: "vpn_key",
            title: "API Keys",
            data: res.data.length,
            action: {
              label: "See",
              link: "/gestao/api/listagem"
            }
          });
        })
        .catch(error => alert(error));
    },
    go(path) {
      this.$router.push(path);
    }
  }
};
</script>
