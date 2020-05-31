<template>
  <v-container fluid fill-height>
    <v-row row wrap justify-center>
      <v-col cols="10">
        <v-card class="elevation-10">
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              API Key Renewal
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="apikey == ''">
            Your API key has a duration of 30 days after its issue. If those 30
            days have passed, a new API key can be requested, which will be
            associated to your existing email.
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
          <v-card-text v-else>
            <p>
              Your API key was renewed.
            </p>
            <p>
              It's new value is:
            </p>
            <span style="color: green">
              <b>
                {{ apikey }}
              </b>
            </span>
            <p>
              Your API key has a duration of
              <span style="color: red"><b>30 days</b></span
              >.
            </p>
          </v-card-text>
          <v-card-actions v-if="apikey == ''">
            <v-btn color="error" type="submit" @click="cancelar">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" @click="renovar">
              Renew
            </v-btn>
          </v-card-actions>
          <v-card-actions v-else>
            <v-spacer></v-spacer>
            <v-btn color="error" type="submit" @click="cancelar">
              Back
            </v-btn>
            <v-spacer></v-spacer>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "renovar",
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
      text: "",
      apikey: ""
    };
  },
  methods: {
    renovar() {
      if (this.$refs.form.validate()) {
        this.$request("put", "/chaves/renovar?email=" + this.$data.form.email, {
          headers: {
            "Content-length": 0
          }
        })
          .then(res => {
            this.text = "API key successfully renewed.";
            this.apikey = res.data.apikey;
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
