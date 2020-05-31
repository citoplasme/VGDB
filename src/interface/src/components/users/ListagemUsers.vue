<template>
  <v-content>
    <v-card>
      <v-card-title>
        <h1>Users</h1>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="registo">
              <v-icon large color="primary">person_add</v-icon>
            </v-btn>
          </template>
          <span>Add new user</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Filter"
          single-line
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="utilizadores"
        :search="search"
        class="elevation-1"
        :footer-props="usersFooterProps"
      >
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            No results were found for "{{ search }}" .
          </v-alert>
        </template>
        <template v-slot:item="props">
          <tr>
            <td class="subheading">{{ props.item.name }}</td>
            <td class="subheading">{{ props.item.email }}</td>
            <td class="subheading">{{ props.item.level }}</td>
            <td class="subheading">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="editar(props.item)">
                    <v-icon medium color="primary">edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit user</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    @click="alterarPasswordId = props.item.id"
                  >
                    <v-icon medium color="yellow">vpn_key</v-icon>
                  </v-btn>
                </template>
                <span>Alter user password</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="desativarId = props.item.id">
                    <v-icon color="grey darken-2">lock</v-icon>
                  </v-btn>
                </template>
                <span>Deactivate user</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" icon @click="eliminarId = props.item.id">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete user</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
        <template v-slot:pageText="props">
          Results: {{ props.pageStart }} - {{ props.pageStop }} of
          {{ props.itemsLength }}
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          <span class="headline">Edit user</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    prepend-icon="person"
                    v-model="editedItem.name"
                    label="Name"
                    :rules="regraNome"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    prepend-icon="email"
                    v-model="editedItem.email"
                    label="Email"
                    :rules="regraEmail"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-select
                    :items="[
                      'Technological Administrator',
                      'Functional Administrator',
                      'Decision maker',
                      'Validator - level 2',
                      'Validator - level 1',
                      'Advanced user',
                      'Basic user - level 2',
                      'Basic user - Level 1',
                      'Deactivated user'
                    ]"
                    :rules="regraTipo"
                    prepend-icon="assignment"
                    v-model="editedItem.level"
                    label="User level"
                    required
                  >
                  </v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="guardar">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog :value="alterarPasswordId != ''" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">
          <span class="headline">Alter user password</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form2" lazy-validation>
            <v-text-field
              id="password"
              prepend-icon="lock"
              name="password"
              v-model="password"
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
              v-model="rep_password"
              label="Repeat the Password"
              type="password"
              :rules="regraPassword"
              @input="verificaPassword()"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="alterarPasswordId = ''">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="alterarPassword()">
            Alter Password
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog :value="desativarId != ''" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Action confirmation</v-card-title>
        <v-card-text>
          Are you sure that you want to deactivate the user?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="desativarId = ''">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="desativar(desativarId)">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog :value="eliminarId != ''" persistent max-width="290px">
      <v-card>
        <v-card-title class="headline">Action Confirmation</v-card-title>
        <v-card-text>
          Are you sure that you want to delete the user?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="eliminarId = ''">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="eliminar(eliminarId)">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      :top="true"
    >
      {{ text }}
      <v-btn text @click="fecharSnackbar">Close</v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    search: "",
    regraNome: [v => !!v || "Name is required."],
    regraEmail: [
      v => !!v || "Email is required.",
      v => /^.+@.+\..+$/.test(v) || "Email has to be valid."
    ],
    regraTipo: [v => !!v || "User type is required."],
    regraPassword: [v => !!v || "Password is required."],
    usersFooterProps: {
      "items-per-page-text": "Registers per page",
      "items-per-page-options": [5, 10, -1],
      "items-per-page-all-text": "All"
    },
    headers: [
      {
        text: "Name",
        sortable: true,
        value: "name",
        class: "title"
      },
      {
        text: "Email",
        sortable: true,
        value: "email",
        class: "title"
      },
      {
        text: "User level",
        sortable: true,
        value: "level",
        class: "title"
      },
      {
        text: "Options",
        sortable: false,
        value: "",
        class: "title"
      }
    ],
    dialog: false,
    alterarPasswordId: "",
    desativarId: "",
    eliminarId: "",
    editedIndex: -1,
    editedItem: {
      nome: "",
      email: "",
      level: ""
    },
    password: "",
    rep_password: "",
    utilizadores: [],
    snackbar: false,
    color: "",
    done: false,
    timeout: 4000,
    text: ""
  }),
  async created() {
    await this.getUtilizadores();
  },
  methods: {
    async getUtilizadores() {
      try {
        var response = await this.$request("get", "/users?formato=normalizado");
        this.utilizadores = response.data;
      } catch (e) {
        return e;
      }
    },
    verificaPassword() {
      if (this.password != this.rep_password) {
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
    editar(item) {
      this.editedIndex = this.utilizadores.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    alterarPassword() {
      if (this.$refs.form2.validate()) {
        this.$request("put", "/users/" + this.alterarPasswordId + "/password", {
          novaPassword: this.password
        })
          .then(res => {
            this.text = res.data;
            this.color = "success";
            this.snackbar = true;
            this.alterarPasswordId = "";
            this.done = true;
          })
          .catch(err => {
            this.text = "An error occurred.";
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
    desativar(id) {
      this.$request("put", "/users/" + id + "/desativar")
        .then(res => {
          this.text = res.data;
          this.color = "success";
          this.snackbar = true;
          this.done = true;
          this.desativarId = "";
          this.getUtilizadores();
        })
        .catch(err => {
          this.text = err.response.data;
          this.color = "error";
          this.snackbar = true;
          this.done = false;
        });
    },
    eliminar(id) {
      this.$request("delete", "/users/" + id)
        .then(res => {
          this.text = res.data;
          this.color = "success";
          this.snackbar = true;
          this.done = true;
          this.eliminarId = "";
          this.getUtilizadores();
        })
        .catch(err => {
          this.text = err.response.data;
          this.color = "error";
          this.snackbar = true;
          this.done = false;
        });
    },
    guardar() {
      if (this.$refs.form.validate()) {
        var parsedType;
        switch (this.editedItem.level) {
          case "Technological Administrator":
            parsedType = 7;
            break;
          case "Functional Administrator":
            parsedType = 6;
            break;
          case "Decision maker":
            parsedType = 5;
            break;
          case "Validator - level 2":
            parsedType = 4;
            break;
          case "Validator - level 1":
            parsedType = 3.5;
            break;
          case "Advanced user":
            parsedType = 3;
            break;
          case "Basic user - level 2":
            parsedType = 2;
            break;
          case "Basic user - Level 1":
            parsedType = 1;
            break;
          case "Deactivated user":
            parsedType = -1;
            break;
        }
        this.$request("put", "/users/" + this.editedItem.id, {
          nome: this.editedItem.name,
          email: this.editedItem.email,
          level: parsedType
        })
          .then(res => {
            this.text = res.data;
            this.color = "success";
            this.snackbar = true;
            this.done = true;
            this.dialog = false;
            this.getUtilizadores();
          })
          .catch(err => {
            this.text = err.response.data;
            this.color = "error";
            this.snackbar = true;
            this.done = false;
          });
      } else {
        this.text = "Please check if you have filled every field.";
        this.color = "error";
        this.snackbar = true;
        this.done = false;
      }
    },
    fecharSnackbar() {
      this.snackbar = false;
      if (this.done == true) this.getUtilizadores();
    },
    registo() {
      this.$router.push("/users/registo");
    }
  }
};
</script>
