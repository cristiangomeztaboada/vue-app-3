<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
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
            Insertar Solicitud Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">Solicitud Presupuesto</h5>
          <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Institución Educativa Código</label>
              <input
                v-model="institucionEducativaCodigo"
                class="form-control"
                type="text"
                readonly
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Institución Educativa Nombre</label>
              <input
                v-model="institucionEducativaNombre"
                class="form-control"
                type="text"
                readonly
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Consecutivo</label>
              <solicitud-presupuesto-buscador
                v-on:perderFoco="consultarSolicitudPresupuesto"
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
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <label>Observación</label>
              <input v-model="observacion" class="form-control" type="text" />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Solicitante</label>
              <DxSelectBox
                :items="listaPersonalPlanta"
                display-expr="nombre"
                value-expr="codigo"
                v-model="solicitante"
              />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Solicitado</label>
              <DxSelectBox
                :items="listaPersonalPlanta"
                display-expr="nombre"
                value-expr="codigo"
                v-model="solicitado"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Tercero Tipo Identificación</label>
              <DxSelectBox
                :items="listaTipoIdentificacion"
                display-expr="nombre"
                value-expr="codigo"
                v-model="tipoIdentificacionCodigo"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Tercero Identificiación</label>
              <tercero-buscador
                v-on:perderFoco="consultarTercero"
                v-bind:codigoPropiedad="terceroCodigo"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Tipo Contrato</label>
              <tipo-contrato-buscador
                v-on:perderFoco="consultarTipoContrato"
                v-bind:codigoPropiedad="tipoContratoCodigo"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Fecha Inicio Contrato</label>
              <input
                class="form-control"
                v-model="fechaInicioContrato"
                type="date"
                id="fechaInicioContrato"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Fecha Fin Contrato</label>
              <input
                class="form-control"
                v-model="fechaFinContrato"
                type="date"
                id="fechaFinContrato"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Número Contrato</label>
              <input
                v-model="contratoNumero"
                class="form-control"
                type="text"
              />
            </div>
          </div>

          <br />
          <div class="card shadow-lg p-3 mb-5 bg-white rounded">
            <div class="card-header"></div>
            <div class="card-body">
              <h5 class="card-title">Rubro Presupuesto</h5>
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
                  <label>Saldo</label>
                  <DxNumberBox
                    v-model="rubroPresupuestoSaldo"
                    format="$ #,##0.##"
                    :read-only="true"
                  />
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <label>Valor</label>
                  <DxNumberBox
                    v-model="rubroPresupuestovalor"
                    format="$ #,##0.##"
                  />
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <br />
                  <ul class="nav nav-pills card-header-pills">
                    <li class="nav-item">
                      <button
                        type="button"
                        class="btn btn-outline-primary"
                        v-on:click="guardarSolicitudPresupuestoDetalle"
                      >
                        💾
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <DxDataGrid
                :data-source="solicitudPresupuestoDetalle"
                key-expr="id"
                :show-borders="true"
                :selection="{ mode: 'single' }"
                :showRowLines="true"
              >
                <DxEditing :use-icons="true" mode="row"> </DxEditing>
                <DxSearchPanel
                  :visible="true"
                  :highlight-case-sensitive="true"
                />
                <DxColumn
                  data-field="rubropresupuestalid.codigo"
                  caption="Rubro Presupuesto Código"
                />
                <DxColumn
                  data-field="rubropresupuestalid.nombre"
                  caption="Rubro Presupuesto Nombre"
                />
                <DxColumn
                  data-field="valor"
                  data-type="number"
                  format="currency"
                  alignment="right"
                />
                <DxColumn type="buttons" :width="110">
                  <DxButton
                    :on-click="eliminarSolicitudPresupuestoDetalle"
                    hint="Eliminar"
                    icon="trash"
                  />
                </DxColumn>
              </DxDataGrid>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SolicitudPresupuestoBuscador from "./SolicitudPresupuestoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useStore } from "vuex";
