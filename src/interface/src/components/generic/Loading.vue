<template>
  <v-col style="text-align:center;">
    <p>Loading {{ message }}...</p>
    <v-progress-circular
      indeterminate
      size="100"
      width="10"
      color="indigo accent-4"
    />
  </v-col>
</template>

<script>
export default {
  props: ["message"]
};
</script>
