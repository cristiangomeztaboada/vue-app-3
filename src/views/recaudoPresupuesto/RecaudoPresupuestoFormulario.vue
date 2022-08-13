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
            v-bind:mostrarBotonEliminar="!esNuevo"
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
            store.commit("mostrarInformacion", "registro actualizado con exito");
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
              "Existen CDP con rubros asociados a la fuente"
            );
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

    return {
      esNuevo,
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

      tiposRecaudos,
      ingresoPresupuestoSaldo,

      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarRecaudoPresupuesto,
      consultarIngresoPresupuesto,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