import {
  DxDataGrid,
  DxSearchPanel,
  DxColumn,
  DxEditing,
  DxButton,
} from "devextreme-vue/data-grid";
import TerceroBuscador from "@/views/tercero/TerceroBuscador.vue";
import TipoContratoBuscador from "@/views/tipoContrato/TipoContratoBuscador.vue";
import DxNumberBox from "devextreme-vue/number-box";
import DxSelectBox from "devextreme-vue/select-box";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "SolicitudPresupuestoFormulario",
  components: {
    SolicitudPresupuestoBuscador,
    BarraBotones,
    DxDataGrid,
    DxSearchPanel,
    DxColumn,
    DxButton,
    DxEditing,
    DxNumberBox,
    DxSelectBox,
    TerceroBuscador,
    TipoContratoBuscador,
  },
  setup() {
    const esNuevo = ref(true);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const consecutivo = ref(0);
    const fecha = ref("");
    const observacion = ref("");
    const solicitante = ref("");
    const solicitado = ref("");
    const listaTipoIdentificacion = ref([]);
    const tipoIdentificacionCodigo = ref("");
    const terceroCodigo = ref("");
    const tipoContratoCodigo = ref("");
    const fechaInicioContrato = ref("");
    const fechaFinContrato = ref("");
    const contratoNumero = ref("");
    const listaPersonalPlanta = ref([]);
    const listaRubroPresupuesto = ref([]);
    const rubroPresupuestoSaldo = ref(0);

    const store = useStore();

    const solicitudPresupuestoDetalle = ref([]);

    const rubroPresupuestoCodigo = ref("");
    const rubroPresupuestovalor = ref(0);

    const route = new useRoute();
    const router = useRouter();

    institucionEducativaCodigo.value = store.state.institucioneducativa;
    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const listarRubroPresupuestoProyeccion = function () {
      api
        .listarRubroPresupuestoProyeccion(institucionEducativaCodigo.value)
        .then((data) => {
          listaRubroPresupuesto.value = data;
        })
        .catch(() => {});
    };

    listarRubroPresupuestoProyeccion();

    const listarPersonalPlanta = function () {
      api
        .listarPersonalPlanta(institucionEducativaCodigo.value)
        .then((data) => {
          listaPersonalPlanta.value = data;
        })
        .catch(() => {});
    };

    listarPersonalPlanta();

    const listarTipoIdentificacion = function () {
      api
        .listarTipoIdentificacion()
        .then((data) => {
          listaTipoIdentificacion.value = data;
        })
        .catch(() => {});
    };

    listarTipoIdentificacion();

    const consultarSolicitudPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarSolicitudPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          if (data.id) {
            esNuevo.value = false;
          }
          consecutivo.value = data.consecutivo;
          fecha.value = data.fecha.substring(0, 10);
          observacion.value = data.observacion;
          solicitante.value = data.personalplantaidsolicitante.codigo;
          solicitado.value = data.personalplantaidsolicitado.codigo;
          tipoIdentificacionCodigo.value =
            data.terceroid.tipoidentificacionid.codigo;
          terceroCodigo.value = data.terceroid.codigo;
          tipoContratoCodigo.value = data.tipocontratoid.codigo;
          fechaInicioContrato.value = data.fechainiciocontrato;
          fechaFinContrato.value = data.fechafincontrato;
          contratoNumero.value = data.contratonumero;
          solicitudPresupuestoDetalle.value = data.solicitudpresupuestaldetalle;
        })
        .catch(() => {
          nuevo();
        });
    };

    consultarSolicitudPresupuesto(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");

      const solicitudPresupuesto = {
        institucioneducativaid: {
          codigo: institucionEducativaCodigo.value,
        },
        consecutivo: consecutivo.value,
        fecha: fecha.value,
        observacion: observacion.value,
        personalplantaidsolicitante: {
          codigo: solicitante.value,
        },
        personalplantaidsolicitado: {
          codigo: solicitado.value,
        },
        terceroid: {
          codigo: terceroCodigo.value,
          tipoidentificacion: tipoIdentificacionCodigo.value,
        },
        tipocontratoid: {
          codigo: tipoContratoCodigo.value,
        },
        fechainiciocontrato: fechaInicioContrato.value,
        fechafincontrato: fechaFinContrato.value,
        contratonumero: contratoNumero.value,
      };

      api
        .insertarSolicitudPresupuesto(solicitudPresupuesto)
        .then((data) => {
          consultarSolicitudPresupuesto(data.consecutivo);
          store.commit("mostrarInformacion", "registro insertado con exito");
        })
        .catch((e) => {
          store.commit("mostrarError", e);

          if (!observacion.value) {
            store.commit(
              "mostrarError",
              "ingrese un número de contrato válido"
            );
          }

          if (!fechaFinContrato.value) {
            store.commit(
              "mostrarError",
              "ingrese una fecha de fin de contrato válida"
            );
          }

          if (!fechaInicioContrato.value) {
            store.commit(
              "mostrarError",
              "ingrese una fecha de inicio de contrato válida"
            );
          }

          if (!observacion.value) {
            store.commit("mostrarError", "ingrese una observación válida");
          }

          if (!tipoContratoCodigo.value) {
            store.commit("mostrarError", "ingrese un tipo de contrato válido");
          }

          if (!terceroCodigo.value) {
            store.commit("mostrarError", "ingrese un tercero válido");
          }

          if (!tipoIdentificacionCodigo.value) {
            store.commit(
              "mostrarError",
              "ingrese un tipo de identificación válido"
            );
          }

          if (!solicitado.value) {
            store.commit("mostrarError", "ingrese un solicitado válido");
          }

          if (!solicitante.value) {
            store.commit("mostrarError", "ingrese un solicitante válido");
          }
        });
    };

    const guardarSolicitudPresupuestoDetalle = function () {
      store.commit("ocultarAlerta");

      const solicitudPresupuestoDetalle = {
        solicitudpresupuestalcabeceraid: {
          codigoinstitucioneducativa: institucionEducativaCodigo.value,
          consecutivo: consecutivo.value,
        },
        rubropresupuestalid: {
          codigo: rubroPresupuestoCodigo.value,
        },
        valor: Math.abs(rubroPresupuestovalor.value),
      };

      api
        .insertarSolicitudPresupuestoDetalle(solicitudPresupuestoDetalle)
        .then(() => {
          store.commit("mostrarInformacion", "registro insertado con exito");
          consultarSolicitudPresupuesto(consecutivo.value);
          rubroPresupuestoCodigo.value = "";
          rubroPresupuestoSaldo.value = 0;
          rubroPresupuestovalor.value = 0;
        })
        .catch(() => {
          store.commit(
            "mostrarError",
            "1)Guarde primero la cabecera de la solicitud. 2)Ingrese un rubro y valor válido. 3)Asegurese que el monto solicitado por rubro no supera al montro proyectado 4)El rubro no se puede repetir para la misma solicitud"
          );
        });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      consecutivo.value = 0;
      fecha.value = api.obtenerFechaActual();
      observacion.value = "";
      solicitante.value = "";
      solicitado.value = "";
      tipoIdentificacionCodigo.value = "";
      terceroCodigo.value = "";
      tipoContratoCodigo.value = "";
      fechaInicioContrato.value = "";
      fechaFinContrato.value = "";
      contratoNumero.value = "";
      solicitudPresupuestoDetalle.value = [];
      rubroPresupuestoCodigo.value = "";
      rubroPresupuestoSaldo.value = 0;
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarSolicitudPresupuesto(
            institucionEducativaCodigo.value,
            consecutivo.value
          )
          .then(() => {
            nuevo();
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Primero debe eliminar los registros de detalle del documento"
            );
          });
      }
    };

    const eliminarSolicitudPresupuestoDetalle = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarSolicitudPresupuestoDetalle(
            institucionEducativaCodigo.value,
            consecutivo.value,
            rowData.row.values[0]
          )
          .then(() => {
            consultarSolicitudPresupuesto(consecutivo.value);
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Existen documentos de CDP con este rubro asociado"
            );
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "solicitudpresupuesto",
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
        .catch(() => {
          terceroCodigo.value = "";
        });
    };

    const consultarTipoContrato = function (c) {
      api
        .consultarTipoContrato(c)
        .then((data) => {
          tipoContratoCodigo.value = data.codigo;
        })
        .catch(() => {
          tipoContratoCodigo.value = "";
        });
    };

    const consultarRubroPresupuestoSaldo = function (e) {
      api
        .consultarRubroPresupuestoSaldo(
          institucionEducativaCodigo.value,
          e.value
        )
        .then((data) => {
          rubroPresupuestoSaldo.value = data;
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
      solicitante,
      solicitado,
      listaTipoIdentificacion,
      tipoIdentificacionCodigo,
      terceroCodigo,
      tipoContratoCodigo,
      fechaInicioContrato,
      fechaFinContrato,
      contratoNumero,
      solicitudPresupuestoDetalle,
      rubroPresupuestoCodigo,
      rubroPresupuestovalor,
      listaPersonalPlanta,
      listaRubroPresupuesto,
      rubroPresupuestoSaldo,

      guardar,
      eliminar,
      nuevo,
      irAtras,
      consultarSolicitudPresupuesto,
      eliminarSolicitudPresupuestoDetalle,
      guardarSolicitudPresupuestoDetalle,
      consultarTercero,
      consultarTipoContrato,
      listarPersonalPlanta,
      listarRubroPresupuestoProyeccion,
      consultarRubroPresupuestoSaldo,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
