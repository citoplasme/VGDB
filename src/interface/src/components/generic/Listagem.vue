<template>
  <v-card class="ma-8">
    <v-card-title class="indigo darken-4 white--text" dark>
      {{ tipo }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Filtrar"
        single-line
        hide-details
        dark
      ></v-text-field>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="lista"
        :search="search"
        class="elevation-1"
        :footer-props="footer_props"
        v-if="this.headers[this.cabecalho.length - 1]"
      >
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning"
            >Não foram encontrados resultados para "{{ search }}".</v-alert
          >
        </template>

        <template v-slot:item="props">
          <ListagemTI
            v-if="tipo === 'Termos de Índice'"
            :item="props.item"
            @rowClicked="go($event.idClasse)"
          />

          <ListagemTE
            v-else-if="tipo == 'Entidades' || tipo == 'Tipologias de Entidade'"
            :item="props.item"
            @rowClicked="go($event.id)"
            @iconClicked="
              switchOperacao($event.operacao.descricao, $event.item.id)
            "
          />

          <ListagemLegislacao
            v-else-if="tipo == 'Legislação'"
            :item="props.item"
            @rowClicked="go($event.numero)"
            @iconClicked="
              switchOperacao($event.operacao.descricao, $event.item.id)
            "
          />

          <ListagemNot
            v-else-if="tipo == 'Notícias'"
            :item="props.item"
            @rowClicked="go($event.id)"
            @iconClicked="
              switchOperacao($event.operacao.descricao, props.item.id)
            "
          />

          <tr
            v-else-if="tipo == 'Autos de Eliminação'"
            @click="go(props.item.id)"
          >
            <td v-for="(campo, index) in props.item" v-bind:key="index">
              <div v-if="props.item">
                <div v-if="index === 'entidade'">
                  <a :href="'/entidades/ent_' + campo">{{ campo }}</a>
                </div>
                <div v-else>{{ campo }}</div>
              </div>
            </td>
          </tr>

          <tr v-else @click="go(props.item.id)">
            <td v-for="(campo, index) in props.item" v-bind:key="index">
              <div>{{ campo }}</div>
            </td>
          </tr>
        </template>

        <template v-slot:pageText="props">
          Resultados: {{ props.pageStart }} - {{ props.pageStop }} de
          {{ props.itemsLength }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import ListagemTI from "@/components/generic/ListagemTI";
import ListagemTE from "@/components/generic/ListagemTE";
import ListagemLegislacao from "@/components/generic/ListagemLegislacao";
import ListagemNot from "@/components/generic/ListagemNot";

export default {
  props: ["lista", "tipo", "cabecalho", "campos", "ids"],
  components: {
    ListagemTI,
    ListagemTE,
    ListagemLegislacao,
    ListagemNot
  },
  data: () => ({
    search: "",
    headers: [],
    dialog: false,
    footer_props: {
      "items-per-page-options": [10, 20, 100],
      "items-per-page-text": "Mostrar"
    }
  }),
  methods: {
    go(id) {
      let idLeg = "";
      switch (this.tipo) {
        case "Entidades":
          this.$router.push("/entidades/ent_" + id);
          break;
        case "Tipologias de Entidade":
          this.$router.push("/tipologias/tip_" + id);
          break;
        case "Legislação":
          for (let i = 0; i < this.ids.length; i++) {
            if (this.ids[i].numero === id) {
              idLeg = this.ids[i].id;
              break;
            }
          }
          this.$router.push("/legislacao/" + idLeg);
          break;
        case "Termos de Índice":
          this.$router.push("/classes/consultar/c" + id);
          break;
        case "Autos de Eliminação":
          this.$router.push("/autosEliminacao/ae_" + id);
          break;
        case "Notícias":
          this.$router.push("/noticias/" + id);
          break;
      }
    },

    goEditar(id) {
      switch (this.tipo) {
        case "Entidades":
          this.$router.push("/entidades/editar/ent_" + id);
          break;
        case "Tipologias de Entidade":
          this.$router.push("/tipologias/editar/tip_" + id);
          break;
        case "Legislação":
          this.$router.push("/legislacao/editar/" + id);
          break;
        case "Notícias":
          this.$router.push("/noticias/editar/" + id);
          break;
        // case "Termos de Índice":
        //   this.$router.push("/classes/consultar/c" + id);
        //   break;
        // case "Autos de Eliminação":
        //   this.$router.push("/autosEliminacao/ae_" + id);
        //   break;
        default:
          this.$router.push("/");
          break;
      }
    },

    switchOperacao(op, id) {
      switch (op) {
        case "Alteração":
          this.goEditar(id);
          break;

        case "Remoção":
          break;

        default:
          break;
      }
    }
  },
  created: function() {
    try {
      for (let i = 0; i < this.cabecalho.length; i++) {
        if (this.campos[i] === "operacoes")
          this.headers[i] = {
            text: this.cabecalho[i],
            value: this.campos[i],
            align: "end",
            width: "10%"
          };
        else
          this.headers[i] = {
            text: this.cabecalho[i],
            value: this.campos[i]
          };
      }
    } catch (e) {
      return e;
    }
  }
};
</script>
