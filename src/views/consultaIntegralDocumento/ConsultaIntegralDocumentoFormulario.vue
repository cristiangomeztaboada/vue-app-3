<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">
          <barra-botones
            v-on:consultar="consultar"
            v-bind:ocultarBotonAtras="true"
            v-bind:ocultarBotonNuevo="true"
            v-bind:ocultarBotonGuardar="true"
            v-bind:mostrarBotonConsultar="true"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">Consulta Integral Documentos</h5>
          <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Institución Educativa</label>
              <DxSelectBox
                :items="institucionEducativaLista"
                display-expr="institucioneducativaid.nombre"
                value-expr="institucioneducativaid.codigo"
                v-model="institucionEducativaCodigo"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Tipo Documento</label>
              <DxSelectBox
                :items="tipoDocumentoLista"
                display-expr="nombre"
                value-expr="codigo"
                v-model="tipoDocumentoCodigo"
              />
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <label>Estado</label>
              <DxSelectBox
                :items="estadoLista"
                display-expr="nombre"
                value-expr="codigo"
                v-model="estadoCodigo"
              />
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <label>Fecha Inicial</label>
              <input
                class="form-control"
                v-model="fechaInicial"
                type="date"
                id="fechaInicial"
              />
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <label>Fecha Final</label>
              <input
                class="form-control"
                v-model="fechaFinal"
                type="date"
                id="fechaFinal"
              />
            </div>
          </div>
          <br />
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <DxDataGrid
              :data-source="documentosMatriz"
              key-expr="id"
              :show-borders="true"
              :selection="{ mode: 'single' }"
              :showRowLines="true"
              :row-alternation-enabled="true"
            >
              <DxEditing :use-icons="true" mode="row"> </DxEditing>
              <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
              <template #id>
                <b style="color: black">ID</b>
              </template>
              <DxColumn data-field="id" header-cell-template="id" />
              <template #institucionEducativaNombre>
                <b style="color: black">INSTITUCIÓN EDUCATIVA</b>
              </template>
              <DxColumn
                data-field="institucioneducativaid.nombre"
                header-cell-template="institucionEducativaNombre"
              />
              <template #consecutivo>
                <b style="color: black">CONSECUTIVO</b>
              </template>
              <DxColumn
                data-field="consecutivo"
                header-cell-template="consecutivo"
              />
              <template #estado>
                <b style="color: black">ESTADO</b>
              </template>
              <DxColumn data-field="estado" header-cell-template="estado" />
              <template #fecha>
                <b style="color: black">FECHA</b>
              </template>
              <DxColumn data-field="fecha" header-cell-template="fecha" />
              <template #objeto>
                <b style="color: black">OBJETO</b>
              </template>
              <DxColumn data-field="objeto" header-cell-template="objeto" />
              <template #observacion>
                <b style="color: black">OBSERVACIÓN</b>
              </template>
              <DxColumn
                data-field="observacion"
                header-cell-template="observacion"
              />
              <template #valor>
                <b style="color: black">VALOR</b>
              </template>
              <DxColumn
                data-field="valor"
                data-type="number"
                format="currency"
                alignment="right"
                header-cell-template="valor"
              />
            </DxDataGrid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DxSelectBox from "devextreme-vue/select-box";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useStore } from "vuex";
import {
  DxDataGrid,
  DxSearchPanel,
  DxColumn,
  DxEditing,
} from "devextreme-vue/data-grid";

export default {
  name: "ConsultaIntegralDocumentoFormulario",
  components: {
    BarraBotones,
    DxDataGrid,
    DxSearchPanel,
    DxSelectBox,
    DxColumn,
    DxEditing,
  },
  setup() {
    const store = useStore();
    const usuarioAuditor = ref([]);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaLista = ref([]);
    const documentosMatriz = ref([]);
    const tipoDocumentoCodigo = ref(0);
    const tipoDocumentoLista = ref([
      { codigo: 1, nombre: "Ingreso Presupuestal" },
      { codigo: 2, nombre: "Recaudo Presupuestal" },
      { codigo: 3, nombre: "Solicitud Presupuestal" },
      { codigo: 4, nombre: "Certificado Disponibilidad Presupuestal" },
      { codigo: 5, nombre: "Registro Presupuestal" },
      { codigo: 6, nombre: "Obligación Presupuestal" },
      { codigo: 7, nombre: "Pago Presupuestal" },
      { codigo: 8, nombre: "Proyección Presupuestal" },
      { codigo: 9, nombre: "Modificación Presupuestal" },
    ]);
    const estadoCodigo = ref("");
    const estadoLista = ref([{ codigo: "Procesado", nombre: "Procesado" }]);
    const fechaInicial = ref("");
    const fechaFinal = ref("");

    const listarInstitucionEducativa = function () {
      store.commit("ocultarAlerta");
      institucionEducativaLista.value = [];
      api
        .consultarUsuarioAuditor(sessionStorage.getItem("usuario"))
        .then((data) => {
          institucionEducativaLista.value = data;
        })
        .catch(() => {});
    };

    listarInstitucionEducativa();

    const consultar = function () {
      store.commit("ocultarAlerta");
      const consulta = {
        fechainicial: fechaInicial.value,
        fechafinal: fechaFinal.value,
        institucioneducativaid: {
          codigo: institucionEducativaCodigo.value,
        },
        tipodocumento: tipoDocumentoCodigo.value,
        estado: estadoCodigo.value,
      };

      api
        .consultarDocumentos(consulta)
        .then((data) => {
          documentosMatriz.value = data;
        })
        .catch(() => {});
    };

    return {
      usuarioAuditor,
      institucionEducativaCodigo,
      institucionEducativaLista,
      tipoDocumentoCodigo,
      tipoDocumentoLista,
      estadoCodigo,
      estadoLista,
      fechaInicial,
      fechaFinal,
      documentosMatriz,
      consultar,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
