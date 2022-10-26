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
            v-on:imprimir="imprimir"
            v-bind:mostrarBotonEliminar="!esNuevo"
            v-bind:mostrarBotonAdjuntar="!esNuevo"
            v-bind:mostrarBotonImprimir="!esNuevo"
            v-bind:tipo="2"
            v-bind:id="id"
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">
            Insertar Recaudo Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">Recaudo Presupuesto</h5>

          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
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
              <recaudo-presupuesto-buscador
                v-on:perderFoco="consultarRecaudoPresupuesto"
                v-bind:codigoPropiedad="consecutivo"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Estado</label>
              <input
                class="form-control"
                v-model="estado"
                id="estado"
                readonly
              />
            </div>
          </div>

          <div class="row">
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
              <label>Tipo Recaudo</label>
              <DxSelectBox
                :items="tiposRecaudos"
                display-expr="nombre"
                value-expr="codigo"
                v-model="tipoRecaudoCodigo"
              />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Documento Recaudo</label>
              <input
                v-model="documentoRecaudo"
                class="form-control"
                type="text"
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
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Ingreso Presupuesto</label>
              <ingreso-presupuesto-buscador
                v-on:perderFoco="consultarIngresoPresupuesto"
                v-bind:codigoPropiedad="ingresoPresupuestoConsecutivo"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Saldo</label>
              <DxNumberBox
                v-model="ingresoPresupuestoSaldo"
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
          Recaudo Presupuesto
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
        <b>Tipo Recaudo:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <DxSelectBox
          :items="tiposRecaudos"
          display-expr="nombre"
          value-expr="codigo"
          v-model="tipoRecaudoCodigo"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Documento:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="documentoRecaudo" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Ingreso:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="ingresoPresupuestoConsecutivo" class="form-control" type="text" />
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
import RecaudoPresupuestoBuscador from "./RecaudoPresupuestoBuscador.vue";
import IngresoPresupuestoBuscador from "@/views/ingresoPresupuesto/IngresoPresupuestoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import DxSelectBox from "devextreme-vue/select-box";
import DxNumberBox from "devextreme-vue/number-box";
import html2pdf from "html2pdf.js";

