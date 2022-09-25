<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="row">
          <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
            <h1 class="display-6">Personal Planta</h1>
          </div>
          <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <button
              v-if="mostrarColumnaBotones"
              v-on:click="nuevo"
              type="button"
              class="btn btn-warning"
            >
              <span>➕</span>NUEVO
            </button>
          </div>
        </div>
        <DxDataGrid
          :data-source="dataSource"
          key-expr="codigo"
          :show-borders="true"
          :selection="{ mode: 'single' }"
          @row-click="seleccionarPersonalPlanta"
          :showRowLines="true"
          :row-alternation-enabled="true"
        >
          <DxEditing :use-icons="true" mode="row"> </DxEditing>
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <template #personalPlantaCodigo>
            <b style="color: black">CÓDIGO</b>
          </template>
          <DxColumn data-field="codigo" header-cell-template="personalPlantaCodigo"/>
          <template #personalPlantaNombre>
            <b style="color: black">NOMBRE</b>
          </template>
          <DxColumn data-field="nombre" header-cell-template="personalPlantaNombre"/>
          <template #personalPlantaInstitucionEducativa>
            <b style="color: black">INSTITUCIÓN EDUCATIVA</b>
          </template>
          <DxColumn
            data-field="institucioneducativaid.codigo"
            caption="Institución Educativa"
            header-cell-template="personalPlantaInstitucionEducativa"
          />
          <template #personalPlantaCargo>
            <b style="color: black">CARGO</b>
          </template>
          <DxColumn data-field="cargo" header-cell-template="personalPlantaCargo"/>
          <DxColumn v-if="mostrarColumnaBotones" type="buttons" :width="110">
            <DxButton :on-click="editar" hint="Editar" icon="edit" />
            <DxButton :on-click="eliminar" hint="Eliminar" icon="trash" />
          </DxColumn>
        </DxDataGrid>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxSearchPanel,
  DxColumn,
  DxEditing,
  DxButton,
} from "devextreme-vue/data-grid";
import api from "@/api.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  props: {
    mostrarColumnaBotones: Boolean,
  },
  components: {
    DxDataGrid,
    DxSearchPanel,
    DxColumn,
    DxButton,
    DxEditing,
  },
  setup(props, context) {
    const dataSource = ref([]);
    const router = useRouter();
    const store = useStore();

    const nuevo = function () {
      router.push({
        name: "personalplantaformulario",
        params: { codigo: "" },
      });
    };

    const listar = function () {
      api
        .listarPersonalPlanta(store.state.institucioneducativa)
        .then((data) => {
          dataSource.value = data;
        })
        .catch(() => {});
    };

    listar();

    const seleccionarPersonalPlanta = function (e) {
      context.emit("seleccionarPersonalPlanta", e.data.codigo);
    };

    const eliminar = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarPersonalPlanta(rowData.row.values[0])
          .then(() => listar())
          .catch(() => {
            store.commit("mostrarError", "Imposible eliminar, se encuentra asociado en una solicitud presupuestal");
          });
      }
    };

    const editar = function (rowData) {
      router.push({
        name: "personalplantaformulario",
        params: { codigo: rowData.row.values[0] },
      });
    };

    return {
      dataSource,
      seleccionarPersonalPlanta,
      eliminar,
      editar,
      nuevo,
    };
  },
};
</script>
