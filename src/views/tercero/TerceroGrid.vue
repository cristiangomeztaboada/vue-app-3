<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="row">          
          <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
            <h1 class="display-6">Tercero</h1>
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
          @row-click="seleccionarTercero"
          :showRowLines="true"
        >
          <DxEditing :use-icons="true" mode="row"> </DxEditing>
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <DxColumn data-field="codigo" />
          <DxColumn data-field="tipoidentificacionid.codigo" caption="Tipo Identificación Código"/>          
          <DxColumn data-field="tipoidentificacionid.nombre" caption="Tipo Identificación Nombre"/>          
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
      store.commit("ocultarAlerta");
      router.push({
        name: "terceroformulario",
        params: { codigo: "" },
      });
    };

    const listar = function () {
      store.commit("ocultarAlerta");
      api
        .listarTercero()
        .then((data) => (dataSource.value = data))
        .catch(function (e) {
          store.commit("mostrarError", e);
        });
    };

    listar();

    const seleccionarTercero = function (e) {
      store.commit("ocultarAlerta");
      context.emit(
        "seleccionarTercero",
        e.data.codigo
      );
    };

    const eliminar = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarTercero(rowData.row.values[0])
          .then(() => listar())
          .catch( ()=> {
            store.commit("mostrarError", "Imposible eliminar, se encuentra asociado a documento");
          });
      }
    };

    const editar = function (rowData) {
      store.commit("ocultarAlerta");
      router.push({
        name: "terceroformulario",
        params: {codigo: rowData.row.values[0]},
      });
    };

    return {
      dataSource,
      seleccionarTercero,
      eliminar,
      editar,
      nuevo,
    };
  },
};
</script>
