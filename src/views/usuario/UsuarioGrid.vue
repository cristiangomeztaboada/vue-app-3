<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="row">
          <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
            <h1 class="display-6">Usuario</h1>
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
          key-expr="username"
          :show-borders="true"
          :selection="{ mode: 'single' }"
          @row-click="seleccionarUsuario"
          :showRowLines="true"
          :row-alternation-enabled="true"
        >
          <DxEditing :use-icons="true" mode="row"> </DxEditing>
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <template #usuarioCodigo>
            <b style="color: black">CÓDIGO</b>
          </template>
          <DxColumn data-field="username" header-cell-template="usuarioCodigo" />
          <template #usuarioNombre>
            <b style="color: black">NOMBRE</b>
          </template>
          <DxColumn data-field="name" header-cell-template="usuarioNombre" />
          <template #usuarioRol>
            <b style="color: black">ROL</b>
          </template>
          <DxColumn data-field="rol" header-cell-template="usuarioRol" />
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
      store.commit("ocultarAlerta");
      router.push({
        name: "usuarioformulario",
        params: { codigo: "" },
      });
    };

    const listar = function () {
      store.commit("ocultarAlerta");
      api
        .listarUsuario()
        .then((data) => (dataSource.value = data))
        .catch(() => {});
    };

    listar();

    const seleccionarUsuario = function (e) {
      store.commit("ocultarAlerta");
      context.emit("seleccionarUsuario", e.data.username);
    };

    const eliminar = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarUsuario(rowData.row.values[0])
          .then(() => listar())
          .catch(() => {
            store.commit(
              "mostrarError",
              "No se puede eliminar usuario, se encuentra asociado a una institución educativa"
            );
          });
      }
    };

    const editar = function (rowData) {
      store.commit("ocultarAlerta");
      router.push({
        name: "usuarioformulario",
        params: { codigo: rowData.row.values[0] },
      });
    };

    return {
      dataSource,
      seleccionarUsuario,
      eliminar,
      editar,
      nuevo,
    };
  },
};
</script>
