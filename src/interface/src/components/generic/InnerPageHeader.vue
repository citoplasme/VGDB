<template>
  <v-app-bar color="indigo darken-4" dark>
    <v-btn to="/" icon>
      <v-icon large>home</v-icon>
    </v-btn>
    <v-toolbar-title class="headline">
      <span class="text-uppercase">CLAV</span>
    </v-toolbar-title>

    <v-toolbar-title class="subheading">
      <v-icon small>forward</v-icon>
    </v-toolbar-title>

    <v-toolbar-title class="subheading">
      <v-breadcrumbs :items="context">
        <template v-slot:divider>
          <v-icon>forward</v-icon>
        </template>
        <template v-slot:item="props">
          <a :href="props.item.href" style="color:white;">
            {{ props.item.text }}
          </a>
        </template>
      </v-breadcrumbs>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  props: ["specificContext"],

  data() {
    return {
      context: [
        {
          text: "Classes",
          href: "/classes"
        },
        {
          text: "Consultar",
          href: "/classes"
        }
      ]
    };
  }
};
</script>
