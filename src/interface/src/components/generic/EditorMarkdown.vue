<template>
  <v-col>
    <v-textarea
      auto-grow
      solo
      clearable
      color="indigo"
      counter="3000"
      v-model="texto"
      maxlength="3000"
      ref="descricao"
      @click:clear="custom_clear()"
      @input="updateText"
    ></v-textarea>
    <v-toolbar dense short flat>
      <v-toolbar-title>Text Elements</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn small text @click="addHeader" v-on="on"
            ><v-icon>title</v-icon></v-btn
          >
        </template>
        <span>Title</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn small text @click="addBold" v-on="on"
            ><v-icon>format_bold</v-icon></v-btn
          >
        </template>
        <span>Bold</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn small text @click="addItalic" v-on="on"
            ><v-icon>format_italic</v-icon></v-btn
          >
        </template>
        <span>Italic</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn small text @click="addChain" v-on="on"
            ><v-icon>strikethrough_s</v-icon></v-btn
          >
        </template>
        <span>Strike Through</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn small text @click="addLink" v-on="on"
            ><v-icon>insert_link</v-icon></v-btn
          >
        </template>
        <span>Link</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn small text @click="addLine" v-on="on"
            ><v-icon>minimize</v-icon></v-btn
          >
        </template>
        <span>Horizontal Line</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn small text @click="addListItem" v-on="on"
            ><v-icon>format_list_bulleted</v-icon></v-btn
          >
        </template>
        <span>Bulleted List Item</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn small text @click="addListItemNumbered" v-on="on"
            ><v-icon>format_list_numbered</v-icon></v-btn
          >
        </template>
        <span>Numbered List Item</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn small text @click="addTable" v-on="on"
            ><v-icon>table_chart</v-icon></v-btn
          >
        </template>
        <span>Table</span>
      </v-tooltip>
      <v-dialog v-model="dialog" width="50%">
        <template v-slot:activator="{ on }">
          <v-btn small dark rounded class="indigo darken-3" v-on="on"
            ><v-icon>visibility</v-icon>Preview</v-btn
          >
        </template>
        <v-card>
          <v-card-title>Preview</v-card-title>
          <v-card-text>
            <p class="text-justify" v-html="compiledMarkdown(this.texto)" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="indigo darken-1" text @click="dialog = false"
              >Resume Work</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </v-col>
</template>

<script>
import marked from "marked";

