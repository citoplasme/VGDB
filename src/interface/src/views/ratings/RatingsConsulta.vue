<template>
  <v-card class="ma-4">
    <Loading v-if="!itemReady" :message="'a rating'" />
    <v-card-title v-else class="indigo darken-4 white--text">{{
      this.item.name
    }}</v-card-title>
    <v-card-text>
      <v-row v-if="item.games && item.games.length > 0">
        <v-col cols="2">
          <div class="info-label">Games</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="game in item.games" :key="game.id">
                <span class="fakea" @click="go(`/games/${game.id}`)">{{
                  game.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
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
import Loading from "@/components/generic/Loading";

export default {
  components: {
    Loading
  },
  data: () => ({
    id: "",
    item: {
      name: "",
      games: []
    },
    itemReady: false
  }),
  methods: {
    go: function(url) {
      if (url.startsWith("http")) {
        window.location.href = url;
      } else {
        this.$router.push(url);
      }
    }
  },
  created: async function() {
    try {
      this.id = window.location.pathname.split("/")[2];

      // Informações sobre o item
      var response = await this.$request("get", "/ratings/" + this.id);
      this.item = response.data;

      this.itemReady = true;
    } catch (e) {
      return e;
    }
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
.info-content {
  padding: 5px;
  width: 100%;
  border: 1px solid #1a237e;
}
.fakea:hover {
  text-decoration: underline;
  cursor: pointer;
}
.fakea {
  color: #1a76d2;
}
</style>
