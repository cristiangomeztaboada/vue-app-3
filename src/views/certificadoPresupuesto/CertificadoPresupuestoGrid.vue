<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="row">
          <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
            <h1 class="display-6">Certificado Presupuesto</h1>
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
          @row-click="seleccionarCertificadoPresupuesto"
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
          <template #diasvalidez>
            <b style="color: black">DÍAS VALIDEZ</b>
          </template>
          <DxColumn
            data-field="diasvalidez"
            data-type="number"
            alignment="right"
            header-cell-template="diasvalidez"
          />
          <template #objeto>
            <b style="color: black">OBJETO</b>
          </template>
          <DxColumn data-field="objeto" header-cell-template="objeto" />
          <template #observacion>
            <b style="color: black">OBSERVACIÓN</b>
          </template>
          <DxColumn data-field="observacion" header-cell-template="observacion"/>
          <template #solicitudpresupuestalcabeceraidconsecutivo>
            <b style="color: black">SOLICITUD PRESUPUESTO</b>
          </template>
          <DxColumn
            data-field="solicitudpresupuestalcabeceraid.consecutivo"
            header-cell-template="solicitudpresupuestalcabeceraidconsecutivo"
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
        name: "certificadopresupuestoformulario",
        params: { codigo: "" },
      });
    };

    const listar = function () {
      store.commit("ocultarAlerta");
      api
        .listarCertificadoPresupuesto(store.state.institucioneducativa)
        .then((data) => {
          dataSource.value = data;
        })
        .catch(() => {});
    };

    listar();

    const seleccionarCertificadoPresupuesto = function (e) {
      store.commit("ocultarAlerta");
      context.emit("seleccionarCertificadoPresupuesto", e.data.consecutivo);
    };

    const eliminar = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarCertificadoPresupuesto(
            store.state.institucioneducativa,
            rowData.row.values[1]
          )
          .then(() => listar())
          .catch(() => {
            store.commit(
              "mostrarError",
              "Existen registros de presupuesto asociados al CDP"
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
        name: "certificadopresupuestoformulario",
        params: { codigo: rowData.row.values[1] },
      });
    };

    return {
      dataSource,
      seleccionarCertificadoPresupuesto,
      eliminar,
      editar,
      nuevo,
    };
  },
};
</script>
