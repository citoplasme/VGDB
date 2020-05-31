<template>
  <div ma-2>
    <v-row row wrap>
      <v-col cols="12">
        <v-data-table
          :headers="headersAggLogs"
          :items="aggregateLogs"
          :items-per-page="5"
          :footer-props="footer_props"
          item-key="_id"
          class="elevation-1 ma-10"
          :search="searchAggLog"
          :loading="loadingAggLogs"
          loading-text="Loading access log summary..."
          multi-sort
        >
          <template v-slot:top>
            <v-toolbar flat color="indigo darken-4" dark>
              <v-toolbar-title>Access Log Summary</v-toolbar-title>
              <div class="flex-grow-1"></div>
              <v-text-field
                v-model="searchAggLog"
                append-icon="search"
                label="Filter"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>

          <template v-slot:item.nGETs="{ item }">
            <v-chip class="font-weight-bold" color="green" dark>
              {{ item.nGETs }}
            </v-chip>
          </template>

          <template v-slot:item.nPOSTs="{ item }">
            <v-chip class="font-weight-bold" color="cyan" dark>
              {{ item.nPOSTs }}
            </v-chip>
          </template>

          <template v-slot:item.nPUTs="{ item }">
            <v-chip class="font-weight-bold" color="orange" dark>
              {{ item.nPUTs }}
            </v-chip>
          </template>

          <template v-slot:item.nDELETEs="{ item }">
            <v-chip class="font-weight-bold" color="red" dark>
              {{ item.nDELETEs }}
            </v-chip>
          </template>

          <template v-slot:footer.page-text="props">
            {{ props.pageStart }} - {{ props.pageStop }} of
            {{ props.itemsLength }}
          </template>

          <v-alert slot="no-results" :value="true" class="error" icon="warning">
            The search for "{{ searchAggLog }}" has no results.
          </v-alert>

          <v-alert slot="no-data" :value="true" class="error" icon="warning">
            The results could not be obtained.
          </v-alert>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row row wrap>
      <v-col cols="12">
        <v-data-table
          :headers="headersLogs"
          :items="logs"
          :items-per-page="5"
          :footer-props="footer_props"
          :options.sync="options"
          :server-items-length="totalLogs"
          item-key="_id"
          class="elevation-1 ma-10"
          :loading="loadingLogs"
          loading-text="Loading the access log..."
        >
          <template v-slot:top>
            <v-toolbar flat color="indigo darken-4" dark>
              <v-toolbar-title>
                Access Log for the past 30 days
              </v-toolbar-title>
            </v-toolbar>
          </template>

          <template v-slot:item.httpStatus="{ item }">
            <v-chip
              class="font-weight-bold"
              :color="getColorStatus(item.httpStatus)"
              dark
            >
              {{ item.httpStatus }}
            </v-chip>
          </template>

          <template v-slot:item.method="{ item }">
            <v-chip
              class="font-weight-bold"
              :color="getColorMethod(item.method)"
              dark
            >
              {{ item.method }}
            </v-chip>
          </template>

          <template v-slot:footer.page-text="props">
            {{ props.pageStart }} - {{ props.pageStop }} of
            {{ props.itemsLength }}
          </template>

          <v-alert slot="no-data" :value="true" class="error" icon="warning">
            The results could not be obtained.
          </v-alert>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row row wrap>
      <v-col cols="12">
        <v-data-table
          :headers="headersIdLogs"
          :items="idLogs"
          :items-per-page="5"
          :footer-props="footer_props"
          item-key="_id"
          class="elevation-1 ma-10"
          :loading="loadingIdLogs"
          loading-text="Loading the access log of an user/API key..."
          show-group-by
          multi-sort
        >
          <template v-slot:top>
            <v-toolbar
              flat
              color="indigo darken-4"
              dark
              extended
              extension-height="20px"
            >
              <v-toolbar-title>
                Access Log of an user for the past 30 days
              </v-toolbar-title>
              <div class="flex-grow-1"></div>
              <v-autocomplete
                class="mt-7"
                :items="tipos"
                label="Type"
                :rules="regraV"
                v-model="tipo"
                dark
              />
              <div class="flex-grow-1"></div>
              <v-autocomplete
                class="mt-7"
                v-if="tipo"
                :items="getEmails(tipo)"
                label="Email"
                :rules="regraV"
                v-model="id"
                dark
              />
              <div class="flex-grow-1"></div>
              <v-btn
                class="mt-4"
                color="indigo accent-4"
                :disabled="!tipo || !id"
                @click="
                  getIdLogs();
                  notRunId = false;
                "
                dark
              >
                Get
              </v-btn>
            </v-toolbar>
          </template>

          <template v-slot:item.httpStatus="{ item }">
            <v-chip
              class="font-weight-bold"
              :color="getColorStatus(item.httpStatus)"
              dark
            >
              {{ item.httpStatus }}
            </v-chip>
          </template>

          <template v-slot:item.method="{ item }">
            <v-chip
              class="font-weight-bold"
              :color="getColorMethod(item.method)"
              dark
            >
              {{ item.method }}
            </v-chip>
          </template>

          <template v-slot:footer.page-text="props">
            {{ props.pageStart }} - {{ props.pageStop }} of
            {{ props.itemsLength }}
          </template>

          <v-alert
            slot="no-data"
            :value="notRunId"
            class="warning"
            icon="warning"
          >
            You have not yet chosen whether you want to view the records of an
            user or API key and/or have not yet chosen the email address.
          </v-alert>
          <v-alert
            slot="no-data"
            :value="!notRunId"
            class="error"
            icon="warning"
          >
            No results found.
          </v-alert>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row row wrap>
      <v-col cols="12">
        <v-data-table
          :headers="headersRouteLogs"
          :items="routeLogs"
          :items-per-page="5"
          :footer-props="footer_props"
          item-key="_id"
          class="elevation-1 ma-10"
          :loading="loadingRouteLogs"
          loading-text="Loading the access log of a route..."
          show-group-by
          multi-sort
        >
          <template v-slot:top>
            <v-toolbar
              flat
              color="indigo darken-4"
              dark
              extended
              extension-height="20px"
            >
              <v-toolbar-title>
                Access Log of a route for the past 30 days
              </v-toolbar-title>
              <div class="flex-grow-1"></div>
              <v-autocomplete
                class="mt-7"
                :items="verbos"
                label="Method"
                :rules="regraV"
                v-model="verbo"
                dark
              />
              <div class="flex-grow-1"></div>
              <v-text-field
                class="mt-7"
                label="Route"
                :rules="regraV"
                v-model="caminho"
                dark
              />
              <div class="flex-grow-1"></div>
              <v-btn
                class="mt-4"
                color="indigo accent-4"
                :disabled="!verbo || !caminho"
                @click="
                  getRouteLogs();
                  notRunRoute = false;
                "
                dark
              >
                Get
              </v-btn>
            </v-toolbar>
          </template>

          <template v-slot:item.httpStatus="{ item }">
            <v-chip
              class="font-weight-bold"
              :color="getColorStatus(item.httpStatus)"
              dark
            >
              {{ item.httpStatus }}
            </v-chip>
          </template>

          <template v-slot:footer.page-text="props">
            {{ props.pageStart }} - {{ props.pageStop }} de
            {{ props.itemsLength }}
          </template>

          <v-alert
            slot="no-data"
            :value="notRunRoute"
            class="warning"
            icon="warning"
          >
            You haven't chosen a route yet.
          </v-alert>
          <v-alert
            slot="no-data"
            :value="!notRunRoute"
            class="error"
            icon="warning"
          >
            No results found.
          </v-alert>
        </v-data-table>
      </v-col>
    </v-row>
    <v-snackbar :value="text != ''" :color="color" :top="true">
      {{ text }}
      <v-btn text @click="text = ''">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  mounted: async function() {
    try {
      this.loadingAggLogs = true;
      var response = await this.$request("get", "/users");
      this.users = {};

      for (var i = 0; i < response.data.length; i++) {
        this.users[response.data[i]._id] = response.data[i].email;
      }

      response = await this.$request("get", "/chaves");
      this.keys = {};

      for (i = 0; i < response.data.length; i++) {
        this.keys[response.data[i].id] = response.data[i].contactInfo;
      }

      response = await this.$request("get", "/logsAgregados");
      this.aggregateLogs = response.data;
      this.assocEmails(this.aggregateLogs, "lastAccess");
      this.loadingAggLogs = false;

      await this.getLogPage();
    } catch (error) {
      this.loadingAggLogs = false;
      this.loadingLogs = false;
      this.color = "error";
      this.text = error.response.data;
    }
  },
  data: () => ({
    users: {},
    keys: {},
    logs: [],
    downloadedLogs: [],
    totalLogs: 0,
    idLogs: [],
    routeLogs: [],
    sPage: 0,
    options: {},
    aggregateLogs: [],
    headersLogs: [
      { text: "Email", align: "center", value: "email", sortable: false },
      { text: "Type", align: "center", value: "type", sortable: false },
      { text: "Route", align: "center", value: "route", sortable: false },
      { text: "Method", align: "center", value: "method", sortable: false },
      {
        text: "HTTP Status",
        align: "center",
        value: "httpStatus",
        sortable: false
      },
      {
        text: "Accessed on",
        align: "center",
        value: "accessDate",
        sortable: false
      }
    ],
    headersAggLogs: [
      { text: "Email", align: "center", value: "email" },
      { text: "Type", align: "center", value: "type" },
      { text: "Number of GET requests", align: "center", value: "nGETs" },
      { text: "Number of POST requests", align: "center", value: "nPOSTs" },
      { text: "Number of PUT requests", align: "center", value: "nPUTs" },
      { text: "Number of DELETE requests", align: "center", value: "nDELETEs" },
      { text: "Last acess", align: "center", value: "lastAccess" }
    ],
    headersIdLogs: [
      { text: "Route", align: "center", value: "route" },
      { text: "Method", align: "center", value: "method" },
      { text: "HTTP Status", align: "center", value: "httpStatus" },
      { text: "Accessed on", align: "center", value: "accessDate" }
    ],
    headersRouteLogs: [
      { text: "Email", align: "center", value: "email" },
      { text: "Type", align: "center", value: "type" },
      { text: "HTTP Status", align: "center", value: "httpStatus" },
      { text: "Accessed on", align: "center", value: "accessDate" }
    ],
    footer_props: {
      "items-per-page-text": "Entries per page",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "All"
    },
    tipos: ["User", "Chave"],
    tipo: "",
    id: "",
    verbos: ["GET", "POST", "PUT", "DELETE"],
    verbo: "",
    caminho: "",
    regraV: [v => !!v || "Required, please select a value."],
    color: "",
    text: "",
    searchAggLog: "",
    loadingAggLogs: false,
    loadingLogs: false,
    loadingIdLogs: false,
    loadingRouteLogs: false,
    notRunRoute: true,
    notRunId: true
  }),

  methods: {
    getDateTime(string) {
      var dt = new Date(string);

      var d = String(dt.getDate()).padStart(2, "0");
      var m = String(dt.getMonth() + 1).padStart(2, "0");
      var y = dt.getFullYear();
      var date = y + "/" + m + "/" + d;

      var h = String(dt.getHours()).padStart(2, "0");
      var min = String(dt.getMinutes()).padStart(2, "0");
      var s = String(dt.getSeconds()).padStart(2, "0");
      var hour = h + ":" + min + ":" + s;

      return date + ", " + hour;
    },
    getColorStatus(httpStatus) {
      return httpStatus >= 500
        ? "red"
        : httpStatus >= 400
        ? "yellow"
        : httpStatus >= 300
        ? "cyan"
        : httpStatus >= 200
        ? "green"
        : "";
    },
    getColorMethod(method) {
      return method == "GET"
        ? "green"
        : method == "POST"
        ? "cyan"
        : method == "PUT"
        ? "orange"
        : method >= "DELETE"
        ? "red"
        : "";
    },
    getEmails(tipo) {
      var ret = [];
      var key = tipo == "User" ? "users" : "keys";
      Object.keys(this[key]).map(k =>
        ret.push({
          text: this[key][k],
          value: k
        })
      );
      return ret;
    },
    async getIdLogs() {
      this.loadingIdLogs = true;
      var response = await this.$request(
        "get",
        "/logs?tipo=" + this.tipo + "&id=" + this.id
      );
      this.idLogs = response.data;

      for (var i = 0; i < this.idLogs.length; i++) {
        this.idLogs[i].accessDate = this.getDateTime(this.idLogs[i].accessDate);
      }
      this.loadingIdLogs = false;
    },
    async getRouteLogs() {
      this.loadingRouteLogs = true;
      var response = await this.$request(
        "get",
        "/logs/" + this.verbo + "?rota=" + encodeURIComponent(this.caminho)
      );

      this.routeLogs = response.data;
      this.assocEmails(this.routeLogs, "accessDate");
      this.loadingRouteLogs = false;
    },
    assocEmails(list, keyDate) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].type == "Chave") {
          list[i].email = this.keys[list[i].id];
        } else {
          list[i].email = this.users[list[i].id];
        }

        list[i][keyDate] = this.getDateTime(list[i][keyDate]);
      }
    },
    async getLogPage() {
      this.loadingLogs = true;
      const sizeSPage = 2500;
      const { page, itemsPerPage } = this.options;

      if (page == 1 || page * itemsPerPage > sizeSPage * (this.sPage + 1)) {
        this.sPage = ((page - 1) * itemsPerPage) / sizeSPage;
        var response = await this.$request("get", "/logs?pagina=" + this.sPage);
        this.downloadedLogs = response.data.items;
        this.totalLogs = response.data.total;
        this.assocEmails(this.downloadedLogs, "accessDate");
      }

      this.logs = this.downloadedLogs.slice(
        (page - 1) * itemsPerPage - this.sPage * sizeSPage,
        page * itemsPerPage - this.sPage * sizeSPage
      );
      this.loadingLogs = false;
    }
  },
  watch: {
    options: {
      async handler() {
        await this.getLogPage();
      },
      deep: true
    }
  }
};
</script>
