<template>
  <v-row>
    <v-col cols="2">
      <v-subheader class="info-label">Selecionar Entidades</v-subheader>
    </v-col>
    <v-col v-if="entidadesReady">
      <v-card>
        <v-card-title>
          <v-text-field
            filled
            v-model="searchEntidades"
            append-icon="search"
            label="Filtrar entidades"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="entidadesHeaders"
          :items="entidades"
          :search="searchEntidades"
          item-key="id"
          class="elevation-1"
          :footer-props="footer_props"
        >
          <template v-slot:item="props">
            <tr @click="selectEntidade(props.item)">
              <td>{{ props.item.sigla }}</td>
              <td>{{ props.item.designacao }}</td>
            </tr>
          </template>

          <template v-slot:pageText="props">
            {{ props.pageStart }} - {{ props.pageStop }} de
            {{ props.itemsLength }}
          </template>

          <v-alert v-slot:no-results :value="true" color="error" icon="warning"
            >A procura por "{{ search }}" não deu resultados.</v-alert
          >
        </v-data-table>
      </v-card>
    </v-col>
    <v-col v-else>
      <v-subheader>A carregar entidades...</v-subheader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["entidades", "entidadesReady"],

  data: function() {
    return {
      searchEntidades: "",
      footer_props: {
        "items-per-page-text": "Linhas por página"
      },
      entidadesHeaders: [
        { text: "Sigla", align: "left", value: "sigla" },
        { text: "Designação", value: "designacao" }
      ]
    };
  },

  methods: {
    go: function(idClasse) {
      this.$router.push("/entidades/" + idClasse);
      this.$router.go();
    },
    selectEntidade: function(entidade) {
      this.$emit("selectEntidade", entidade);
    }
  }
};
</script>

<style scoped>
.info-label {
  color: #1a237e; /* indigo darken-4 */
  padding: 5px;
  font-weight: 400;
  width: auto;
  height: auto;
  background-color: #e8eaf6; /* indigo lighten-5 */
  font-weight: bold;
  margin: 5px;
  border-radius: 3px;
}
</style>
