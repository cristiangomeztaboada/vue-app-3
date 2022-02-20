<template>
  <div class="row">
    <componente-alerta v-bind:mensajeAlerta="mensajeAlerta" />
  </div>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="row">
          <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
            <h1 class="display-6">MaestroGenerico</h1>
          </div>
          <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <button
              v-if="mostrarColumnaBotones"
              v-on:click="nuevo"
              type="button"
              class="btn btn-outline-primary"
            >
              ➕
            </button>
          </div>
        </div>
        <DxDataGrid
          :data-source="dataSource"
          key-expr="codigo"
          :show-borders="true"
          :selection="{ mode: 'single' }"
          @selection-changed="seleccionarMaestroGenerico"
          :showRowLines="true"
        >
          <DxEditing :use-icons="true" mode="row"> </DxEditing>
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <DxColumn data-field="codigo" />
          <DxColumn data-field="nombre" />
          <DxColumn v-if="mostrarColumnaBotones" type="buttons" :width="110">
            <DxButton name="delete" />
            <DxButton :on-click="editar" hint="Editar" icon="edit" />
            <DxButton :on-click="eliminar" hint="Eliminar" icon="trash" />
          </DxColumn>
        </DxDataGrid>
      </div>
    </div>
  </div>
</template>
<script>
import ComponenteAlerta from "@/components/ComponentesTransversales/ComponenteAlerta.vue";
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
    ComponenteAlerta,
  },
  setup(props, context) {
    const dataSource = ref([]);
    const mensajeAlerta = ref("");
    const router = useRouter();

    const nuevo = function () {
      router.push({
        name: "maestrogenericoformulario",
        params: { codigo: "" },
      });
    };

    const listar = function () {
      api
        .listarMaestroGenerico()
        .then((data) => (dataSource.value = data))
        .catch(function (e) {
          mensajeAlerta.value = e;
        });
    };

    listar();

    const seleccionarMaestroGenerico = function (e) {
      context.emit("seleccionarMaestroGenerico", e.selectedRowsData[0].codigo);
    };

    const eliminar = function (rowData) {
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarMaestroGenerico(rowData.row.values[0])
          .then(() => listar())
          .catch(function (e) {
            mensajeAlerta.value = e;
          });
      }
    };

    const editar = function (rowData) {
      router.push({
        name: "maestrogenericoformulario",
        params: { codigo: rowData.row.values[0] },
      });
    };

    return {
      mensajeAlerta,
      dataSource,
      seleccionarMaestroGenerico,
      eliminar,
      editar,
      nuevo,
    };
  },
};
</script>
