<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <div class="card shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">
          <barra-botones
            v-on:guardar="guardar"
            v-on:irAtras="irAtras"
            v-on:nuevo="nuevo"
            v-on:eliminar="eliminar"
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">
            Insertar Ingreso Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">
            Actualizar Ingreso Presupuesto
          </h5>

          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Institución Educativa Código</label>
              <input
                v-model="institucionEducativaCodigo"
                class="form-control"
                type="text"
                readonly
              />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Institución Educativa Nombre</label>
              <input
                v-model="institucionEducativaNombre"
                class="form-control"
                type="text"
                readonly
              />
            </div>
          </div>

          <label>Consecutivo</label>          
          <ingreso-presupuesto-buscador
            v-on:perderFoco="consultarIngresoPresupuesto"
            v-bind:codigoPropiedad="consecutivo"
          />

          <label>Fecha</label>
          <input class="form-control" v-model="fecha" type="date" id="fecha" />

          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Tipo Identificación</label>
              <DxSelectBox
                :items="tiposIdentificacion"
                display-expr="nombre"
                value-expr="codigo"
                v-model="tipoIdentificacionCodigo"
              />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Tercero</label>
              <tercero-buscador
                v-on:perderFoco="consultarTercero"
                v-bind:codigoPropiedad="terceroCodigo"
              />
            </div>
          </div>

          <label>Fecha Proyección Recaudo</label>
          <input
            class="form-control"
            v-model="fechaProyeccionRecaudo"
            type="date"
            id="fechaProyeccionRecaudo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IngresoPresupuestoBuscador from "./IngresoPresupuestoBuscador.vue";
import TerceroBuscador from "@/views/tercero/TerceroBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import DxSelectBox from "devextreme-vue/select-box";

export default {
  name: "IngresoPresupuestoFormulario",
  components: {
    IngresoPresupuestoBuscador,
    TerceroBuscador,
    BarraBotones,
    DxSelectBox,
  },
  setup() {
    const esNuevo = ref(true);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const consecutivo = ref(0);
    const fecha = ref("");
    const fechaProyeccionRecaudo = ref("");
    const tipoIdentificacionCodigo = ref("");
    const terceroCodigo = ref("");
    const fuenteRecursoCodigo = ref("");
    const tiposIdentificacion = ref([]);

    const route = new useRoute();
    const router = useRouter();
    const store = useStore();

    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const listarTipoIdentificacion = function () {
      api
        .listarTipoIdentificacion()
        .then((data) => {
          tiposIdentificacion.value = data;
        })
        .catch(function (e) {
          store.commit("mostrarError", e);
        });
    };

    listarTipoIdentificacion();

    const consultarIngresoPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarIngresoPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          if (data.codigo) {
            esNuevo.value = false;
          }
          institucionEducativaCodigo.value = store.state.institucioneducativa;
          consecutivo.value = data.consecutivo;
          fecha.value = data.fecha.substring(0, 10);
          fechaProyeccionRecaudo.value = data.fechaproyeccionrecaudo.substring(
            0,
            10
          );
          terceroCodigo.value = data.terceroid.codigo;
          tipoIdentificacionCodigo.value =
            data.terceroid.tipoidentificacionid.codigo;
        })
        .catch(function () {
          nuevo();
          consecutivo.value = 0;
        });
    };

    consultarIngresoPresupuesto(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");
      const ingresoPresupuesto = {
        institucioneducativaid: { codigo: institucionEducativaCodigo.value },
        consecutivo: consecutivo.value,
        fecha: fecha.value,
        terceroCodigo: terceroCodigo.value,
      };

      if (esNuevo.value) {
        api
          .insertarIngresoPresupuesto(ingresoPresupuesto)
          .then(
            store.commit("mostrarInformacion", "registro insertado con exito")
          )
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      } else {
        api
          .actualizarIngresoPresupuesto(ingresoPresupuesto)
          .then(
            store.commit("mostrarInformacion", "registro actualizado con exito")
          )
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "ingresopresupuesto",
      });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      institucionEducativaCodigo.value = store.state.institucioneducativa;
      consecutivo.value = "";
      fecha.value = "";
      terceroCodigo.value = "";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarIngresoPresupuesto(consecutivo.value)
          .then(() =>
            router.push({
              name: "ingresopresupuesto",
            })
          )
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      }
    };

    const consultarInstitucionEducativa = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarInstitucionEducativa(c)
        .then((data) => {
          institucionEducativaCodigo.value = data.codigo;
        })
        .catch(function () {
          institucionEducativaCodigo.value = "";
        });
    };

    const consultarTercero = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarTercero(c, tipoIdentificacionCodigo.value)
        .then((data) => {
          if (data.codigo && data.tipoidentificacionid.codigo) {
            esNuevo.value = false;
          }
          terceroCodigo.value = data.codigo;
          tipoIdentificacionCodigo.value = data.tipoidentificacionid.codigo;
        })
        .catch(() => {});
    };

    return {
      esNuevo,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      consecutivo,
      fecha,
      fechaProyeccionRecaudo,
      tipoIdentificacionCodigo,
      terceroCodigo,
      fuenteRecursoCodigo,
      tiposIdentificacion,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarIngresoPresupuesto,
      consultarInstitucionEducativa,
      consultarTercero,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
