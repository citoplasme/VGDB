<template>
  <tr @click="onRowClick(item)">
    <td class="subheading">{{ item.termo }}</td>
    <td class="subheading">{{ item.idClasse }}</td>
    <td class="subheading">{{ item.tituloClasse }}</td>
  </tr>
</template>

<script>
export default {
  props: ["item"],

  methods: {
    onRowClick(item) {
      this.$emit("rowClicked", item);
    }
  }
};
</script>