export default {
  props: ["value"],
  data: nt => ({
    dialog: false,
    snackbar: false,
    texto: ""
  }),
  methods: {
    updateText(e) {
      //this.$refs.descricao.value
      this.$emit("input", this.texto);
    },
    // fechar o snackbar em caso de erro
    fecharSnackbar() {
      this.snackbar = false;
    },
    custom_clear() {
      this.texto = "";
      this.updateText();
    },
    addHeader() {
      let textarea = this.$refs.descricao;
      let val = textarea.$refs.input;
      let start = val.selectionStart;
      let end = val.selectionEnd;
      let tmpStr = textarea.value;
      var insert = "";
      if (!this.texto) {
        this.texto = "";
        tmpStr = "";
      }

      // insert:
      if (end == start) {
        insert = "\n# Title  \n";
      } else {
        insert = "\n# " + tmpStr.substring(start, end) + "  \n";
      }
      this.texto =
        tmpStr.substring(0, start) +
        insert +
        tmpStr.substring(end, tmpStr.length);

      this.updateText();

      // move cursor:
      setTimeout(() => {
        start += insert.length;
        val.selectionStart = val.selectionEnd = start;
      }, 10);
    },
    addBold() {
      let textarea = this.$refs.descricao;
      let val = textarea.$refs.input;
      let start = val.selectionStart;
      let end = val.selectionEnd;
      let tmpStr = textarea.value;
      var insert = "";
      if (!this.texto) {
        this.texto = "";
        tmpStr = "";
      }

      // insert:
      if (end == start) {
        insert = " __text__ ";
      } else {
        insert = " __" + tmpStr.substring(start, end) + "__ ";
      }
      this.texto =
        tmpStr.substring(0, start) +
        insert +
        tmpStr.substring(end, tmpStr.length);

      this.updateText();

      // move cursor:
      setTimeout(() => {
        start += insert.length;
        val.selectionStart = val.selectionEnd = start;
      }, 10);
    },
    addItalic() {
      let textarea = this.$refs.descricao;
      let val = textarea.$refs.input;
      let start = val.selectionStart;
      let end = val.selectionEnd;
      let tmpStr = textarea.value;
      var insert = "";
      if (!this.texto) {
        this.texto = "";
        tmpStr = "";
      }

      // insert:
      if (end == start) {
        insert = " *text* ";
      } else {
        insert = " *" + tmpStr.substring(start, end) + "* ";
      }
      this.texto =
        tmpStr.substring(0, start) +
        insert +
        tmpStr.substring(end, tmpStr.length);

      this.updateText();

      // move cursor:
      setTimeout(() => {
        start += insert.length;
        val.selectionStart = val.selectionEnd = start;
      }, 10);
    },
    addChain() {
      let textarea = this.$refs.descricao;
      let val = textarea.$refs.input;
      let start = val.selectionStart;
      let end = val.selectionEnd;
      let tmpStr = textarea.value;
      var insert = "";
      if (!this.texto) {
        this.texto = "";
        tmpStr = "";
      }

      // insert:
      if (end == start) {
        insert = " ~~text~~ ";
      } else {
        insert = " ~~" + tmpStr.substring(start, end) + "~~ ";
      }
      this.texto =
        tmpStr.substring(0, start) +
        insert +
        tmpStr.substring(end, tmpStr.length);

      this.updateText();

      // move cursor:
      setTimeout(() => {
        start += insert.length;
        val.selectionStart = val.selectionEnd = start;
      }, 10);
    },
    addLink() {
      let textarea = this.$refs.descricao;
      let val = textarea.$refs.input;
      let start = val.selectionStart;
      let end = val.selectionEnd;
      let tmpStr = textarea.value;
      var insert = "";
      if (!this.texto) {
        this.texto = "";
        tmpStr = "";
      }

      // insert:
      if (end == start) {
        insert = " [text](http://link) ";
      } else {
        insert = " [" + tmpStr.substring(start, end) + "](http://link) ";
      }
      this.texto =
        tmpStr.substring(0, start) +
        insert +
        tmpStr.substring(end, tmpStr.length);

      this.updateText();

      // move cursor:
      setTimeout(() => {
        start += insert.length;
        val.selectionStart = val.selectionEnd = start;
      }, 10);
    },
    addLine() {
      let textarea = this.$refs.descricao;
      let val = textarea.$refs.input;
      let start = val.selectionStart;
      let end = val.selectionEnd;
      let tmpStr = textarea.value;
      var insert = "";
      if (!this.texto) {
        this.texto = "";
        tmpStr = "";
      }

      // insert:
      if (end == start) {
        insert = "\n___  \n  ";
        this.texto =
          tmpStr.substring(0, start) +
          insert +
          tmpStr.substring(end, tmpStr.length);
      } else {
        insert = "\n___  \n  ";
        this.texto =
          tmpStr.substring(0, end) +
          insert +
          tmpStr.substring(end, tmpStr.length);
      }

      this.updateText();

      // move cursor:
      setTimeout(() => {
        start += insert.length;
        val.selectionStart = val.selectionEnd = start;
      }, 10);
    },
    addListItem() {
      let textarea = this.$refs.descricao;
      let val = textarea.$refs.input;
      let start = val.selectionStart;
      let end = val.selectionEnd;
      let tmpStr = textarea.value;
      var insert = "";
      if (!this.texto) {
        this.texto = "";
        tmpStr = "";
      }

      // insert:
      if (end == start) {
        insert = "* Item ";
      } else {
        insert = "* " + tmpStr.substring(start, end) + "  \n";
      }
      this.texto =
        tmpStr.substring(0, start) +
        insert +
        tmpStr.substring(end, tmpStr.length);

      this.updateText();

      // move cursor:
      setTimeout(() => {
        start += insert.length;
        val.selectionStart = val.selectionEnd = start;
      }, 10);
    },
    addListItemNumbered() {
      let textarea = this.$refs.descricao;
      let val = textarea.$refs.input;
      let start = val.selectionStart;
      let end = val.selectionEnd;
      let tmpStr = textarea.value;
      var insert = "";
      if (!this.texto) {
        this.texto = "";
        tmpStr = "";
      }
      // Calcular os índices que perteçam a uma lista numerada
      var items = tmpStr.substring(0, start).match(/^(\s*)\d+\.\s+.*/gm);
      //var items = tmpStr.match(/^(\s*)\d+\.\s+.*/gm);
      var max = 0;
      if (items) {
        items.forEach(element => {
          var i = parseInt(element.match(/\d+(?=\.)/g)[0], 10);
          max = i > max ? i : max;
        });
      }
      max++;
      // insert:
      if (end == start) {
        insert = max + ". Item \n";
      } else {
        insert = max + ". " + tmpStr.substring(start, end) + "  \n";
      }
      this.texto =
        tmpStr.substring(0, start) +
        insert +
        tmpStr.substring(end, tmpStr.length);

      this.updateText();

      // move cursor:
      setTimeout(() => {
        start += insert.length;
        val.selectionStart = val.selectionEnd = start;
      }, 10);
    },
    addTable() {
      let textarea = this.$refs.descricao;
      let val = textarea.$refs.input;
      let start = val.selectionStart;
      let end = val.selectionEnd;
      let tmpStr = textarea.value;
      if (!this.texto) {
        this.texto = "";
        tmpStr = "";
      }
      var insert =
        "\n|  X  |  Y  |  Z  |\n|:----:|:----:|:----:|\n|  1  |  2  |  3  | ";

      this.texto =
        tmpStr.substring(0, start) +
        insert +
        tmpStr.substring(end, tmpStr.length);

      this.updateText();

      // move cursor:
      setTimeout(() => {
        start += insert.length;
        val.selectionStart = val.selectionEnd = start;
      }, 10);
    },
    compiledMarkdown: function(d) {
      //return marked(d || "", { sanitize: true });
      return marked(d || "");
    }
  },
  created: async function() {
    this.texto = this.value;
  }
};
</script>

<style scoped>
.expansion-panel-heading {
  background-color: #283593 !important;
  color: #fff;
  font-size: large;
  font-weight: bold;
}

.card-heading {
  font-size: x-large;
  font-weight: bold;
}

.info-label {
  color: #283593; /* indigo darken-3 */
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e8eaf6; /* indigo lighten-5 */
  font-weight: bold;
  margin: 5px;
  border-radius: 3px;
}
</style>
