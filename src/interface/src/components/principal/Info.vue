<template>
  <v-card class="ma-4 pa-2">
    <v-toolbar :color="panelHeaderColor" dark>
      <v-toolbar-title>What is the Video Game Database</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header
            >The Video Game Database</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-card>
              <v-card-text>
                <p>
                  The <b>Video Game Database</b> is a platform developed within
                  the Course of Knowledge Processing and Representation by
                  <a href="https://github.com/citoplasme">João Pimentel</a>.
                </p>
                <p>
                  All the data is stored in a graph database, where each game
                  has the information of it's producers, developers, composers,
                  genres, ways of play and others. Besides that, anyone can
                  create an account in this platform, knowing that there are
                  multiple levels of access, with different operations. It is
                  also important to mention that each user, regardless of their
                  access level, can add or remove games from their favorite
                  list.
                </p>
                <p>Available functionalities:</p>
                <ul>
                  <li>
                    Listing and consultation of video game related news;
                  </li>
                  <li>
                    Listing and consultation of video games;
                  </li>
                  <li>
                    Listing and consultation of platforms;
                  </li>
                  <li>
                    Listing and consultation of brands;
                  </li>
                  <li>
                    Listing and consultation of publishers;
                  </li>
                  <li>
                    Listing and consultation of genres;
                  </li>
                  <li>
                    Listing and consultation of countries that are associated
                    with the games development;
                  </li>
                  <li>
                    Listing and consultation of age ratings;
                  </li>
                  <li>
                    Listing and consultation of game modes;
                  </li>
                  <li>
                    Listing and consultation of game formats;
                  </li>
                  <li>
                    Listing and consultation of characters;
                  </li>
                  <li>
                    Listing and consultation of composers;
                  </li>
                  <li>
                    Listing and consultation of designers;
                  </li>
                  <li>
                    Listing and consultation of developers;
                  </li>
                  <li>
                    Listing and consultation of directors;
                  </li>
                  <li>
                    Listing and consultation of producers;
                  </li>
                  <li>
                    Add or remove video games from a favorite list.
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      panelHeaderColor: "indigo darken-4"
    };
  }
};
</script>
