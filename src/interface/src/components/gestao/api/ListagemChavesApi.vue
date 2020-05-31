<template>
  <v-content>
    <v-card>
      <v-card-title>
        <h1>API Keys</h1>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="registo">
              <v-icon large color="primary">person_add</v-icon>
            </v-btn>
          </template>
          <span>Add new API Key</span>
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
        :items="chaves"
        :search="search"
        class="elevation-1"
        footer-props.items-per-page-options="[10, 20, 50]"
        footer-props.items-per-page-text="Show"
      >
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            No results were found for "{{ search }}" .
          </v-alert>
        </template>
        <template v-slot:item="props">
          <tr>
            <td class="subheading">{{ format(props.item.key) }}</td>
            <td class="subheading">{{ props.item.name }}</td>
            <td class="subheading">{{ props.item.contactInfo }}</td>
            <td class="subheading">{{ props.item.active }}</td>
            <!-- <td class="subheading">{{ props.item.nCalls }}</td> -->
            <!-- <td class="subheading">{{ props.item.lastUsed }}</td> -->
            <td class="subheading">{{ props.item.created }}</td>
            <td class="subheading">{{ props.item.expiration }}</td>
            <td class="subheading">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="editar(props.item)">
                    <v-icon medium color="primary">edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit API Key</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    @click="renovarId = props.item.contactInfo"
                  >
                    <v-icon medium color="primary">refresh</v-icon>
                  </v-btn>
                </template>
                <span>Renew API Key</span>
              </v-tooltip>
              <v-tooltip bottom v-if="props.item.active == 'Não'">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="ativarId = props.item.id">
                    <v-icon medium color="grey darken-2">lock_open</v-icon>
                  </v-btn>
                </template>
                <span>Activate API Key</span>
              </v-tooltip>
              <v-tooltip bottom v-if="props.item.active == 'Sim'">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="desativarId = props.item.id">
                    <v-icon medium color="grey darken-2">lock</v-icon>
                  </v-btn>
                </template>
                <span>Deactivate API Key</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="eliminarId = props.item.id">
                    <v-icon medium color="red">delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete API Key</span>
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
          <span class="headline">Edit API Key</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    prepend-icon="vpn_key"
                    v-model="editedItem.key"
                    label="API Key"
                    disabled
                  ></v-text-field>
                </v-flex>
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
                    v-model="editedItem.contactInfo"
                    label="Email"
                    :rules="regraEmail"
                    required
                  ></v-text-field>
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
    <v-dialog :value="renovarId != ''" max-width="290">
      <v-card v-if="apikey == ''">
        <v-card-title class="headline">Confirm Action</v-card-title>
        <v-card-text>
          Are you sure you want to renew the API key?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="renovarId = ''">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="renovar(renovarId)">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title>API Key Renewed</v-card-title>
        <v-card-text>
          <p>The API Key of '{{ renovarId }}' was sucessfully renewd.</p>
          <p>
            The new API Key is:
          </p>
          <span style="color: green">
            <b>
              {{ apikey }}
            </b>
          </span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="
              apikey = '';
              renovarId = '';
            "
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog :value="desativarId != ''" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm Action</v-card-title>
        <v-card-text>
          Are you sure you want to disable the API key?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="desativarId = ''">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="
              desativar(desativarId);
              desativarId = '';
            "
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog :value="ativarId != ''" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm Action</v-card-title>
        <v-card-text>
          Are you sure you want to activate the API key?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="ativarId = ''">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="
              ativar(ativarId);
              ativarId = '';
            "
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog :value="eliminarId != ''" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm Action</v-card-title>
        <v-card-text>
          Are you sure you want to delete the API key?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="eliminarId = ''">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="
              eliminar(eliminarId);
              eliminarId = '';
            "
          >
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
    regraNome: [v => !!v || "Name is required."],
    regraEmail: [
      v => !!v || "Email is required.",
      v => /.+@.+/.test(v) || "Email has to be valid."
    ],
    search: "",
    editedIndex: -1,
    editedItem: {
      key: "",
      name: "",
      contactInfo: "",
      active: ""
    },
    headers: [
      {
        text: "Key",
        sortable: true,
        value: "key",
        class: "title"
      },
      {
        text: "Name",
        sortable: true,
        value: "name",
        class: "title"
      },
      {
        text: "Contact",
        sortable: true,
        value: "contactInfo",
        class: "title"
      },
      {
        text: "Active",
        sortable: true,
        value: "active",
        class: "title"
      },
      // {
      //   text: "Utilizações",
      //   sortable: true,
      //   value: "nCalls",
      //   class: "title"
      // },
      // {
      //   text: "Ultima utilização",
      //   sortable: true,
      //   value: "lastUsed",
      //   class: "title"
      // },
      {
        text: "Creation Date",
        sortable: true,
        value: "created",
        class: "title"
      },
      {
        text: "Expiration Date",
        sortable: true,
        value: "expiration",
        class: "title"
      },
      {
        text: "Actions",
        sortable: false,
        value: "",
        class: "title"
      }
    ],
    dialog: false,
    ativarId: "",
    desativarId: "",
    eliminarId: "",
    renovarId: "",
    apikey: "",
    chaves: [],
    snackbar: false,
    color: "",
    done: false,
    timeout: 4000,
    text: ""
  }),
  async created() {
    await this.getChavesApi();
  },
  methods: {
    async getChavesApi() {
      try {
        var response = await this.$request("get", "/chaves");
        this.chaves = response.data;
      } catch (e) {
        return e;
      }
    },
    editar(item) {
      this.editedIndex = this.chaves.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    desativar(id) {
      this.$request("put", "/chaves/" + id + "/desativar")
        .then(res => {
          this.text = "API Key sucessfully deactivated.";
          this.color = "success";
          this.snackbar = true;
          this.done = true;
          this.getChavesApi();
        })
        .catch(err => {
          this.text = err.response.data;
          this.color = "error";
          this.snackbar = true;
          this.done = false;
        });
    },
    ativar(id) {
      this.$request("put", "/chaves/" + id + "/ativar")
        .then(res => {
          this.text = "API Key sucessfully activated.";
          this.color = "success";
          this.snackbar = true;
          this.done = true;
          this.getChavesApi();
        })
        .catch(err => {
          this.text = err.response.data;
          this.color = "error";
          this.snackbar = true;
          this.done = false;
        });
    },
    eliminar(id) {
      this.$request("delete", "/chaves/" + id)
        .then(res => {
          this.text = "API Key sucessfully deleted.";
          this.color = "success";
          this.snackbar = true;
          this.done = true;
          this.getChavesApi();
        })
        .catch(err => {
          this.text = err.response.data;
          this.color = "error";
          this.snackbar = true;
          this.done = false;
        });
    },
    renovar(email) {
      this.$request("put", "/chaves/renovar?email=" + email, {
        headers: {
          "Content-length": 0
        }
      })
        .then(res => {
          this.text = "API Key sucessfully renewed.";
          this.color = "success";
          this.snackbar = true;
          this.done = true;
          this.apikey = res.data.apikey;
          this.getChavesApi();
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
        this.$request("put", "/chaves/" + this.editedItem.id + "/atualizar/", {
          name: this.editedItem.name,
          contactInfo: this.editedItem.contactInfo
        })
          .then(res => {
            this.text = "API Key sucessfully updated.";
            this.color = "success";
            this.snackbar = true;
            this.done = true;
            this.dialog = false;
            this.getChavesApi();
          })
          .catch(err => {
            this.text = err.response.data;
            this.color = "error";
            this.snackbar = true;
            this.done = false;
          });
      } else {
        this.text = "Please confirm that every field is filled.";
        this.color = "error";
        this.snackbar = true;
        this.done = false;
      }
    },
    fecharSnackbar() {
      this.snackbar = false;
      if (this.done == true) this.getChavesApi();
    },
    registo() {
      this.$router.push("/gestao/api/registo");
    },
    format(key) {
      return key.substring(15, 25) + "...";
    }
  }
};
</script>
