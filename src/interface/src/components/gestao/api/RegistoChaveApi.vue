<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>API Key Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="name"
                v-model="form.name"
                label="Name"
                type="text"
                :rules="regraNome"
                required
              />
              <v-text-field
                prepend-icon="email"
                name="email"
                v-model="form.email"
                label="Email"
                type="email"
                :rules="regraEmail"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" type="submit" @click="cancelar">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" @click="registarChaveApi"
              >Register</v-btn
            >
          </v-card-actions>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      regraNome: [v => !!v || "Name is required."],
      regraEmail: [
        v => !!v || "Email is required.",
        v => /.+@.+/.test(v) || "Email has to be valid."
      ],
      form: {
        name: "",
        email: "",
        password: ""
      },
      snackbar: false,
      color: "",
      done: false,
      timeout: 4000,
      text: ""
    };
  },
  methods: {
    registarChaveApi() {
      if (this.$refs.form.validate()) {
        this.$request("post", "/chaves", {
          name: this.$data.form.name,
          email: this.$data.form.email
        })
          .then(res => {
            this.text =
              "API key registered with success. The key was sent to your email.";
            this.color = "success";
            this.snackbar = true;
            this.done = true;
          })
          .catch(err => {
            this.text = err.response.data;
            this.color = "error";
            this.snackbar = true;
            this.done = false;
          });
      } else {
        this.text = "Please fill every field.";
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
