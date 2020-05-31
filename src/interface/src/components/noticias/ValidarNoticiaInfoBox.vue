<template>
  <v-col>
    <!-- Infobox com os resultados da validação -->
    <v-btn dark rounded class="indigo darken-3" @click="validarNoticia"
      >News Validation</v-btn
    >

    <!-- Erros na Validação ....................... -->
    <v-dialog v-model="dialog" width="70%">
      <v-card>
        <v-card-title
          >Errors detected during validation:
          {{ mensagensErro.length }}</v-card-title
        >
        <v-card-text>
          <v-row v-for="(m, i) in mensagensErro" :key="i">
            <v-col cols="2">
              <div class="info-label">{{ m.sobre }}</div>
            </v-col>
            <v-col>
              <div class="info-content">{{ m.mensagem }}</div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="red darken-4" dark @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Validação não detetou erros ........... -->
    <v-dialog v-model="dialogSemErros" width="30%">
      <v-card>
        <v-card-title>Validation without errors</v-card-title>
        <v-card-text>
          <p>The information does not contain errors.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="indigo darken-1" dark @click="dialogSemErros = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  props: ["t", "acao"],

  data() {
    return {
      dialog: false,
      dialogSemErros: false,

      mensagensErro: [],
      numeroErros: 0
    };
  },

  watch: {
    dialog: function(val) {
      if (!val) this.limpaErros();
    }
  },

  methods: {
    async validarNoticiaAll() {
      let parseAno = this.t.data.split("-");

      //Título
      if (this.t.titulo == "" || this.t.titulo == null) {
        this.mensagensErro.push({
          sobre: "Title",
          mensagem: "The title can't be empty."
        });
        this.numeroErros++;
      }

      // Data
      if (this.t.data == "" || this.t.data == null) {
        this.mensagensErro.push({
          sobre: "Date",
          mensagem: "The date can't be empty."
        });
        this.numeroErros++;
      } else if (!/[0-9]+-[0-9]+-[0-9]+/.test(this.t.data)) {
        this.mensagensErro.push({
          sobre: "Date",
          mensagem: "The date is in the wrong format"
        });
        this.numeroErros++;
      } else {
        let date = new Date();

        let ano = parseInt(this.t.data.slice(0, 4));
        let mes = parseInt(this.t.data.slice(5, 7));
        let dia = parseInt(this.t.data.slice(8, 10));

        let dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (mes > 12) {
          this.mensagensErro.push({
            sobre: "Date",
            mensagem: "The date contains the wrong month."
          });
          this.numeroErros++;
        } else if (dia > dias[mes - 1]) {
          if (mes == 2) {
            if (!(ano % 4 == 0 && mes == 2 && dia == 29)) {
              this.mensagensErro.push({
                sobre: "Date",
                mensagem: "The date contains the wrong day of the month."
              });
              this.numeroErros++;
            }
          } else {
            this.mensagensErro.push({
              sobre: "Date",
              mensagem: "The date contains the wrong day of the month."
            });
            this.numeroErros++;
          }
        } else if (ano > parseInt(date.getFullYear())) {
          this.mensagensErro.push({
            sobre: "Date",
            mensagem:
              "Invalid year. Please select a date that is earlier than the current one."
          });
          this.numeroErros++;
        } else if (
          ano == parseInt(date.getFullYear()) &&
          mes > parseInt(date.getMonth() + 1)
        ) {
          this.mensagensErro.push({
            sobre: "Date",
            mensagem:
              "Invalid month. Please select a date that is earlier than the current one."
          });
          this.numeroErros++;
        } else if (
          ano == parseInt(date.getFullYear()) &&
          mes == parseInt(date.getMonth() + 1) &&
          dia > parseInt(date.getDate())
        ) {
          this.mensagensErro.push({
            sobre: "Date",
            mensagem:
              "Invalid day. Please select a date that is earlier than the current one."
          });
          this.numeroErros++;
        }
      }

      // Descrição
      if (this.t.desc == "" || this.t.desc == null) {
        this.mensagensErro.push({
          sobre: "Description",
          mensagem: "The description can't be empty."
        });
        this.numeroErros++;
      }
    },

    async validarNoticia() {
      switch (this.acao) {
        case "Criação":
          this.validarNoticiaAll();
          break;

        case "Alteração":
          this.validarNoticiaAll();
          break;
        default:
          break;
      }

      if (this.numeroErros > 0) {
        this.dialog = true;
      } else {
        this.dialogSemErros = true;
      }
    },

    limpaErros: function() {
      this.numeroErros = 0;
      this.mensagensErro = [];
    }
  }
};
</script>

<style scoped>
.info-label {
  color: #283593; /* indigo darken-3 */
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e8eaf6; /* indigo lighten-5 */
  font-weight: bold;
  border-radius: 3px;
}

.info-content {
  padding: 5px;
  width: 100%;
  border: 1px solid #283593;
  border-radius: 3px;
}
</style>
