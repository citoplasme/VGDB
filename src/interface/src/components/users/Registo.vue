<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
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
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                v-model="form.password"
                label="Password"
                type="password"
                :rules="regraPassword"
                @input="verificaPassword()"
                required
              />
              <v-text-field
                id="rep_password"
                prepend-icon="lock"
                name="rep_password"
                v-model="form.rep_password"
                label="Repeat the Password"
                type="password"
                :rules="regraPassword"
                @input="verificaPassword()"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" type="submit" @click="cancelar">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" @click="registarUtilizador"
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
        v => /^.+@.+\..+$/.test(v) || "Email has to be valid."
      ],
      regraPassword: [v => !!v || "Password is required."],
      regraTipo: [v => !!v || "Type is required."],
      form: {
        name: "",
        email: "",
        password: "",
        rep_password: ""
      },
      snackbar: false,
      color: "",
      done: false,
      timeout: 4000,
      text: ""
    };
  },

  methods: {
    verificaPassword() {
      if (this.form.password != this.form.rep_password) {
        if (this.regraPassword.length == 1) {
          this.regraPassword = this.regraPassword.concat([
            "The password must be the same."
          ]);
        }
      } else {
        if (this.regraPassword.length == 2) {
          this.regraPassword = this.regraPassword.slice(0, 1);
        }
      }
    },
    async registarUtilizador() {
      if (this.$refs.form.validate()) {
        try {
          var response = await this.$request("post", "/users/registar", {
            name: this.$data.form.name,
            email: this.$data.form.email,
            password: this.$data.form.password
          });

          this.$router.push("/");
        } catch (err) {
          this.text =
            "An error occurred during the register: " + err.response.data;
          this.color = "error";
          this.snackbar = true;
          this.done = false;
        }
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
