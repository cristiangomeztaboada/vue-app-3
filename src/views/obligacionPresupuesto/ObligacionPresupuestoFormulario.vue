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
            Insertar Obligación Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">Obligación Presupuesto</h5>
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
              <obligacion-presupuesto-buscador
                v-on:perderFoco="consultarObligacionPresupuesto"
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
            <div v-show="false" class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Recibido a Satisfacción #</label>
              <input
                class="form-control"
                v-model="reciboSatisfacion"
                type="number"
                id="reciboSatisfacion"
              />
            </div>
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
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Registro Presupuesto</label>
              <registro-presupuesto-buscador
                v-on:perderFoco="consultarRegistroPresupuesto"
                v-bind:codigoPropiedad="registroPresupuestoConsecutivo"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Saldo</label>
              <DxNumberBox
                v-model="registroPresupuestoSaldo"
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
import ObligacionPresupuestoBuscador from "./ObligacionPresupuestoBuscador.vue";
import RegistroPresupuestoBuscador from "@/views/registroPresupuesto/RegistroPresupuestoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useStore } from "vuex";
import DxNumberBox from "devextreme-vue/number-box";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "RegistroPresupuestoFormulario",
  components: {
    ObligacionPresupuestoBuscador,
    RegistroPresupuestoBuscador,
    BarraBotones,
    DxNumberBox,
  },
  setup() {
    const esNuevo = ref(true);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const consecutivo = ref(0);
    const estado = ref("");
    const fecha = ref("");
    const reciboSatisfacion = ref(0);
    const objeto = ref("");
    const observacion = ref("");
    const registroPresupuestoConsecutivo = ref(0);
    const valor = ref(0);
    const registroPresupuestoSaldo = ref(0);

    const store = useStore();
    const route = new useRoute();
    const router = useRouter();

    institucionEducativaCodigo.value = store.state.institucioneducativa;
    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const consultarObligacionPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarObligacionPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          if (data.consecutivo) {
            esNuevo.value = false;
          }
          consecutivo.value = data.consecutivo;
          fecha.value = data.fecha.substring(0, 10);
          reciboSatisfacion.value = data.recibosatisfacion;
          observacion.value = data.observacion;
          registroPresupuestoConsecutivo.value =
            data.registropresupuestalid.consecutivo;

          consultarRegistroPresupuesto(registroPresupuestoConsecutivo.value);

          valor.value = Number(data.valor);
        })
        .catch(() => {
          nuevo();
        });
    };

    consultarObligacionPresupuesto(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");

      const obligacionPresupuesto = {
        institucioneducativaid: {
          codigo: institucionEducativaCodigo.value,
        },
        consecutivo: consecutivo.value,
        fecha: fecha.value,
        recibosatisfacion: reciboSatisfacion.value,
        registropresupuestalid: {
          consecutivo: registroPresupuestoConsecutivo.value,
        },
        observacion: observacion.value,
        valor: Math.abs(valor.value),
      };

      api
        .insertarObligacionPresupuesto(obligacionPresupuesto)
        .then((data) => {
          consultarObligacionPresupuesto(data.consecutivo);
          store.commit("mostrarInformacion", "registro insertado con exito");
        })
        .catch(() => {
          store.commit(
            "mostrarError",
            "La fecha no pertenece al periodo activo"
          );

          if (valor.value > registroPresupuestoSaldo.value) {
            store.commit(
              "mostrarError",
              "El valor ingresado supera el saldo del registro presupuesto"
            );
          }

          if (!valor.value) {
            store.commit("mostrarError", "ingrese un valor válido");
          }

          if (!registroPresupuestoConsecutivo.value) {
            store.commit(
              "mostrarError",
              "ingrese un registro presupuesto válido"
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
      reciboSatisfacion.value = 0;
      observacion.value = "";
      registroPresupuestoConsecutivo.value = 0;
      consultarRegistroPresupuesto(registroPresupuestoConsecutivo.value);
      valor.value = 0;
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarObligacionPresupuesto(
            institucionEducativaCodigo.value,
            consecutivo.value
          )
          .then(() => {
            nuevo();
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Imposible eliminar, existen documentos de pago presupuestal relacionados"
            );
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "obligacionpresupuesto",
      });
    };

    const consultarRegistroPresupuesto = function (c) {
      store.commit("ocultarAlerta");

      api
        .consultarRegistroPresupuesto(institucionEducativaCodigo.value, c)
        .then((data) => {
          registroPresupuestoConsecutivo.value = data.consecutivo;

          api
            .consultarRegistroPresupuestoSaldo(
              institucionEducativaCodigo.value,
              c
            )
            .then((data) => {
              registroPresupuestoSaldo.value = data;
            })
            .catch(() => {
              registroPresupuestoSaldo.value = 0;
            });
        })
        .catch(() => {
          registroPresupuestoSaldo.value = 0;
        });
    };

    return {
      esNuevo,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      consecutivo,
      estado,
      fecha,
      reciboSatisfacion,
      objeto,
      observacion,
      registroPresupuestoConsecutivo,
      valor,
      registroPresupuestoSaldo,

      guardar,
      eliminar,
      nuevo,
      irAtras,
      consultarObligacionPresupuesto,
      consultarRegistroPresupuesto,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
