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
            Insertar Registro Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">Registro Presupuesto</h5>
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
              <registro-presupuesto-buscador
                v-on:perderFoco="consultarRegistroPresupuesto"
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
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Tercero</label>
              <tercero-buscador
                v-on:perderFoco="consultarTercero"
                v-bind:codigoPropiedad="terceroCodigo"
                v-bind:mostrarCampoNombre="true"
                v-bind:nombrePropiedad="terceroNombre"
              />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Observación</label>
              <input v-model="observacion" class="form-control" type="text" />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Certificado Presupuesto</label>
              <certificado-presupuesto-buscador
                v-on:perderFoco="consultarCertificadoPresupuesto"
                v-bind:codigoPropiedad="certificadoPresupuestoConsecutivo"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Saldo</label>
              <DxNumberBox
                v-model="certificadoPresupuestoSaldo"
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
import RegistroPresupuestoBuscador from "./RegistroPresupuestoBuscador.vue";
import TerceroBuscador from "@/views/tercero/TerceroBuscador.vue";
import CertificadoPresupuestoBuscador from "@/views/certificadoPresupuesto/CertificadoPresupuestoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useStore } from "vuex";
import DxNumberBox from "devextreme-vue/number-box";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "RegistroPresupuestoFormulario",
  components: {
    RegistroPresupuestoBuscador,
    CertificadoPresupuestoBuscador,
    TerceroBuscador,
    BarraBotones,
    DxNumberBox,
  },
  setup() {
    const esNuevo = ref(true);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const consecutivo = ref(0);
    const fecha = ref("");
    const terceroCodigo = ref("");
    const terceroNombre = ref("");
    const observacion = ref("");
    const certificadoPresupuestoConsecutivo = ref(0);
    const certificadoPresupuestoSaldo = ref(0);
    const valor = ref(0);

    const store = useStore();
    const route = new useRoute();
    const router = useRouter();

    institucionEducativaCodigo.value = store.state.institucioneducativa;
    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const consultarRegistroPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarRegistroPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          if (data.consecutivo) {
            esNuevo.value = false;
          }
          consecutivo.value = data.consecutivo;
          fecha.value = data.fecha.substring(0, 10);
          terceroCodigo.value = data.terceroid.codigo;
          consultarTercero(terceroCodigo.value);
          observacion.value = data.observacion;

          certificadoPresupuestoConsecutivo.value =
            data.certificadodisponibilidadpresupuestalid.consecutivo;

          consultarCertificadoPresupuesto(
            certificadoPresupuestoConsecutivo.value
          );

          valor.value = data.valor;
        })
        .catch(() => {
          nuevo();
        });
    };

    consultarRegistroPresupuesto(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");

      const registroPresupuesto = {
        institucioneducativaid: {
          codigo: institucionEducativaCodigo.value,
        },
        consecutivo: consecutivo.value,
        fecha: fecha.value,
        terceroid: {
          codigo: terceroCodigo.value,
        },
        observacion: observacion.value,
        certificadodisponibilidadpresupuestalid: {
          consecutivo: certificadoPresupuestoConsecutivo.value,
        },
        valor: Math.abs(valor.value),
      };

      api
        .insertarRegistroPresupuesto(registroPresupuesto)
        .then((data) => {
          consultarRegistroPresupuesto(data.consecutivo);
          store.commit("mostrarInformacion", "registro insertado con exito");
        })
        .catch(() => {
          store.commit(
            "mostrarError",
            "La fecha no pertenece al periodo activo"
          );

          store.commit(
            "mostrarError",
            "El valor ingresado supera el saldo del CDP"
          );

          if (!valor.value) {
            store.commit("mostrarError", "ingrese un valor válido");
          }

          if (!observacion.value) {
            store.commit("mostrarError", "ingrese una observación válida");
          }

          if (!certificadoPresupuestoConsecutivo.value) {
            store.commit("mostrarError", "ingrese un CDP válido");
          }

          if (!terceroCodigo.value) {
            store.commit("mostrarError", "ingrese un tercero válido");
          }
        });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      consecutivo.value = 0;
      fecha.value = api.obtenerFechaActual();
      terceroCodigo.value = "";
      consultarTercero(terceroCodigo.value);
      observacion.value = "";
      certificadoPresupuestoConsecutivo.value = 0;
      consultarCertificadoPresupuesto(certificadoPresupuestoConsecutivo.value);
      valor.value = 0;
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarRegistroPresupuesto(
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
        name: "registropresupuesto",
      });
    };

    const consultarCertificadoPresupuestoSaldo = function (e) {
      api
        .consultarRubroPresupuestoSaldoSolicitud(
          institucionEducativaCodigo.value,
          e.value
        )
        .then((data) => {
          consultarCertificadoPresupuestoSaldo.value = data;
        })
        .catch(() => {});

      api
        .consultarRubroPresupuestoSaldoRecaudo(
          institucionEducativaCodigo.value,
          e.value
        )
        .then((data) => {
          consultarCertificadoPresupuestoSaldo.value = data;
        })
        .catch(() => {});
    };

    const consultarTercero = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarTercero(c)
        .then((data) => {
          terceroCodigo.value = data.codigo;
          terceroNombre.value = data.nombre;
        })
        .catch(() => {
          terceroCodigo.value = "";
          terceroNombre.value = "";
        });
    };

    const consultarCertificadoPresupuesto = function (c) {
      store.commit("ocultarAlerta");

      api
        .consultarCertificadoPresupuesto(institucionEducativaCodigo.value, c)
        .then((data) => {
          certificadoPresupuestoConsecutivo.value = data.consecutivo;

          api
            .consultarCertificadoPresupuestoSaldo(
              institucionEducativaCodigo.value,
              c
            )
            .then((data) => {
              certificadoPresupuestoSaldo.value = data;
            })
            .catch(() => {
              certificadoPresupuestoSaldo.value = 0;
            });
        })
        .catch(() => {
          certificadoPresupuestoSaldo.value = 0;
        });
    };

    return {
      esNuevo,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      consecutivo,
      fecha,
      terceroCodigo,
      terceroNombre,
      observacion,
      certificadoPresupuestoConsecutivo,
      certificadoPresupuestoSaldo,
      valor,

      guardar,
      eliminar,
      nuevo,
      irAtras,
      consultarRegistroPresupuesto,
      consultarCertificadoPresupuestoSaldo,
      consultarTercero,
      consultarCertificadoPresupuesto,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
