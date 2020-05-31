<template>
  <tr @click="onRowClick(item)">
    <td class="subheading">{{ item.data }}</td>
    <td class="subheading">{{ item.tipo }}</td>
    <td class="subheading">
      <div v-for="(ent, index) in item.entidades.split(',')" :key="index">
        <a :href="'/entidades/ent_' + ent">{{ ent }}</a>
      </div>
    </td>
    <td class="subheading">{{ item.numero }}</td>
    <td class="subheading">{{ item.sumario }}</td>
    <td @click.stop align="right">
      <v-icon
        v-for="(operacao, index) in item.operacoes"
        @click="doOperation(item, operacao)"
        color="indigo darken-2"
        :key="index"
        class="mr-2"
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
