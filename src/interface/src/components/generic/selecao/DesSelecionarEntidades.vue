<template>
  <v-row>
    <v-col cols="2">
      <v-subheader class="info-label">Entidades selecionadas</v-subheader>
    </v-col>
    <v-col v-if="entidades.length > 0">
      <v-data-table
        :headers="headers"
        :items="entidades"
        :items-per-page="100"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:item="props">
          <tr>
            <td>{{ props.item.sigla }}</td>
            <td>{{ props.item.designacao }}</td>
            <td>
              <v-btn
                small
                color="red darken-2"
                dark
                rounded
                @click="unselectEntidade(props.item)"
              >
                <v-icon dark>remove_circle_outline</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
    <v-col v-else>
      <v-alert :value="true" type="warning"
        >Não tem entidades selecionadas...</v-alert
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["entidades", "tipo"],

  data: function() {
    return {
      headers: [
        {
          text: "Sigla",
          align: "left",
          value: "sigla",
          class: ["body-2", "font-weight-bold"]
        },
        {
          text: "Designação",
          value: "designacao",
          class: ["body-2", "font-weight-bold"]
        },
        { text: "Remover", class: ["body-2", "font-weight-bold"] }
      ]
    };
  },

  methods: {
    go: function(idClasse) {
      this.$router.push("/entidades/" + idClasse);
      this.$router.go();
    },
    unselectEntidade: function(entidade) {
      this.$emit("unselectEntidade", entidade);
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
