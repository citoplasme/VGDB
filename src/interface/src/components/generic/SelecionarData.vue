<template>
  <v-menu
    ref="menu1"
    v-model="menu1"
    :close-on-content-click="false"
    :return-value.sync="dataValor"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        filled
        v-model="dataValor"
        label="Data: AAAA-MM-DD"
        prepend-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>

    <v-date-picker v-model="dataValor" no-title scrollable locale="pt">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu1 = false">Fechar</v-btn>
      <v-btn text color="primary" @click="dataSelecionada">Selecionar</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: ["d"],

  data() {
    return {
      dataValor: this.d,
      menu1: false
    };
  },

  methods: {
    dataSelecionada: function() {
      this.$refs.menu1.save(this.dataValor);
      this.$emit("dataSelecionada", this.dataValor);
      this.dataValor = "";
    }
  }
};
</script>
