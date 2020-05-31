<template>
  <tr @click="onRowClick(item)">
    <td class="subheading">{{ item.id }}</td>
    <td class="subheading">{{ item.title }}</td>
    <td @click.stop align="right">
      <v-icon
        v-for="(operacao, index) in item.operacoes"
        @click="doOperation(item, operacao)"
        :color="operacao.cor"
        :key="index"
        >{{ operacao.icon }}</v-icon
      >
    </td>
  </tr>
</template>

<script>
export default {
  props: ["item"],

  methods: {
    doOperation(item, operacao) {
      this.$emit("iconClicked", { operacao, item });
    },

    onRowClick(item) {
      this.$emit("rowClicked", item);
    }
  }
};
</script>
