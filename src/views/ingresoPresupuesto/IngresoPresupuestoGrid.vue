<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="row">
          <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
            <h1 class="display-6">Ingreso Presupuesto</h1>
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
          key-expr="id"
          :show-borders="true"
          :selection="{ mode: 'single' }"
          @row-click="seleccionarIngresoPresupuesto"
          :showRowLines="true"
          :row-alternation-enabled="true"
        >
          <DxEditing :use-icons="true" mode="row"> </DxEditing>
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <template #institucioneducativaidnombre>
            <b style="color: black">INSTITUCIÓN EDUCATIVA</b>
          </template>
          <DxColumn
            data-field="institucioneducativaid.nombre"
            header-cell-template="institucioneducativaidnombre"
          />
          <template #consecutivo>
            <b style="color: black">CONSECUTIVO</b>
          </template>
          <DxColumn
            data-field="consecutivo"
            :sort-index="0"
            sort-order="desc"
            header-cell-template="consecutivo"
          />
          <template #estado>
            <b style="color: black">ESTADO</b>
          </template>
          <DxColumn data-field="estado" header-cell-template="estado" />
          <template #fecha>
            <b style="color: black">FECHA</b>
          </template>
          <DxColumn
            data-field="fecha"
            data-type="date"
            format="yyyy/MM/dd"
            header-cell-template="fecha"
          />
          <template #terceroidnombre>
            <b style="color: black">TERCERO</b>
          </template>
          <DxColumn
            data-field="terceroid.nombre"
            header-cell-template="terceroidnombre"
          />
          <template #fuenterecursoidnombre>
            <b style="color: black">FUENTE RECURSO</b>
          </template>
          <DxColumn
            data-field="fuenterecursoid.nombre"
            header-cell-template="fuenterecursoidnombre"
          />
          <template #observacion>
            <b style="color: black">OBSERVACIÓN</b>
          </template>
          <DxColumn
            data-field="observacion"
            header-cell-template="observacion"
          />
          <template #objeto>
            <b style="color: black">OBJETO</b>
          </template>
          <DxColumn data-field="objeto" header-cell-template="objeto" />
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
          <template #fechaproyeccionrecaudo>
            <b style="color: black">FECHA PROYECCIÓN RECAUDO</b>
          </template>
          <DxColumn
            data-field="fechaproyeccionrecaudo"
            data-type="date"
            format="yyyy/MM/dd"
            header-cell-template="fechaproyeccionrecaudo"
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
        name: "ingresopresupuestoformulario",
        params: { codigo: "" },
      });
    };

    const listar = function () {
      store.commit("ocultarAlerta");
      api
        .listarPeriodoActivos()
        .then((data) => {
          api
            .listarIngresoPresupuesto(
              store.state.institucioneducativa,
              data[0].codigo
            )
            .then((data) => {
              dataSource.value = data;
            })
            .catch(() => {});
        })
        .catch(() => {});
    };

    listar();

    const seleccionarIngresoPresupuesto = function (e) {
      store.commit("ocultarAlerta");
      context.emit("seleccionarIngresoPresupuesto", e.data.consecutivo);
    };

    const eliminar = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarIngresoPresupuesto(
            store.state.institucioneducativa,
            rowData.row.values[1]
          )
          .then(() => listar())
          .catch(() => {
            store.commit(
              "mostrarError",
              "Existen documentos de recaudo presupuestal relacionados"
            );

            if (rowData.row.values[2] == "Anulado") {
              store.commit(
                "mostrarError",
                "El documento ya se encuentra anulado"
              );
            }
          });
      }
    };

    const editar = function (rowData) {
      store.commit("ocultarAlerta");
      router.push({
        name: "ingresopresupuestoformulario",
        params: { codigo: rowData.row.values[1] },
      });
    };

    return {
      mensajeAlerta,
      dataSource,
      seleccionarIngresoPresupuesto,
      eliminar,
      editar,
      nuevo,
    };
  },
};
</script>