export default {
  name: "RecaudoPresupuestoFormulario",
  components: {
    RecaudoPresupuestoBuscador,
    IngresoPresupuestoBuscador,
    BarraBotones,
    DxSelectBox,
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
    const ingresoPresupuestoConsecutivo = ref(0);
    const tipoRecaudoCodigo = ref("");
    const documentoRecaudo = ref("");
    const objeto = ref("");
    const observacion = ref("");
    const valor = ref(0);
    const imprimiendo = ref(false);

    const tiposRecaudos = ref([]);
    const ingresoPresupuestoSaldo = ref(0);

    const route = new useRoute();
    const router = useRouter();
    const store = useStore();

    institucionEducativaCodigo.value = store.state.institucioneducativa;
    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const listarTiposRecaudos = function () {
      api
        .listarTipoRecaudo()
        .then((data) => {
          tiposRecaudos.value = data;
        })
        .catch(function (e) {
          store.commit("mostrarError", e);
        });
    };

    listarTiposRecaudos();

    const consultarRecaudoPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarRecaudoPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          if (data.consecutivo) {
            esNuevo.value = false;
          }
          id.value = data.id;
          consecutivo.value = data.consecutivo;
          estado.value = data.estado;
          fecha.value = data.fecha.substring(0, 10);
          ingresoPresupuestoConsecutivo.value =
            data.ingresopresupuestalid.consecutivo;
          tipoRecaudoCodigo.value = data.tiporecaudoid.codigo;
          documentoRecaudo.value = data.documentorecaudo;
          objeto.value = data.objeto;
          observacion.value = data.observacion;
          valor.value = Number(data.valor);

          consultarIngresoPresupuesto(data.ingresopresupuestalid.consecutivo);
        })
        .catch(function () {
          nuevo();
          consecutivo.value = 0;
        });
    };

    consultarRecaudoPresupuesto(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");
      const recaudoPresupuesto = {
        institucioneducativaid: { codigo: institucionEducativaCodigo.value },
        consecutivo: consecutivo.value,
        fecha: fecha.value,
        valor: valor.value,
        objeto: objeto.value,
        observacion: observacion.value,
        tiporecaudoid: {
          codigo: tipoRecaudoCodigo.value,
        },
        ingresopresupuestalid: {
          consecutivo: ingresoPresupuestoConsecutivo.value,
        },
        documentorecaudo: documentoRecaudo.value,
      };

      if (esNuevo.value) {
        api
          .insertarRecaudoPresupuesto(recaudoPresupuesto)
          .then((data) => {
            consultarRecaudoPresupuesto(data.consecutivo);
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch((e) => {
            if (e) {
              store.commit(
                "mostrarError",
                "El ingreso presupuestal se encuentra anulado o el valor ingresado supera el saldo pendiente"
              );
            }

            if (
              !recaudoPresupuesto.valor ||
              Math.sign(recaudoPresupuesto.valor) != 1
            ) {
              store.commit("mostrarError", "ingrese un valor válido");
            }

            if (!recaudoPresupuesto.ingresopresupuestalid.consecutivo) {
              store.commit(
                "mostrarError",
                "ingrese un ingreso presupuestal válido"
              );
            }

            if (!recaudoPresupuesto.documentorecaudo) {
              store.commit(
                "mostrarError",
                "ingrese un documento de recaudo válido"
              );
            }

            if (!recaudoPresupuesto.tiporecaudoid.codigo) {
              store.commit("mostrarError", "ingrese un tipo de recaudo válido");
            }

            if (!recaudoPresupuesto.objeto) {
              store.commit(
                "mostrarError",
                "ingrese un objeto de documento válido"
              );
            }
          });
      } else {
        api
          .actualizarRecaudoPresupuesto(recaudoPresupuesto)
          .then((data) => {
            consultarRecaudoPresupuesto(data.consecutivo);
            store.commit(
              "mostrarInformacion",
              "registro actualizado con exito"
            );
          })
          .catch((e) => {
            if (e) {
              store.commit(
                "mostrarError",
                "No se puede modificar por una de las siguientes razones: 1)el documento se encuentra anulado, 2)el valor ingresado supera el saldo pendiente, 3)el documento ya esta relacionado"
              );
            }

            if (
              !recaudoPresupuesto.valor ||
              Math.sign(recaudoPresupuesto.valor) != 1
            ) {
              store.commit("mostrarError", "ingrese un valor válido");
            }

            if (!recaudoPresupuesto.ingresopresupuestalid.consecutivo) {
              store.commit(
                "mostrarError",
                "ingrese un ingreso presupuestal válido"
              );
            }

            if (!recaudoPresupuesto.documentorecaudo) {
              store.commit(
                "mostrarError",
                "ingrese un documento de recaudo válido"
              );
            }

            if (!recaudoPresupuesto.tiporecaudoid.codigo) {
              store.commit("mostrarError", "ingrese un tipo de recaudo válido");
            }

            if (!recaudoPresupuesto.objeto) {
              store.commit(
                "mostrarError",
                "ingrese un objeto de documento válido"
              );
            }
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "recaudopresupuesto",
      });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");

      let hoy = new Date();
      let fullFechaActual = `${hoy.getFullYear()}-${(hoy.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${hoy.getDate().toString().padStart(2, "0")}`;

      esNuevo.value = true;
      id.value = 0;
      institucionEducativaCodigo.value = store.state.institucioneducativa;
      consecutivo.value = 0;
      estado.value = "";
      fecha.value = fullFechaActual;
      objeto.value = "";
      observacion.value = "";
      valor.value = 0;
      documentoRecaudo.value = "";
      tipoRecaudoCodigo.value = "";
      ingresoPresupuestoConsecutivo.value = 0;
      ingresoPresupuestoSaldo.value = 0;
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarRecaudoPresupuesto(
            store.state.institucioneducativa,
            consecutivo.value
          )
          .then(() =>
            router.push({
              name: "recaudopresupuesto",
            })
          )
          .catch(() => {
            store.commit(
              "mostrarError",
              "Existen solicitudes de presupuesto asociadas a la fuente"
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

    const consultarIngresoPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarIngresoPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          ingresoPresupuestoConsecutivo.value = data.consecutivo;

          api
            .consultarIngresoPresupuestoSaldo(
              store.state.institucioneducativa,
              c
            )
            .then((data) => {
              ingresoPresupuestoSaldo.value = data;
            })
            .catch(() => {
              ingresoPresupuestoSaldo.value = 0;
            });
        })
        .catch(() => {
          ingresoPresupuestoConsecutivo.value = 0;
          ingresoPresupuestoSaldo.value = 0;
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
      ingresoPresupuestoConsecutivo,
      tipoRecaudoCodigo,
      documentoRecaudo,
      objeto,
      observacion,
      valor,
      imprimiendo,

      tiposRecaudos,
      ingresoPresupuestoSaldo,

      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarRecaudoPresupuesto,
      consultarIngresoPresupuesto,
      imprimir,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
