<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                prepend-icon="email"
                name="email"
                v-model="form.email"
                label="Email"
                type="email"
                :rules="regraEmail"
                required
              />
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                v-model="form.password"
                label="Password"
                type="password"
                :rules="regraPassword"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" type="submit" @click="cancelar">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" @click="loginUtilizador"
              >Login</v-btn
            >
          </v-card-actions>
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            :color="color"
            :top="true"
          >
            {{ text }}
            <v-btn text @click="fecharSnackbar">Fechar</v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      regraEmail: [
        v => !!v || "Email is required.",
        v => /.+@.+/.test(v) || "Email has to be valid."
      ],
      regraPassword: [v => !!v || "Password is required."],
      snackbar: false,
      color: "",
      timeout: 4000,
      text: "",
      done: false
    };
  },
  methods: {
    loginUtilizador() {
      if (this.$refs.form.validate()) {
        this.$request("post", "/users/login", {
          username: this.$data.form.email,
          password: this.$data.form.password
        })
          .then(res => {
            if (res.data.token != undefined && res.data.name != undefined) {
              // this.text = "Login efetuado com sucesso!";
              // this.color = "success";
              // this.snackbar = true;
              // this.done = true;
              this.$store.commit("guardaTokenUtilizador", res.data.token);
              this.$store.commit("guardaNomeUtilizador", res.data.name);
              this.$router.push("/");
              // this.$store.state.name = res.data.name;
              // this.$store.state.token = res.data.token;
            } else {
              this.text =
                "An error has occurred during login. Please verify your credentials.";
              this.color = "error";
              this.snackbar = true;
              this.done = false;
            }
          })
          .catch(err => {
            this.text =
              "An error has occurred during login. Please verify your credentials.";
            this.color = "error";
            this.snackbar = true;
            this.done = false;
          });
      } else {
        this.text = "Please fill all the fields.";
        this.color = "error";
        this.snackbar = true;
        this.done = false;
      }
    },
    fecharSnackbar() {
      this.snackbar = false;
      if (this.done == true) this.$router.push("/");
    },
    cancelar() {
      this.$router.push("/users/autenticacao");
    }
  }
};
</script>
