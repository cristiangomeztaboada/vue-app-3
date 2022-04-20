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
            v-bind:ocultarBotonGuardar="!esNuevo"
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

          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Consecutivo</label>
              <ingreso-presupuesto-buscador
                v-on:perderFoco="consultarIngresoPresupuesto"
                v-bind:codigoPropiedad="consecutivo"
              />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Fecha</label>
              <input
                class="form-control"
                v-model="fecha"
                type="date"
                id="fecha"
                readonly
              />
            </div>
          </div>
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

          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Fecha Proyección Recaudo</label>
              <input
                class="form-control"
                v-model="fechaProyeccionRecaudo"
                type="date"
                id="fechaProyeccionRecaudo"
              />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Observación</label>
              <input v-model="observacion" class="form-control" type="text" />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Fuente Recurso</label>
              <DxSelectBox
                :items="fuentesRecursos"
                display-expr="nombre"
                value-expr="codigo"
                v-model="fuenteRecursoCodigo"
                @value-changed="fuenteRecursoCodigoCambio"
              />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Saldo</label>
              <DxNumberBox
                v-model="fuenteRecursoSaldo"
                format="$ #,##0.##"
                :read-only="true"
              />
            </div>
          </div>

          <label>Valor</label>
          <DxNumberBox v-model="valor" format="$ #,##0.##" />
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
import DxNumberBox from "devextreme-vue/number-box";

export default {
  name: "IngresoPresupuestoFormulario",
  components: {
    IngresoPresupuestoBuscador,
    TerceroBuscador,
    BarraBotones,
    DxSelectBox,
    DxNumberBox,
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
    const observacion = ref("");
    const valor = ref(0);
    const fuentesRecursos = ref([]);
    const fuenteRecursoSaldo = ref(0);

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

    const fuenteRecursoCodigoCambio = function (e) {
      api
        .consultarFuenteRecursoSaldo(store.state.institucioneducativa, e.value)
        .then((data) => {
          fuenteRecursoSaldo.value = data;
        })
        .catch(() => {});
    };

    const listarFuentesRecursos = function () {
      api
        .listarFuenteRecursoProyeccion(store.state.institucioneducativa)
        .then((data) => {
          fuentesRecursos.value = data;
        })
        .catch(function (e) {
          store.commit("mostrarError", e);
        });
    };

    listarFuentesRecursos();

    const consultarIngresoPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarIngresoPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          if (data.consecutivo) {
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
          fuenteRecursoCodigo.value = data.fuenterecursoid.codigo;
          observacion.value = data.observacion;
          valor.value = Number(data.valor);
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
        fechaproyeccionrecaudo: fechaProyeccionRecaudo.value,
        terceroid: {
          codigo: terceroCodigo.value,
          tipoidentificacion: tipoIdentificacionCodigo.value,
        },
        fuenterecursoid: {
          codigo: fuenteRecursoCodigo.value,
        },
        valor: valor.value,
        observacion: observacion.value,
      };

      if (esNuevo.value) {
        api
          .insertarIngresoPresupuesto(ingresoPresupuesto)
          .then((data) => {
            consultarIngresoPresupuesto(data.consecutivo);
            fuenteRecursoCodigoCambio({value:fuenteRecursoCodigo.value});
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch((e) => {
            let isValidDate = Date.parse(ingresoPresupuesto.fecha);
            if (isNaN(isValidDate)) {
              store.commit("mostrarError", "ingrese una fecha válida");
            }

            isValidDate = Date.parse(ingresoPresupuesto.fechaproyeccionrecaudo);
            if (isNaN(isValidDate)) {
              store.commit(
                "mostrarError",
                "ingrese una fecha proyección recaudo válida"
              );
            }

            if (!ingresoPresupuesto.terceroid.codigo) {
              store.commit("mostrarError", "ingrese un tercero válido");
            }

            if (!ingresoPresupuesto.fuenterecursoid.codigo) {
              store.commit(
                "mostrarError",
                "ingrese una fuente de recurso válida"
              );
            }

            if (!ingresoPresupuesto.observacion) {
              store.commit("mostrarError", "ingrese una observación válida");
            }

            if (
              !ingresoPresupuesto.valor ||
              Math.sign(ingresoPresupuesto.valor) != 1
            ) {
              store.commit("mostrarError", "ingrese un valor válido");
            }

            if (e) {
              store.commit(
                "mostrarError",
                "El valor ingresado supera el saldo pendiente"
              );
            }
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

      let hoy = new Date();
      let fullFechaActual = `${hoy.getFullYear()}-${(hoy.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${hoy.getDate().toString().padStart(2, "0")}`;

      esNuevo.value = true;
      institucionEducativaCodigo.value = store.state.institucioneducativa;
      consecutivo.value = 0;
      fecha.value = fullFechaActual;
      terceroCodigo.value = "";
      tipoIdentificacionCodigo.value = "";
      fechaProyeccionRecaudo.value = "";
      observacion.value = "";
      fuenteRecursoCodigo.value = "";
      valor.value = 0;
      fuenteRecursoSaldo.value = 0;
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarIngresoPresupuesto(
            store.state.institucioneducativa,
            consecutivo.value
          )
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
      observacion,
      valor,
      fuentesRecursos,
      fuenteRecursoSaldo,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarIngresoPresupuesto,
      consultarInstitucionEducativa,
      consultarTercero,
      fuenteRecursoCodigoCambio,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
