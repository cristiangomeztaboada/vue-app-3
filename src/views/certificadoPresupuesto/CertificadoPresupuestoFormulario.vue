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
            v-bind:mostrarBotonEliminar="!esNuevo"
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">
            Insertar Certificado Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">Certificado Presupuesto</h5>
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
              <label>Estado</label>
              <input
                v-model="estado"
                class="form-control"
                type="text"
                readonly
              />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Objeto</label>
              <input v-model="objeto" class="form-control" type="text" />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Observación</label>
              <input v-model="observacion" class="form-control" type="text" />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Días Validez</label>
              <input v-model="diasValidez" class="form-control" type="number" />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Solicitud Presupuesto</label>
              <solicitud-presupuesto-buscador
                v-on:perderFoco="consultarSolicitudPresupuesto"
                v-bind:codigoPropiedad="solicitudPresupuestoConsecutivo"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Saldo</label>
              <DxNumberBox
                v-model="solicitudPresupuestoSaldo"
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
import SolicitudPresupuestoBuscador from "@/views/solicitudPresupuesto/SolicitudPresupuestoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useStore } from "vuex";
import DxNumberBox from "devextreme-vue/number-box";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "CertificadoPresupuestoFormulario",
  components: {
    CertificadoPresupuestoBuscador,
    SolicitudPresupuestoBuscador,
    BarraBotones,
    DxNumberBox,
  },
  setup() {
    const esNuevo = ref(true);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const consecutivo = ref(0);
    const fecha = ref("");
    const estado = ref("");
    const objeto = ref("");
    const observacion = ref("");
    const diasValidez = ref(0);

    const solicitudPresupuestoSaldo = ref(0);
    const solicitudPresupuestoConsecutivo = ref(0);
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
          estado.value = data.estado;
          objeto.value = data.objeto;
          observacion.value = data.observacion;
          diasValidez.value = data.diasvalidez;
          solicitudPresupuestoConsecutivo.value =
            data.solicitudpresupuestalcabeceraid.consecutivo;
          valor.value = Number(data.valor);

          consultarSolicitudPresupuesto(solicitudPresupuestoConsecutivo.value);
        })
        .catch(() => {
          nuevo();
        });
    };

    consultarCertificadoPresupuesto(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");

      const certificadoPresupuesto = {
        institucioneducativaid: {
          codigo: institucionEducativaCodigo.value,
        },
        consecutivo: consecutivo.value,
        fecha: fecha.value,
        diasvalidez: diasValidez.value,
        objeto: objeto.value,
        observacion: observacion.value,
        solicitudpresupuestalcabeceraid: {
          consecutivo: solicitudPresupuestoConsecutivo.value,
        },
        valor: Math.abs(valor.value),
      };

      if (esNuevo.value) {
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

            if (!objeto.value) {
              store.commit(
                "mostrarError",
                "Diligencie el campo objeto del documento"
              );
            }

            if (Number(diasValidez.value) <= 0) {
              store.commit(
                "mostrarError",
                "ingrese una cantidad de dias de validez válida"
              );
            }

            if (
              Number(valor.value) > Number(solicitudPresupuestoSaldo.value) ||
              !valor.value
            ) {
              store.commit("mostrarError", "ingrese un valor válido");
            }
          });
      } else {
        api
          .actualizarCertificadoPresupuesto(certificadoPresupuesto)
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

            if (!objeto.value) {
              store.commit(
                "mostrarError",
                "Diligencie el campo objeto del documento"
              );
            }

            if (Number(diasValidez.value) <= 0) {
              store.commit(
                "mostrarError",
                "ingrese una cantidad de dias de validez válida"
              );
            }

            if (
              Number(valor.value) > Number(solicitudPresupuestoSaldo.value) ||
              !valor.value
            ) {
              store.commit("mostrarError", "ingrese un valor válido");
            }
          });
      }
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      consecutivo.value = 0;
      fecha.value = api.obtenerFechaActual();
      estado.value = "";
      objeto.value = "";
      observacion.value = "";
      solicitudPresupuestoSaldo.value = 0;
      diasValidez.value = 0;
      solicitudPresupuestoConsecutivo.value = 0;
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
            router.push({
              name: "solicitudpresupuesto",
            });
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Existen registros de presupuesto asociados al CDP"
            );

            if (estado.value == "Anulado") {
              store.commit(
                "mostrarError",
                "El documento ya se encuenta anulado"
              );
            }
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "certificadopresupuesto",
      });
    };

    const consultarSolicitudPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarSolicitudPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          solicitudPresupuestoConsecutivo.value = data.consecutivo;

          api
            .consultarSolicitudPresupuestoSaldo(
              store.state.institucioneducativa,
              c
            )
            .then((data) => {
              solicitudPresupuestoSaldo.value = data;
            })
            .catch(() => {
              solicitudPresupuestoSaldo.value = 0;
            });
        })
        .catch(() => {
          solicitudPresupuestoConsecutivo.value = 0;
          solicitudPresupuestoSaldo.value = 0;
        });
    };

    return {
      esNuevo,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      consecutivo,
      fecha,
      estado,
      objeto,
      observacion,
      diasValidez,
      valor,
      solicitudPresupuestoSaldo,
      solicitudPresupuestoConsecutivo,

      guardar,
      eliminar,
      nuevo,
      irAtras,
      consultarCertificadoPresupuesto,
      consultarSolicitudPresupuesto,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
