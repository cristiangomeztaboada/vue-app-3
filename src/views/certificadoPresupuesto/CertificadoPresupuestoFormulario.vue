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
            Insertar Certificado Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">
            Certificado Presupuesto
          </h5>
          <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Institución Educativa</label>
              <input
                v-model="institucionEducativaNombre"
                class="form-control"
                type="text"
                readonly
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Consecutivo</label>
              <certificado-presupuesto-buscador
                v-on:perderFoco="consultarCertificadoPresupuesto"
                v-bind:codigoPropiedad="consecutivo"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Fecha</label>
              <input
                class="form-control"
                v-model="fecha"
                type="date"
                id="fecha"
                readonly
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Días Validez</label>
              <input v-model="diasValidez" class="form-control" type="number" />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <label>Observación</label>
              <input v-model="observacion" class="form-control" type="text" />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Rubro Presupuesto</label>
              <DxSelectBox
                :items="listaRubroPresupuesto"
                display-expr="nombre"
                value-expr="codigo"
                v-model="rubroPresupuestoCodigo"
                @value-changed="consultarRubroPresupuestoSaldo"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Saldo Solicitado</label>
              <DxNumberBox
                v-model="rubroPresupuestoSaldoSolicitud"
                format="$ #,##0.##"
                :read-only="true"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Saldo Recaudado</label>
              <DxNumberBox
                v-model="rubroPresupuestoSaldoRecaudo"
                format="$ #,##0.##"
                :read-only="true"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
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
import CertificadoPresupuestoBuscador from "./CertificadoPresupuestoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useStore } from "vuex";
import DxNumberBox from "devextreme-vue/number-box";
import DxSelectBox from "devextreme-vue/select-box";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "CertificadoPresupuestoFormulario",
  components: {
    CertificadoPresupuestoBuscador,
    BarraBotones,
    DxNumberBox,
    DxSelectBox,
  },
  setup() {
    const esNuevo = ref(true);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const consecutivo = ref(0);
    const fecha = ref("");
    const observacion = ref("");
    const diasValidez = ref(0);
    const rubroPresupuestoCodigo = ref("");

    const listaRubroPresupuesto = ref([]);
    const rubroPresupuestoSaldoSolicitud = ref(0);
    const rubroPresupuestoSaldoRecaudo = ref(0);
    const valor = ref(0);

    const store = useStore();
    const route = new useRoute();
    const router = useRouter();

    institucionEducativaCodigo.value = store.state.institucioneducativa;
    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const consultarCertificadoPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarCertificadoPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          if (data.id) {
            esNuevo.value = false;
          }
          consecutivo.value = data.consecutivo;
          fecha.value = data.fecha.substring(0, 10);
          observacion.value = data.observacion;
          diasValidez.value = data.diasvalidez;
          valor.value = data.valor;
          rubroPresupuestoCodigo.value = data.rubropresupuestalid.codigo;
        })
        .catch(() => {
          nuevo();
        });
    };

    consultarCertificadoPresupuesto(route.params.codigo);

    const listarRubroPresupuestoSolicitud = function () {
      api
        .listarRubroPresupuestoSolicitud(institucionEducativaCodigo.value)
        .then((data) => {
          listaRubroPresupuesto.value = data;
        })
        .catch(() => {});
    };

    listarRubroPresupuestoSolicitud();

    const guardar = function () {
      store.commit("ocultarAlerta");

      const certificadoPresupuesto = {
        institucioneducativaid: {
          codigo: institucionEducativaCodigo.value,
        },
        consecutivo: consecutivo.value,
        fecha: fecha.value,
        diasvalidez: diasValidez.value,
        rubropresupuestalid: {
          codigo: rubroPresupuestoCodigo.value,
        },
        observacion: observacion.value,
        valor: Math.abs(valor.value),
      };

      api
        .insertarCertificadoPresupuesto(certificadoPresupuesto)
        .then((data) => {
          consultarCertificadoPresupuesto(data.consecutivo);
          store.commit("mostrarInformacion", "registro insertado con exito");
        })
        .catch(() => {
          store.commit(
            "mostrarError",
            "La fecha no pertenece al periodo activo"
          );

          if (!valor.value) {
            store.commit("mostrarError", "ingrese un valor válido");
          }

          if (!rubroPresupuestoCodigo.value) {
            store.commit(
              "mostrarError",
              "ingrese un rubro de presupuesto válido"
            );
          }

          if (!observacion.value) {
            store.commit("mostrarError", "ingrese una observación válida");
          }

          if (!diasValidez.value) {
            store.commit(
              "mostrarError",
              "ingrese una cantidad de dias de validez válida"
            );
          }
        });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      consecutivo.value = 0;
      fecha.value = api.obtenerFechaActual();
      observacion.value = "";
      rubroPresupuestoCodigo.value = "";
      rubroPresupuestoSaldoSolicitud.value = 0;
      rubroPresupuestoSaldoRecaudo.value = 0;
      diasValidez.value = 0;
      valor.value = 0;
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarCertificadoPresupuesto(
            institucionEducativaCodigo.value,
            consecutivo.value
          )
          .then(() => {
            nuevo();
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Existen registros de presupuesto con rubros asociados al CDP"
            );
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "certificadopresupuesto",
      });
    };

    const consultarRubroPresupuestoSaldo = function (e) {
      api
        .consultarRubroPresupuestoSaldoSolicitud(
          institucionEducativaCodigo.value,
          e.value
        )
        .then((data) => {
          rubroPresupuestoSaldoSolicitud.value = data;
        })
        .catch(() => {});

      api
        .consultarRubroPresupuestoSaldoRecaudo(
          institucionEducativaCodigo.value,
          e.value
        )
        .then((data) => {
          rubroPresupuestoSaldoRecaudo.value = data;
        })
        .catch(() => {});
    };

    return {
      esNuevo,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      consecutivo,
      fecha,
      observacion,
      diasValidez,
      rubroPresupuestoCodigo,
      valor,
      listaRubroPresupuesto,
      rubroPresupuestoSaldoSolicitud,
      rubroPresupuestoSaldoRecaudo,

      guardar,
      eliminar,
      nuevo,
      irAtras,
      consultarCertificadoPresupuesto,
      consultarRubroPresupuestoSaldo,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
