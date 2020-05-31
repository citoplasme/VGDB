<template>
  <v-row>
    <v-col cols="2">
      <v-subheader class="info-label">Selecionar Processos</v-subheader>
    </v-col>
    <v-col v-if="processosReady">
      <v-card>
        <v-card-title>
          <v-text-field
            filled
            v-model="searchProcessos"
            append-icon="search"
            label="Filtrar Processos de negócio"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="processosHeaders"
          :items="processos"
          :search="searchProcessos"
          item-key="id"
          class="elevation-1"
          :footer-props="footer_props"
        >
          <template v-slot:item="props">
            <tr @click="selectProcesso(props.item)">
              <td>{{ props.item.codigo }}</td>
              <td>{{ props.item.titulo }}</td>
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
    <v-col v-else style="text-align:center;">
      <p>A carregar processos...</p>
      <v-progress-circular
        indeterminate
        size="100"
        width="10"
        color="indigo accent-4"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["processos", "processosReady"],

  data: function() {
    return {
      searchProcessos: "",
      footer_props: {
        "items-per-page-text": "Linhas por página"
      },
      processosHeaders: [
        { text: "Código", align: "left", value: "codigo" },
        { text: "Designação", value: "titulo" }
      ]
    };
  },

  methods: {
    selectProcesso: function(processo) {
      this.$emit("selectProcesso", processo);
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
