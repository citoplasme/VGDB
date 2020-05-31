<template>
  <v-row class="ma-8">
    <v-col cols="6">
      <v-card>
        <v-card-title class="indigo darken-4 subtitle-1 white--text" dark>
          Account Recovery
        </v-card-title>
        <v-card-text>
          Do you have an account, but forgot about it's credentials?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" type="submit" @click="recuperarPw">
            Recover
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-card-title class="indigo darken-4 subtitle-1 white--text" dark>
          API Keys
        </v-card-title>
        <v-card-text>
          Do you need to have access to the data API of the app?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" type="submit" @click="registarApi">
            Register
          </v-btn>
          <v-btn color="primary" type="submit" @click="renovarApi">
            Renew
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "autenticacao",
  methods: {
    registarUtilizador() {
      this.$router.push("/users/registo");
    },
    recuperarPw() {
      this.$router.push("/users/recuperacao");
    },
    //API
    registarApi() {
      this.$router.push("/gestao/api/registo");
    },
    renovarApi() {
      this.$router.push("/gestao/api/renovar");
    }
  }
};
</script>
