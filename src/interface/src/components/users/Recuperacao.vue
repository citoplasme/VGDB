<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Recovery</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            In order to regain access to your account, please enter the email
            with which you are registered on the VGDB platform. An email will be
            sent with an address where you can enter a new password for your
            account.
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" type="submit" @click="cancelar">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" @click="recuperarUtilizador">
              Recover
            </v-btn>
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
      regraEmail: [
        v => !!v || "Email is required.",
        v => /.+@.+/.test(v) || "Email has to be valid."
      ],
      form: {
        email: ""
      },
      snackbar: false,
      color: "",
      done: false,
      timeout: 4000,
      text: ""
    };
  },
  methods: {
    recuperarUtilizador() {
      if (this.$refs.form.validate()) {
        this.$request("post", "/users/recuperar", {
          email: this.$data.form.email,
          url: window.location.href
        })
          .then(res => {
            this.text = res.data;
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
