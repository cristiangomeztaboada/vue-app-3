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
            v-bind:mostrarBotonImprimir="!esNuevo"
            v-bind:mostrarBotonEliminar="!esNuevo"
            v-bind:mostrarBotonAdjuntar="!esNuevo"
            v-bind:tipo="1"
            v-bind:id="id"
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">
            Insertar Ingreso Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">Ingreso Presupuesto</h5>
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
              <ingreso-presupuesto-buscador
                v-on:perderFoco="consultarIngresoPresupuesto"
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
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Tercero</label>
              <tercero-buscador
                v-on:perderFoco="consultarTercero"
                v-bind:codigoPropiedad="terceroCodigo"
                v-bind:mostrarCampoNombre="true"
                v-bind:nombrePropiedad="terceroNombre"
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
              <label>Fecha Proyección Recaudo</label>
              <input
                class="form-control"
                v-model="fechaProyeccionRecaudo"
                type="date"
                id="fechaProyeccionRecaudo"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Fuente Recurso</label>
              <DxSelectBox
                :items="fuentesRecursos"
                display-expr="nombre"
                value-expr="codigo"
                v-model="fuenteRecursoCodigo"
                @value-changed="fuenteRecursoCodigoCambio"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Saldo</label>
              <DxNumberBox
                v-model="fuenteRecursoSaldo"
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
          Ingreso Presupuesto
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
        <b>Tercero:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="terceroNombre" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Proyección:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input
          v-model="fechaProyeccionRecaudo"
          class="form-control"
          type="text"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Fuente:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <DxSelectBox
          :items="fuentesRecursos"
          display-expr="nombre"
          value-expr="codigo"
          v-model="fuenteRecursoCodigo"
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
import IngresoPresupuestoBuscador from "./IngresoPresupuestoBuscador.vue";
import TerceroBuscador from "@/views/tercero/TerceroBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import DxSelectBox from "devextreme-vue/select-box";
import DxNumberBox from "devextreme-vue/number-box";
import html2pdf from "html2pdf.js";

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
    const id = ref(0);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const consecutivo = ref(0);
    const estado = ref("");
    const fecha = ref("");
    const fechaProyeccionRecaudo = ref("");
    const terceroCodigo = ref("");
    const terceroNombre = ref("");
    const fuenteRecursoCodigo = ref("");
    const objeto = ref("");
    const observacion = ref("");

    const valor = ref(0);
    const fuentesRecursos = ref([]);
    const fuenteRecursoSaldo = ref(0);
    const imprimiendo = ref(false);

    const route = new useRoute();
    const router = useRouter();
    const store = useStore();

    institucionEducativaCodigo.value = store.state.institucioneducativa;
    institucionEducativaNombre.value = store.state.institucioneducativanombre;

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
        .catch(() => {});
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
          id.value = data.id;
          consecutivo.value = data.consecutivo;
          estado.value = data.estado;
          fecha.value = data.fecha.substring(0, 10);
          fechaProyeccionRecaudo.value = data.fechaproyeccionrecaudo.substring(
            0,
            10
          );
          terceroCodigo.value = data.terceroid.codigo;
          fuenteRecursoCodigo.value = data.fuenterecursoid.codigo;
          objeto.value = data.objeto;
          observacion.value = data.observacion;
          valor.value = Number(data.valor);

          consultarTercero(terceroCodigo.value);
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
        },
        fuenterecursoid: {
          codigo: fuenteRecursoCodigo.value,
        },
        valor: valor.value,
        observacion: observacion.value,
        objeto: objeto.value,
      };

      if (esNuevo.value) {
        api
          .insertarIngresoPresupuesto(ingresoPresupuesto)
          .then((data) => {
            consultarIngresoPresupuesto(data.consecutivo);
            fuenteRecursoCodigoCambio({ value: fuenteRecursoCodigo.value });
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch((e) => {
            if (e) {
              store.commit(
                "mostrarError",
                "El valor ingresado supera el saldo pendiente"
              );

              let isValidDate = Date.parse(ingresoPresupuesto.fecha);
              if (isNaN(isValidDate)) {
                store.commit("mostrarError", "ingrese una fecha válida");
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

              if (!ingresoPresupuesto.objeto) {
                store.commit(
                  "mostrarError",
                  "ingrese una objeto del documento válido"
                );
              }

              isValidDate = Date.parse(
                ingresoPresupuesto.fechaproyeccionrecaudo
              );
              if (isNaN(isValidDate)) {
                store.commit(
                  "mostrarError",
                  "ingrese una fecha proyección recaudo válida"
                );
              }

              if (!ingresoPresupuesto.terceroid.codigo) {
                store.commit("mostrarError", "ingrese un tercero válido");
              }
            }
          });
      } else {
        api
          .actualizarIngresoPresupuesto(ingresoPresupuesto)
          .then((data) => {
            consultarIngresoPresupuesto(data.consecutivo);
            fuenteRecursoCodigoCambio({ value: fuenteRecursoCodigo.value });
            store.commit(
              "mostrarInformacion",
              "registro actualizado con exito"
            );
          })
          .catch((e) => {
            if (e) {
              store.commit(
                "mostrarError",
                "No se puede modificar por una de las siguientes razones: 1)el documento se encuenta anulado, 2)el valor ingresado supera el saldo pendiente, 3)el documento ya esta relacionado"
              );

              let isValidDate = Date.parse(ingresoPresupuesto.fecha);
              if (isNaN(isValidDate)) {
                store.commit("mostrarError", "ingrese una fecha válida");
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

              if (
                !ingresoPresupuesto.valor ||
                Math.sign(ingresoPresupuesto.valor) != 1
              ) {
                store.commit("mostrarError", "ingrese un valor válido");
              }

              if (!ingresoPresupuesto.objeto) {
                store.commit(
                  "mostrarError",
                  "ingrese una objeto del documento válido"
                );
              }

              isValidDate = Date.parse(
                ingresoPresupuesto.fechaproyeccionrecaudo
              );
              if (isNaN(isValidDate)) {
                store.commit(
                  "mostrarError",
                  "ingrese una fecha proyección recaudo válida"
                );
              }

              if (!ingresoPresupuesto.terceroid.codigo) {
                store.commit("mostrarError", "ingrese un tercero válido");
              }
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
      terceroCodigo.value = "";
      terceroNombre.value = "";
      fechaProyeccionRecaudo.value = "";
      objeto.value = "";
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
          .catch(() => {
            store.commit(
              "mostrarError",
              "Existen documentos de recaudo presupuestal relacionados"
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

    return {
      esNuevo,
      id,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      consecutivo,
      estado,
      fecha,
      fechaProyeccionRecaudo,
      terceroCodigo,
      terceroNombre,
      fuenteRecursoCodigo,
      observacion,
      objeto,
      valor,
      fuentesRecursos,
      fuenteRecursoSaldo,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarIngresoPresupuesto,
      consultarTercero,
      fuenteRecursoCodigoCambio,
      imprimir,
      imprimiendo,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
