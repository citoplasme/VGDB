<template>
  <v-card class="ma-4">
    <v-card-title
      v-if="tipo === 'Legislação'"
      class="indigo darken-4 white--text"
    >
      {{ titulo }}
      <InfoBox
        header="Tipo + Entidade + Número"
        :text="
          myhelp.Legislacao.Campos.Tipo +
            ' + ' +
            myhelp.Legislacao.Campos.Entidades +
            ' + ' +
            myhelp.Legislacao.Campos.Numero
        "
      />
    </v-card-title>

    <v-card-title v-else class="indigo darken-4 white--text">{{
      titulo
    }}</v-card-title>

    <v-card-text>
      <v-row v-for="(item, index) in objeto" v-bind:key="index">
        <v-col cols="2" v-if="item.text">
          <div class="info-label">
            {{ item.campo }}
            <InfoBox
              v-if="tipo === 'Entidades'"
              :header="item.campo"
              :text="myhelp.Entidade.Campos[item.campo]"
              helpColor="indigo darken-4"
            />
            <InfoBox
              v-if="tipo === 'Tipologias'"
              :header="item.campo"
              :text="myhelp.Tipologias.Campos[item.campo]"
              helpColor="indigo darken-4"
            />
            <InfoBox
              v-if="tipo === 'Legislação'"
              :header="item.campo"
              :text="myhelp.Legislacao.Campos[item.campo]"
              helpColor="indigo darken-4"
            />
          </div>
        </v-col>

        <v-col v-if="item.text">
          <div v-if="item.campo === 'Link'" class="info-content">
            <a :href="item.text" target="_blank">{{ item.text }}</a>
          </div>
          <div v-else>
            <div v-if="item.campo === 'Entidades'" class="info-content">
              <a
                v-for="(ent, index) in item.text.split(' ')"
                v-bind:key="index"
                :href="'/entidades/ent_' + ent"
                >{{ ent }}</a
              >
            </div>
            <div v-else class="info-content">{{ item.text }}</div>
          </div>
        </v-col>
      </v-row>

      <!-- Consulta de Entidade: tipologias a que pertence -->
      <v-row v-if="tipo == 'Entidades' && listaTip.length">
        <v-col cols="2">
          <div class="info-label">
            Tipologias de Entidade
            <InfoBox
              header="Tipologias de Entidade"
              :text="myhelp.Entidade.Campos.Tipologias"
              helpColor="indigo darken-4"
            />
          </div>
        </v-col>
        <v-col>
          <ul class="info-content">
            <li v-for="(l, index) in listaTip" v-bind:key="index">
              <a :href="'/tipologias/' + l.id">{{ l.sigla }}</a>
              -
              {{ l.designacao }}
            </li>
          </ul>
        </v-col>
      </v-row>

      <!-- Consulta de Entidade: Natureza de intervenção nos PNs -->
      <v-card v-if="tipo === 'Entidades' && listaProcD.length">
        <v-card-title class="indigo darken-4 white--text"
          >Natureza de intervenção nos Processos de Negócio</v-card-title
        >

        <v-card-text>
          <v-row v-if="listaProcD.length">
            <v-col cols="2">
              <div class="info-label">
                Como Dono
                <InfoBox
                  header="Intervenção nos PNs como Dono"
                  :text="myhelp.Entidade.Intervencoes.Dono"
                  helpColor="indigo darken-4"
                />
              </div>
            </v-col>
            <v-col>
              <ul
                class="info-content"
                :class="{ 'is-collapsed': domainCollapsed }"
              >
                <li v-for="(l, index) in listaProcD" v-bind:key="index">
                  <a :href="'/classes/consultar/c' + l.codigo">{{
                    l.codigo
                  }}</a>
                  - {{ l.titulo }}
                </li>
              </ul>
              <a
                @click="domainCollapsed = !domainCollapsed"
                v-if="listaProcD.length > 6"
              >
                <span v-if="domainCollapsed" style="color:#283593;"
                  >Mostrar mais...</span
                >
                <span v-else style="color:#283593;">Mostrar menos...</span>
              </a>
            </v-col>
          </v-row>

          <v-row v-if="parts">
            <v-col cols="2">
              <div class="info-label">
                Como Participante
                <InfoBox
                  header="Intervenção nos PNs como Participante"
                  :text="myhelp.Entidade.Intervencoes.Participante"
                  helpColor="indigo darken-4"
                />
              </div>
            </v-col>

            <v-col>
              <ul
                v-for="(key, index) in Object.keys(listaProcP)"
                v-bind:key="index"
                style="padding-left:5px;"
              >
                <li v-if="listaProcP[key].length > 0">
                  <b v-if="listaProcP[key].length > 0"
                    >{{ participationsDic[key] }}:</b
                  >
                  <ul
                    class="info-content"
                    :class="{ 'is-collapsed': partsCollapsed[key] }"
                  >
                    <li
                      v-for="(p, index) in listaProcP[key]"
                      v-bind:key="index"
                    >
                      <a :href="'/classes/consultar/c' + p.codigo">{{
                        p.codigo
                      }}</a>
                      - {{ p.titulo }}
                    </li>
                  </ul>
                  <a
                    @click="partsCollapsed[key] = !partsCollapsed[key]"
                    v-if="listaProcP[key].length > 6"
                  >
                    <span v-if="partsCollapsed[key]" style="color:#283593;"
                      >Mostrar mais...</span
                    >
                    <span v-else style="color:#283593;">Mostrar menos...</span>
                  </a>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Consulta de Tipologia: Natureza de intervenção nos PNs -->
      <v-card v-if="tipo === 'Tipologias' && listaProcD.length">
        <v-card-title class="indigo darken-4 white--text"
          >Natureza de intervenção nos Processos de Negócio</v-card-title
        >

        <v-card-text>
          <v-row v-if="listaProcD.length">
            <v-col cols="2">
              <div class="info-label">
                Como Dono
                <InfoBox
                  header="Intervenção nos PNs como Dono"
                  :text="myhelp.Tipologias.Intervencoes.Dono"
                  helpColor="indigo darken-4"
                />
              </div>
            </v-col>
            <v-col>
              <ul
                class="info-content"
                :class="{ 'is-collapsed': domainCollapsed }"
              >
                <li v-for="(l, index) in listaProcD" v-bind:key="index">
                  <a :href="'/classes/consultar/c' + l.codigo">{{
                    l.codigo
                  }}</a>
                  - {{ l.titulo }}
                </li>
              </ul>
              <a
                @click="domainCollapsed = !domainCollapsed"
                v-if="listaProcD.length > 6"
              >
                <span v-if="domainCollapsed" style="color:#283593;"
                  >Mostrar mais...</span
                >
                <span v-else style="color:#283593;">Mostrar menos...</span>
              </a>
            </v-col>
          </v-row>

          <v-row v-if="parts">
            <v-col cols="2">
              <div class="info-label">
                Como Participante
                <InfoBox
                  header="Intervenção nos PNs como Participante"
                  :text="myhelp.Tipologias.Intervencoes.Participante"
                  helpColor="indigo darken-4"
                />
              </div>
            </v-col>

            <v-col>
              <ul
                v-for="(key, index) in Object.keys(listaProcP)"
                v-bind:key="index"
              >
                <li v-if="listaProcP[key].length > 0">
                  <b v-if="listaProcP[key].length > 0"
                    >{{ participationsDic[key] }}:</b
                  >
                  <ul
                    class="info-content"
                    :class="{ 'is-collapsed': partsCollapsed[key] }"
                  >
                    <li
                      v-for="(p, index) in listaProcP[key]"
                      v-bind:key="index"
                    >
                      <a :href="'/classes/consultar/c' + p.codigo">{{
                        p.codigo
                      }}</a>
                      - {{ p.titulo }}
                    </li>
                  </ul>
                  <a
                    @click="partsCollapsed[key] = !partsCollapsed[key]"
                    v-if="listaProcP[key].length > 6"
                  >
                    <span v-if="partsCollapsed[key]" style="color:#283593;"
                      >Mostrar mais...</span
                    >
                    <span v-else style="color:#283593;">Mostrar menos...</span>
                  </a>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Consulta de Tipologia: entidades pertencentes à Tipologia -->
      <v-row v-if="tipo === 'Tipologias' && listaEnt.length">
        <v-col cols="2">
          <div class="info-label">
            Entidades
            <InfoBox
              header="Entidades"
              :text="myhelp.Tipologias.Campos.Entidades"
              helpColor="indigo darken-4"
            />
          </div>
        </v-col>
        <v-col>
          <ul class="info-content" :class="{ 'is-collapsed': entCollapsed }">
            <li v-for="(l, index) in listaEnt" v-bind:key="index">
              <a :href="'/entidades/' + l.id">{{ l.sigla }}</a>
              -
              {{ l.designacao }}
            </li>
          </ul>
          <a @click="entCollapsed = !entCollapsed" v-if="listaEnt.length > 6">
            <span v-if="entCollapsed" style="color:#283593;"
              >Mostrar mais...</span
            >
            <span v-else style="color:#283593;">Mostrar menos...</span>
          </a>
        </v-col>
      </v-row>

      <!-- Consulta de legislação: processos regulados -->
      <v-row v-if="tipo === 'Legislação' && listaReg.length">
        <v-col cols="2">
          <div class="info-label">
            Processos de negócio que regula ou enquadra
            <InfoBox
              header="Processos de negócio que regula ou enquadra"
              :text="myhelp.Legislacao.Campos.ProcessosRegulados"
              helpColor="indigo darken-4"
            />
          </div>
        </v-col>
        <v-col>
          <ul class="info-content">
            <li v-for="(l, index) in listaReg" v-bind:key="index">
              <a :href="'/classes/consultar/' + l.id">{{ l.codigo }}</a>
              - {{ l.titulo }}
            </li>
          </ul>
        </v-col>
      </v-row>

      <v-spacer />

      <v-row>
        <v-col>
          <v-btn
            class="indigo accent-4 white--text mr-4"
            @click="$router.go(-1)"
            >Voltar</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
const help = require("@/config/help").help;
import InfoBox from "@/components/generic/infoBox.vue";

export default {
  props: [
    "tipo",
    "objeto",
    "titulo",
    "listaTip",
    "listaProcD",
    "listaProcP",
    "listaEnt",
    "listaReg",
    "parts"
  ],
  components: {
    InfoBox
  },
  data: () => ({
    domainCollapsed: true,
    entCollapsed: true,
    partsCollapsed: {
      Apreciador: true,
      Assessor: true,
      Comunicador: true,
      Decisor: true,
      Executor: true,
      Iniciador: true
    },
    participationsDic: {
      Apreciador: "Apreciar",
      Assessor: "Assessorar",
      Comunicador: "Comunicar",
      Decisor: "Decidir",
      Executor: "Executar",
      Iniciador: "Iniciar"
    },
    myhelp: help
  })
};
</script>

<style>
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
