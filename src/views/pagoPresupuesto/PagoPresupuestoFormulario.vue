<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <div class="card shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">
          <barra-botones
            v-on:guardar="guardar"
            v-on:eliminar="eliminar"
            v-on:irAtras="irAtras"
            v-on:nuevo="nuevo"
            v-bind:ocultarBotonGuardar="!esNuevo"
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">
            Insertar Pago Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">Pago Presupuesto</h5>
          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Institución Educativa</label>
              <input
                v-model="institucionEducativaNombre"
                class="form-control"
                type="text"
                readonly
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Consecutivo</label>
              <pago-presupuesto-buscador
                v-on:perderFoco="consultarPagoPresupuesto"
                v-bind:codigoPropiedad="consecutivo"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
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
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <label>Observación</label>
              <input v-model="observacion" class="form-control" type="text" />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Obligación Presupuesto</label>
              <obligacion-presupuesto-buscador
                v-on:perderFoco="consultarObligacionPresupuesto"
                v-bind:codigoPropiedad="obligacionPresupuestoConsecutivo"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Saldo</label>
              <DxNumberBox
                v-model="obligacionPresupuestoSaldo"
                format="$ #,##0.##"
                :read-only="true"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Valor</label>
              <DxNumberBox v-model="valor" format="$ #,##0.##" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PagoPresupuestoBuscador from "./PagoPresupuestoBuscador.vue";
import ObligacionPresupuestoBuscador from "@/views/obligacionPresupuesto/ObligacionPresupuestoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useStore } from "vuex";
import DxNumberBox from "devextreme-vue/number-box";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "PagoPresupuestoFormulario",
  components: {
    PagoPresupuestoBuscador,
    ObligacionPresupuestoBuscador,
    BarraBotones,
    DxNumberBox,
  },
  setup() {
    const esNuevo = ref(true);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const consecutivo = ref(0);
    const fecha = ref("");
    const observacion = ref("");
    const obligacionPresupuestoConsecutivo = ref(0);
    const valor = ref(0);
    const obligacionPresupuestoSaldo = ref(0);

    const store = useStore();
    const route = new useRoute();
    const router = useRouter();

    institucionEducativaCodigo.value = store.state.institucioneducativa;
    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const consultarPagoPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarPagoPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          if (data.consecutivo) {
            esNuevo.value = false;
          }
          consecutivo.value = data.consecutivo;
          fecha.value = data.fecha.substring(0, 10);
          observacion.value = data.observacion;
          obligacionPresupuestoConsecutivo.value =
            data.obligacionpresupuestalid.consecutivo;

          consultarObligacionPresupuesto(obligacionPresupuestoConsecutivo.value);

          valor.value = data.valor;
        })
        .catch(() => {
          nuevo();
        });
    };

    consultarPagoPresupuesto(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");

      const pagoPresupuesto = {
        institucioneducativaid: {
          codigo: institucionEducativaCodigo.value,
        },
        consecutivo: consecutivo.value,
        fecha: fecha.value,
        obligacionpresupuestalid: {
          consecutivo: obligacionPresupuestoConsecutivo.value,
        },
        observacion: observacion.value,
        valor: Math.abs(valor.value),
      };

      api
        .insertarPagoPresupuesto(pagoPresupuesto)
        .then((data) => {
          consultarPagoPresupuesto(data.consecutivo);
          store.commit("mostrarInformacion", "registro insertado con exito");
        })
        .catch(() => {
          store.commit(
            "mostrarError",
            "La fecha no pertenece al periodo activo"
          );
          
          if (valor.value > obligacionPresupuestoSaldo.value) {
            store.commit(
            "mostrarError",
            "El valor ingresado supera el saldo de la obligación presupuesto"
          );
          }          

          if (!valor.value) {
            store.commit("mostrarError", "ingrese un valor válido");
          }

          if (!obligacionPresupuestoConsecutivo.value) {
            store.commit(
              "mostrarError",
              "ingrese una obligación presupuesto válido"
            );
          }

          if (!observacion.value) {
            store.commit("mostrarError", "ingrese una observación válida");
          }
        });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      consecutivo.value = 0;
      fecha.value = api.obtenerFechaActual();
      observacion.value = "";
      obligacionPresupuestoConsecutivo.value = 0;
      consultarObligacionPresupuesto(obligacionPresupuestoConsecutivo.value);
      valor.value = 0;
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarPagoPresupuesto(
            institucionEducativaCodigo.value,
            consecutivo.value
          )
          .then(() => {
            nuevo();
          })
          .catch(() => {});
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "pagopresupuesto",
      });
    };

    const consultarObligacionPresupuesto = function (c) {
      store.commit("ocultarAlerta");

      api
        .consultarObligacionPresupuesto(institucionEducativaCodigo.value, c)
        .then((data) => {
          obligacionPresupuestoConsecutivo.value = data.consecutivo;

          api
            .consultarObligacionPresupuestoSaldo(
              institucionEducativaCodigo.value,
              c
            )
            .then((data) => {
              obligacionPresupuestoSaldo.value = data;
            })
            .catch(() => {
              obligacionPresupuestoSaldo.value = 0;
            });
        })
        .catch(() => {
          obligacionPresupuestoSaldo.value = 0;
        });
    };

    return {
      esNuevo,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      consecutivo,
      fecha,
      observacion,
      obligacionPresupuestoConsecutivo,
      valor,
      obligacionPresupuestoSaldo,

      guardar,
      eliminar,
      nuevo,
      irAtras,
      consultarPagoPresupuesto,
      consultarObligacionPresupuesto,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
