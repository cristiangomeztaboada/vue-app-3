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
            v-on:imprimir="imprimir"
            v-bind:ocultarBotonGuardar="!esNuevo"
            v-bind:mostrarBotonEliminar="!esNuevo"
            v-bind:mostrarBotonAdjuntar="!esNuevo"
            v-bind:mostrarBotonImprimir="!esNuevo"
            v-bind:tipo="6"
            v-bind:id="id"
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

  <div v-show="imprimiendo" id="pdf" class="card-body">
    <div align="center">
      <img src="@/assets/logo2.png" />
    </div>
    <br /><br />
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <input
          v-model="institucionEducativaNombre"
          class="form-control"
          type="text"
          style="text-align: center; border: 0; font-weight: bold"
        />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <h5 class="card-title" style="text-align: center">
          Obligación Presupuesto
        </h5>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Consecutivo:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="consecutivo" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Estado:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="estado" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Fecha:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="fecha" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Objeto:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <textarea v-model="objeto" class="form-control" type="text" rows="2" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Observación:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <textarea
          v-model="observacion"
          class="form-control"
          type="text"
          rows="2"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>RP:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input
          v-model="registroPresupuestoConsecutivo"
          class="form-control"
          type="text"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Valor:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <DxNumberBox v-model="valor" format="$ #,##0.##" />
      </div>
    </div>
    <br />
    <br />
    <br />
    <div class="row">
      <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <hr />
        <b><center>Elaborado por</center></b>
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <hr />
        <b><center>Aprobado por</center></b>
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
import html2pdf from "html2pdf.js";

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
    const id = ref(0);
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
    const imprimiendo = ref(false);

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
          id.value = data.id;
          consecutivo.value = data.consecutivo;
          estado.value = data.estado;
          fecha.value = data.fecha.substring(0, 10);
          reciboSatisfacion.value = data.recibosatisfacion;
          objeto.value = data.objeto;
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
        objeto: objeto.value,
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

          if (!objeto.value) {
            store.commit("mostrarError", "Diligencie el campo objeto");
          }
        });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      id.value = 0;
      consecutivo.value = 0;
      estado.value = "";
      fecha.value = api.obtenerFechaActual();
      reciboSatisfacion.value = 0;
      objeto.value = "";
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
            router.push({
              name: "obligacionpresupuesto",
            });
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Imposible eliminar, existen documentos de pago presupuestal relacionados"
            );

            if (estado.value == "Anulado") {
              store.commit(
                "mostrarError",
                "El documento ya se encuentra anulado"
              );
            }
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

    const imprimir = function () {
      try {
        imprimiendo.value = true;
        store.commit("ocultarAlerta");
        const element = document.getElementById("pdf");
        html2pdf().from(element).save();
        setTimeout(() => {
          imprimiendo.value = false;
        }, 0);
      } catch (e) {
        imprimiendo.value = false;
      }
    };

    return {
      esNuevo,
      id,
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
      imprimiendo,

      guardar,
      eliminar,
      nuevo,
      irAtras,
      consultarObligacionPresupuesto,
      consultarRegistroPresupuesto,
      imprimir,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
