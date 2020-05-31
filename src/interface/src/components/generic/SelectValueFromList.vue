<template>
  <!-- 
    Componente genérico que permite selecionar um valor da lista que é passada como parâmetro;
    Sempre que o utilizador muda o valor é gerado um evento que envia o novo valor ao componente pai.

    Recebe como parâmetro um array de opções: options.
    Em que cada elemento é um objeto com dois campos: label e value.
     -->
  <select v-model="currentValue" @change="valueChange">
    <option v-for="op in options" :value="op.value" :key="op.value">
      {{ op.label }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    initialValue: {
      type: String
    },
    options: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    currentValue: "Indefinido"
  }),

  methods: {
    valueChange: function() {
      this.$emit("value-change", this.currentValue);
      this.currentValue = this.initialValue;
    }
  },

  created: function() {
    if (this.initialValue) this.currentValue = this.initialValue;
  }
};
</script>
