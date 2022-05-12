<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="row">
          <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
            <h1 class="display-6">Solicitud Presupuesto</h1>
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
          @row-click="seleccionarSolicitudPresupuesto"
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
          <DxColumn data-field="fecha" data-type="date" format="yyyy/MM/dd" />
          <DxColumn data-field="observacion" caption="Observación" />
          <DxColumn
            data-field="personalplantaidsolicitante.nombre"
            caption="Solicitante"
          />
          <DxColumn
            data-field="personalplantaidsolicitado.nombre"
            caption="Solicitado A"
          />
          <DxColumn data-field="terceroid.nombre" caption="Tercero" />
          <DxColumn
            data-field="tipocontratoid.nombre"
            caption="Tipo Contrato"
          />
          <DxColumn
            data-field="fechainiciocontrato"
            data-type="date"
            format="yyyy/MM/dd"
            caption="Fecha Inicio Contrato"
          />
          <DxColumn
            data-field="fechafincontrato"
            data-type="date"
            format="yyyy/MM/dd"
            caption="Fecha Fin Contrato"
          />
          <DxColumn data-field="contratonumero" caption="Número Contrato" />

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
      router.push({
        name: "solicitudpresupuestoformulario",
        params: { codigo: "" },
      });
    };

    const listar = function () {
      api
        .listarSolicitudPresupuesto(store.state.institucioneducativa)
        .then((data) => {
          dataSource.value = data;
        })
        .catch(() => {});
    };

    listar();

    const seleccionarSolicitudPresupuesto = function (e) {
      context.emit("seleccionarSolicitudPresupuesto", e.data.codigo);
    };

    const eliminar = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarSolicitudPresupuesto(
            store.state.institucioneducativa,
            rowData.row.values[1]
          )
          .then(() => listar())
          .catch(() => {
            store.commit(
              "mostrarError",
              "Primero debe eliminar los registros de detalle del documento"
            );
          });
      }
    };

    const editar = function (rowData) {
      router.push({
        name: "solicitudpresupuestoformulario",
        params: { codigo: rowData.row.values[1] },
      });
    };

    return {
      dataSource,
      seleccionarSolicitudPresupuesto,
      eliminar,
      editar,
      nuevo,
    };
  },
};
</script>
