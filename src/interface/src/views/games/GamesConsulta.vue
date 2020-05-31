<template>
  <v-card class="ma-4">
    <Loading v-if="!gameReady" :message="'a game'" />
    <v-card-title v-else class="indigo darken-4 white--text">{{
      this.game.title
    }}</v-card-title>
    <v-card-text>
      <v-row v-if="game.logo">
        <v-col cols="2">
          <div class="info-label">Logo</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <v-img :src="game.logo" contain max-height="100px" />
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.platforms && game.platforms.length > 0">
        <v-col cols="2">
          <div class="info-label">Platforms</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.platforms" :key="item.id">
                <span class="fakea" @click="go(`/platforms/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.composers && game.composers.length > 0">
        <v-col cols="2">
          <div class="info-label">Composers</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.composers" :key="item.id">
                <span class="fakea" @click="go(`/composers/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.genres && game.genres.length > 0">
        <v-col cols="2">
          <div class="info-label">Genres</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.genres" :key="item.id">
                <span class="fakea" @click="go(`/genres/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.designers && game.designers.length > 0">
        <v-col cols="2">
          <div class="info-label">Designers</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.designers" :key="item.id">
                <span class="fakea" @click="go(`/designers/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.developers && game.developers.length > 0">
        <v-col cols="2">
          <div class="info-label">Developers</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.developers" :key="item.id">
                <span class="fakea" @click="go(`/developers/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.publishers && game.publishers.length > 0">
        <v-col cols="2">
          <div class="info-label">Publishers</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.publishers" :key="item.id">
                <span class="fakea" @click="go(`/publishers/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.release_countries && game.release_countries.length > 0">
        <v-col cols="2">
          <div class="info-label">Origin Countries</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.release_countries" :key="item.id">
                <span class="fakea" @click="go(`/countries/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.ratings && game.ratings.length > 0">
        <v-col cols="2">
          <div class="info-label">Age Ratings</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.ratings" :key="item.id">
                <span class="fakea" @click="go(`/ratings/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.directors && game.directors.length > 0">
        <v-col cols="2">
          <div class="info-label">Directors</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.directors" :key="item.id">
                <span class="fakea" @click="go(`/directors/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.modes && game.modes.length > 0">
        <v-col cols="2">
          <div class="info-label">Game Modes</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.modes" :key="item.id">
                <span class="fakea" @click="go(`/modes/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.formats && game.formats.length > 0">
        <v-col cols="2">
          <div class="info-label">Formats</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.formats" :key="item.id">
                <span class="fakea" @click="go(`/formats/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.producers && game.producers.length > 0">
        <v-col cols="2">
          <div class="info-label">Producers</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.producers" :key="item.id">
                <span class="fakea" @click="go(`/producers/${item.id}`)">{{
                  item.name
                }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="game.characters && game.characters.length > 0">
        <v-col cols="2">
          <div class="info-label">Characters</div>
        </v-col>
        <v-col>
          <div class="info-content">
            <ul>
              <li v-for="item in game.characters" :key="item.id">
                <span class="fakea" @click="go(`/characters/${item.id}`)">{{
                  item.name
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
          <v-btn
            v-if="!itemsContains(this.idGame) && this.$store.state.name != ''"
            class="indigo accent-4 white--text mr-4"
            @click="adicionar"
            >Add to Favorites</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
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
</template>

<script>
import Loading from "@/components/generic/Loading";

export default {
  components: {
    Loading
  },
  data: () => ({
    idGame: "",
    game: {
      title: ""
    },
    gameReady: false,
    snackbar: false,
    text: "",
    color: "",
    timeout: 4000,
    favorites: []
  }),
  methods: {
    go: function(url) {
      if (url.startsWith("http")) {
        window.location.href = url;
      } else {
        this.$router.push(url);
      }
    },
    itemsContains(n) {
      return this.favorites.indexOf(n) > -1;
    },
    preparaFavs: async function(lista) {
      try {
        let myFavs = lista.map(g => g.id);
        return myFavs;
      } catch (e) {
        return {};
      }
    },
    preparaGame: async function(not) {
      try {
        var myGame = {
          title: not.title
        };
        return myGame;
      } catch (e) {
        return {};
      }
    },
    adicionar() {
      this.$request("post", "/users/favorites", {
        id: this.idGame,
        title: this.game.title
      })
        .then(res => {
          this.results = res.data;
          this.text = "Game added to favorites.";
          this.color = "success";
          this.snackbar = true;
          this.favorites.push(this.idGame);
        })
        .catch(e => {
          this.text = e.response.data;
          this.color = "error";
          this.snackbar = true;
        });
    },
    fecharSnackbar() {
      this.snackbar = false;
    }
  },
  created: async function() {
    try {
      this.idGame = window.location.pathname.split("/")[2];

      // Informações sobre o jogo
      var response = await this.$request("get", "/games/" + this.idGame);
      this.game = response.data; //await this.preparaGame(response.data);

      if (this.$store.state.name != "") {
        let favs = await this.$request("get", "/users/favorites");
        this.favorites = await this.preparaFavs(favs.data);
      }

      this.gameReady = true;
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
