<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary" v-if="validJWT">
            <v-toolbar-title>
              Password
              <span v-if="temPass">Change</span>
              <span v-else>Definition</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="validJWT">
            <v-form ref="form" lazy-validation>
              <v-text-field
                prepend-icon="person"
                label="Name"
                type="text"
                v-model="form.name"
                disabled
              />
              <div v-if="temPass">
                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  v-model="form.atualPassword"
                  label="Current Password"
                  type="password"
                  :rules="regraAtualPassword"
                  required
                />
              </div>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                v-model="form.password"
                label="New Password"
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
          <v-card-actions v-if="validJWT">
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" @click="alterarPW">
              <span v-if="temPass">Change</span>
              <span v-else>Define</span>
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
  mounted: async function() {
    var res = await this.$request(
      "get",
      "/users/" + this.$store.state.token + "/token"
    );
    this.form.id = res.data._id;
    this.form.name = res.data.name;

    res = await this.$request("get", "/users/" + this.form.id);
    this.temPass = res.data.local;
    this.validJWT = true;
  },
  data() {
    return {
      regraAtualPassword: [v => !!v || "Current password is required."],
      regraPassword: [v => !!v || "Password is required."],
      form: {
        name: "",
        atualPassword: "",
        password: "",
        rep_password: ""
      },
      validJWT: false,
      snackbar: false,
      color: "",
      done: false,
      timeout: 4000,
      text: "",
      temPass: false
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
    alterarPW() {
      if (this.$refs.form.validate()) {
        var obj;
        if (this.temPass) {
          obj = {
            atualPassword: this.form.atualPassword,
            novaPassword: this.form.password
          };
        } else {
          obj = { novaPassword: this.form.password };
        }
        this.$request("put", "/users/" + this.form.id + "/password", obj)
          .then(res => {
            this.text = res.data;
            this.color = "success";
            this.snackbar = true;
            this.done = true;
          })
          .catch(err => {
            this.text =
              "An error has occurred while updating your password. Please verify if the current password is correct.";
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
    }
  }
};
</script>
