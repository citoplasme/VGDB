<template>
  <v-app v-if="authenticated">
    <MainPageHeader />

    <v-snackbar v-model="snackbar" :color="color" :top="true" :timeout="0">
      {{ text }}
      <v-btn text @click="fecharSnackbar">Close</v-btn>
    </v-snackbar>

    <v-content>
      <router-view />
    </v-content>

    <PageFooter />
  </v-app>
</template>

<script>
import PageFooter from "@/components/PageFooter.vue"; // @ is an alias to /src
import MainPageHeader from "@/components/MainPageHeader.vue"; // @ is an alias to /src

export default {
  name: "App",
  components: {
    PageFooter,
    MainPageHeader
  },
  watch: {
    async $route(to, from) {
      this.authenticated = false;
      //verifica se o utilizador tem de estar autenticado para aceder à rota
      if (to.matched.some(record => !record.meta.levels.includes(0))) {
        if (this.$store.state.token != "") {
          //verifica se o utilizador está autenticado
          try {
            var res = await this.$request("get", "/users/token");
            //se está autenticado, verifica se tem permissões suficientes para a ceder a página
            if (
              to.matched.some(record =>
                record.meta.levels.includes(res.data.level)
              )
            ) {
              this.authenticated = true;
            } else {
              this.text = "You are not allowed to access this page.";
              this.color = "error";
              this.snackbar = true;
              this.$router.push("/");
            }
          } catch (erro) {
            this.text = "Your session has expired! Please log in again.";
            this.color = "error";
            this.snackbar = true;
            this.$store.commit("guardaTokenUtilizador", "");
            this.$store.commit("guardaNomeUtilizador", "");
            this.$router.push("/users/login");
          }
        } else {
          this.text =
            "You do not have permissions to access this page! Please login.";
          this.color = "error";
          this.snackbar = true;
          this.$router.push("/users/login");
        }
      } else {
        this.authenticated = true;
      }

      if (this.$route.query.erro) {
        //msg de erro
        this.text = this.$route.query.erro;
        this.color = "error";
        this.snackbar = true;
        this.$router.push(this.$route.path);
      } else if (this.$route.query.sucesso) {
        //msg de sucesso
        this.text = this.$route.query.sucesso;
        this.color = "success";
        this.snackbar = true;
        this.$router.push(this.$route.path);
      }
    }
  },

  methods: {
    fecharSnackbar() {
      this.snackbar = false;
    }
  },
  data: () => ({
    snackbar: false,
    authenticated: false,
    color: "",
    text: ""
  })
};
</script>
