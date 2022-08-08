<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="row">
          <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
            <h1 class="display-6">Recaudo Presupuesto</h1>
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
          key-expr="id"
          :show-borders="true"
          :selection="{ mode: 'single' }"
          @row-click="seleccionarRecaudoPresupuesto"
          :showRowLines="true"
        >
          <DxEditing :use-icons="true" mode="row"> </DxEditing>
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <DxColumn
            data-field="institucioneducativaid.nombre"
            caption="Institución Educativa"
          />
          <DxColumn
            data-field="consecutivo"
            :sort-index="0"
            sort-order="desc"
          />
          <DxColumn data-field="estado" />
          <DxColumn data-field="fecha" data-type="date" format="yyyy/MM/dd" />
          <DxColumn
            data-field="ingresopresupuestalid.consecutivo"
            caption="Ingreso Presupuesto"
          />
          <DxColumn data-field="tiporecaudoid.nombre" caption="Tipo Recaudo" />
          <DxColumn data-field="documentorecaudo" caption="Documento Recaudo" />
          <DxColumn data-field="objeto" />
          <DxColumn data-field="observacion" />
          <DxColumn
            data-field="valor"
            data-type="number"
            format="currency"
            alignment="right"
          />

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
    const mensajeAlerta = ref("");
    const router = useRouter();
    const store = useStore();

    const nuevo = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "recaudopresupuestoformulario",
        params: { codigo: "" },
      });
    };

    const listar = function () {
      store.commit("ocultarAlerta");
      api
        .listarRecaudoPresupuesto(store.state.institucioneducativa)
        .then((data) => {
          dataSource.value = data;
        })
        .catch(() => {});
    };

    listar();

    const seleccionarRecaudoPresupuesto = function (e) {
      store.commit("ocultarAlerta");
      context.emit("seleccionarRecaudoPresupuesto", e.data.consecutivo);
    };

    const eliminar = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarRecaudoPresupuesto(
            store.state.institucioneducativa,
            rowData.row.values[1]
          )
          .then(() => listar())
          .catch(() => {
            store.commit(
              "mostrarError",
              "Existen CDP con rubros asociados a la fuente"
            );
          });
      }
    };

    const editar = function (rowData) {
      store.commit("ocultarAlerta");
      router.push({
        name: "recaudopresupuestoformulario",
        params: { codigo: rowData.row.values[1] },
      });
    };

    return {
      mensajeAlerta,
      dataSource,
      seleccionarRecaudoPresupuesto,
      eliminar,
      editar,
      nuevo,
    };
  },
};
</script>
