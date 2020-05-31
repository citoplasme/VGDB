<template>
  <v-card class="ma-4 pa-2">
    <v-toolbar :color="panelHeaderColor" dark>
      <v-toolbar-title>Data Categories</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in this.operacoes" :key="i">
          <v-expansion-panel-header>
            {{ item.entidade }}
          </v-expansion-panel-header>
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
                  >{{ op.label }}</v-btn
                >
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
  methods: {
    go: function(url) {
      if (url.startsWith("http")) {
        window.location.href = url;
      } else {
        this.$router.push(url);
      }
    }
  },
  data() {
    return {
      panelHeaderColor: "indigo darken-4",
      operacoes: [
        {
          entidade: "Video Games",
          texto:
            "A video game is an electronic game that involves interaction with a user interface to generate visual feedback on a 2D or 3D video display device such as a touchscreen, virtual reality headset or monitor/TV set.",
          ops: [
            {
              label: "View",
              url: "/games"
            }
          ]
        },
        {
          entidade: "Brands",
          texto: "A brand is the entity that owns one or multiple platforms.",
          ops: [
            {
              label: "View",
              url: "/brands"
            }
          ]
        },
        {
          entidade: "Platforms",
          texto:
            "A platform is a machine that allows the user to play games in.",
          ops: [
            {
              label: "View",
              url: "/platforms"
            }
          ]
        },
        {
          entidade: "Publishers",
          texto: "A publisher is an entity that published one or more games.",
          ops: [
            {
              label: "View",
              url: "/publishers"
            }
          ]
        },
        {
          entidade: "Genres",
          texto:
            "A genre is a characteristic that defines a game. A game can have one or multiple genres.",
          ops: [
            {
              label: "View",
              url: "/genres"
            }
          ]
        },
        {
          entidade: "Countries",
          texto:
            "The countries are associated with the game in a way that a game is originally released and developed in a specific country.",
          ops: [
            {
              label: "View",
              url: "/countries"
            }
          ]
        },
        {
          entidade: "Age Ratings",
          texto:
            "A game is restricted by an age rating. An age rating is the minimum age that a player should be to play a specific game.",
          ops: [
            {
              label: "View",
              url: "/ratings"
            }
          ]
        },
        {
          entidade: "Game Modes",
          texto:
            "The modes are the ways a game can be played. A game can have just one or multiple game modes, like being a single-player game with a multiplayer part.",
          ops: [
            {
              label: "View",
              url: "/modes"
            }
          ]
        },
        {
          entidade: "Game Formats",
          texto:
            "The formats are the ways a game was released, such as CD-ROM, digital only, among others.",
          ops: [
            {
              label: "View",
              url: "/formats"
            }
          ]
        },
        {
          entidade: "Characters",
          texto:
            "A character is an entity that plays some role inside the video game. Note that a character can appear in multiple games and a game can have multiple characters.",
          ops: [
            {
              label: "View",
              url: "/characters"
            }
          ]
        },
        {
          entidade: "Composers",
          texto: "A composer is someone that composes music for games.",
          ops: [
            {
              label: "View",
              url: "/composers"
            }
          ]
        },
        {
          entidade: "Designers",
          texto: "A designer is someone that design a game.",
          ops: [
            {
              label: "View",
              url: "/designers"
            }
          ]
        },
        {
          entidade: "Developers",
          texto:
            "A developer is someone that was part of the development of a specific game.",
          ops: [
            {
              label: "View",
              url: "/developers"
            }
          ]
        },
        {
          entidade: "Directors",
          texto:
            "A director is someone that directed the development of a game.",
          ops: [
            {
              label: "View",
              url: "/directors"
            }
          ]
        },
        {
          entidade: "Producers",
          texto:
            "A producer is an entity that produced at least one video game.",
          ops: [
            {
              label: "View",
              url: "/producers"
            }
          ]
        },
        {
          entidade: "Entities",
          texto:
            "An entity is a person or a company that had some type of interaction with the life of a video game, such as being the game's developer, composer or similar.",
          ops: [
            {
              label: "View",
              url: "/entities"
            }
          ]
        }
      ]
    };
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
</style>
