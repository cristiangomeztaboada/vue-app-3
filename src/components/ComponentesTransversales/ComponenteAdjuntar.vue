<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <h1 class="display-6">Adjuntos</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <input id="archivo" type="file" @input="leerArchivo" />
          </div>
        </div>
        <DxDataGrid
          :data-source="dataSource"
          key-expr="id"
          :show-borders="true"
          :selection="{ mode: 'single' }"
          @row-click="seleccionarIngresoPresupuesto"
          :showRowLines="true"
          :row-alternation-enabled="true"
        >
          <DxEditing :use-icons="true" mode="row"> </DxEditing>
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <template #id>
            <b style="color: black">ID</b>
          </template>
          <DxColumn data-field="id" header-cell-template="id" />
          <template #nombre>
            <b style="color: black">NOMBRE</b>
          </template>
          <DxColumn data-field="nombrearchivo" header-cell-template="nombre" />
          <DxColumn type="buttons" :width="110">
            <DxButton :on-click="descargar" hint="Descargar" icon="download" />
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
import { useStore } from "vuex";
export default {
  name: "ComponenteAdjuntar",
  props: {
    tipo: String,
    id: String,
  },
  components: {
    DxDataGrid,
    DxSearchPanel,
    DxColumn,
    DxButton,
    DxEditing,
  },
  setup(props) {
    const dataSource = ref([]);
    const store = useStore();
    const tipo = ref("");
    const id = ref("");
    const nombreArchivo = ref("");

    const listar = function () {
      tipo.value = props.tipo;
      id.value = props.id;

      store.commit("ocultarAlerta");
      api
        .listarAdjuntos(store.state.institucioneducativa)
        .then((data) => {
          dataSource.value = data;
        })
        .catch(() => {
          dataSource.value = [];
        });
    };

    listar();

    const descargar = function () {
      console.log("Descargar!");
    };

    const eliminar = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarAdjuntos(rowData.row.values[0])
          .then(() => listar())
          .catch(() => {
            listar();
          });
      }
    };

    const leerArchivo = function () {
      store.commit("ocultarAlerta");
      const inputArchivo = document.getElementById("archivo");
      const reader = new FileReader();
      reader.readAsDataURL(inputArchivo.files[0]);
      nombreArchivo.value = inputArchivo.files[0].name;

      reader.onload = () => {
        const adjunto = {
          institucioneducativaid: {
            codigo: store.state.institucioneducativa,
          },
          tipodocumento: tipo.value,
          consecutivo: id.value,
          nombrearchivo: nombreArchivo.value,
          archivobase64: reader.result,
        };

        api
          .insertarAdjuntos(adjunto)
          .then(() => {
            listar();
          })
          .catch(() => {
            store.commit("mostrarError", "Error al insertar adjunto");
          });
      };
      reader.onerror = (error) => {
        store.commit("mostrarError", error);
      };
      document.getElementById("archivo").value = "";
    };

    return {
      dataSource,
      descargar,
      eliminar,
      leerArchivo,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
