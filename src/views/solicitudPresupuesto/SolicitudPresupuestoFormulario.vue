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
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">
            Insertar Solicitud Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">
            Actualizar Solicitud Presupuesto
          </h5>
          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Institución Educativa Código</label>
              <input
                v-model="institucionEducativaCodigo"
                class="form-control"
                type="text"
                readonly
              />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Institución Educativa Nombre</label>
              <input
                v-model="institucionEducativaNombre"
                class="form-control"
                type="text"
                readonly
              />
            </div>
          </div>

          <label>Consecutivo</label>
          <solicitud-presupuesto-buscador
            v-on:perderFoco="consultarSolicitudPresupuesto"
            v-bind:codigoPropiedad="consecutivo"
          />
          <label>Fecha</label>
          <input
            class="form-control"
            v-model="fecha"
            type="date"
            id="fecha"
            readonly
          />

          <label>Observación</label>
          <input v-model="observacion" class="form-control" type="text" />

          <label>Solicitante</label>
          <personal-planta-buscador
            v-on:perderFoco="consultarPersonalPlanta"
            v-bind:codigoPropiedad="solicitante"
          />

          <label>Solicitado A</label>
          <personal-planta-buscador
            v-on:perderFoco="consultarPersonalPlanta"
            v-bind:codigoPropiedad="solicitadoA"
          />

          <label>Tercero Tipo Identificación</label>
          <DxSelectBox
            :items="tiposIdentificacion"
            display-expr="nombre"
            value-expr="codigo"
            v-model="tipoIdentificacionCodigo"
          />

          <label>Tercero Identificiación</label>
          <tercero-buscador
            v-on:perderFoco="consultarTercero"
            v-bind:codigoPropiedad="terceroCodigo"
          />

          <label>Tipo Contrato</label>
          <tipo-contrato-buscador
            v-on:perderFoco="consultarTipoContrato"
            v-bind:codigoPropiedad="tipoContratoCodigo"
          />

          <label>Fecha Inicio Contrato</label>
          <input
            class="form-control"
            v-model="fechaInicioContrato"
            type="date"
            id="fechaInicioContrato"
            readonly
          />

          <label>Fecha Fin Contrato</label>
          <input
            class="form-control"
            v-model="fechaFinContrato"
            type="date"
            id="fechaFinContrato"
            readonly
          />

          <label>Número Contrato</label>
          <input v-model="contratoNumero" class="form-control" type="text" />

          <br />
          <div class="card shadow-lg p-3 mb-5 bg-white rounded">
            <div class="card-header"></div>
            <div class="card-body">
              <h5 class="card-title">Fuente Recurso-Rubro Presupuesto</h5>
              <div class="row">
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <label>Fuente Recurso</label>
                  <fuente-recurso-buscador
                    v-bind:soloDetalle="true"
                    v-on:perderFoco="consultarFuenteRecurso"
                  />
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <label>Rubro Presupuesto</label>
                  <rubro-presupuesto-buscador
                    v-bind:soloDetalle="true"
                    v-on:perderFoco="consultarRubroPresupuesto"
                  />
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <label>Valor</label>
                  <DxNumberBox v-model="valor" format="$ #,##0.##" />
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
                  data-field="fuenterecursoid.codigo"
                  caption="Fuente Recurso Código"
                />
                <DxColumn
                  data-field="fuenterecursoid.nombre"
                  caption="Fuente Recurso Nombre"
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
import FuenteRecursoBuscador from "@/views/fuenteRecurso/FuenteRecursoBuscador.vue";
import RubroPresupuestoBuscador from "@/views/rubroPresupuesto/RubroPresupuestoBuscador.vue";
import PersonalPlantaBuscador from "@/views/personalPlanta/PersonalPlantaBuscador.vue";
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
    FuenteRecursoBuscador,
    RubroPresupuestoBuscador,
    DxNumberBox,
    DxSelectBox,
    PersonalPlantaBuscador,
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
    const solicitadoA = ref("");
    const tiposIdentificacion = ref([]);
    const tipoIdentificacionCodigo = ref("");
    const terceroCodigo = ref("");
    const tipoContratoCodigo = ref("");
    const fechaInicioContrato = ref("");
    const fechaFinContrato = ref("");
    const contratoNumero = ref("");

    const store = useStore();

    const solicitudPresupuestoDetalle = ref([]);
    const fuenteRecursoCodigo = ref("");
    const rubroPresupuestoCodigo = ref("");
    const valor = ref(0);

    const route = new useRoute();
    const router = useRouter();

    institucionEducativaCodigo.value = store.state.institucioneducativa;
    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const listarTipoIdentificacion = function () {
      api
        .listarTipoIdentificacion()
        .then((data) => {
          tiposIdentificacion.value = data;
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
          solicitadoA.value = data.personalplantaidsolicitado.codigo;
          tipoIdentificacionCodigo.value =
            data.terceroid.tipoidentificacionid.codigo;
          terceroCodigo.value = data.terceroid.codigo;
          tipoContratoCodigo.value = data.tipocontratoid.codigo;
          fechaInicioContrato.value = data.fechainiciocontrato;
          fechaFinContrato.value = data.fechafincontrato;
          contratoNumero.value = data.contratonumero;

          //solicitudPresupuestoDetalle.value = data.solicitudpresupuestaldetalle;
        })
        .catch(() => {});
    };

    consultarSolicitudPresupuesto(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");

      const solicitudPresupuesto = {
        institucioneducativaid: {
          codigo: institucionEducativaCodigo.value,
        },
        observacion: observacion.value,
      };

      if (esNuevo.value) {
        api
          .insertarSolicitudPresupuesto(solicitudPresupuesto)
          .then(() => {
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch((e) => {
            store.commit("mostrarError", e);
          });
      } else {
        api
          .actualizarSolicitudPresupuesto(solicitudPresupuesto)
          .then(() => {
            store.commit(
              "mostrarInformacion",
              "registro actualizado con exito"
            );
          })
          .catch((e) => {
            store.commit("mostrarError", e);
          });
      }
    };

    const guardarSolicitudPresupuestoDetalle = function () {
      store.commit("ocultarAlerta");

      const solicitudPresupuestoDetalle = {
        solicitudpresupuestalid: {
          codigoinstitucioneducativa: institucionEducativaCodigo.value,
        },
        fuenterecursoid: {
          codigo: fuenteRecursoCodigo.value,
        },
        rubropresupuestalid: {
          codigo: rubroPresupuestoCodigo.value,
        },
        valor: Math.abs(valor.value),
      };

      api
        .insertarSolicitudPresupuestoDetalle(solicitudPresupuestoDetalle)
        .then(() => {
          store.commit("mostrarInformacion", "registro insertado con exito");
          consultarSolicitudPresupuesto();
          fuenteRecursoCodigo.value = "";
          rubroPresupuestoCodigo.value = "";
          valor.value = 0;
        })
        .catch(() => {
          store.commit(
            "mostrarError",
            "Ingrese una fuente, rubro y valor válido"
          );
        });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      institucionEducativaCodigo.value = store.state.institucioneducativa;

      observacion.value = "";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarSolicitudPresupuesto(institucionEducativaCodigo.value)
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
            rowData.row.values[0],
            rowData.row.values[2]
          )
          .then(() => {
            consultarSolicitudPresupuesto();
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Existen documentos de ingreso presupuestal con esta fuente asociada"
            );
          });
      }
    };

    const consultarFuenteRecurso = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarFuenteRecurso(c)
        .then((data) => {
          fuenteRecursoCodigo.value = data.codigo;
        })
        .catch(() => {
          fuenteRecursoCodigo.value = "";
        });
    };

    const consultarRubroPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarRubroPresupuesto(c)
        .then((data) => {
          rubroPresupuestoCodigo.value = data.codigo;
        })
        .catch(() => {
          rubroPresupuestoCodigo.value = "";
        });
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "solicitudpresupuesto",
      });
    };

    const consultarPersonalPlanta = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarPersonalPlanta(c)
        .then((data) => {
          solicitante.value = data.codigo;
        })
        .catch(() => {
          solicitante.value = "";
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

    return {
      esNuevo,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      consecutivo,
      fecha,
      observacion,
      solicitante,
      solicitadoA,
      tiposIdentificacion,
      tipoIdentificacionCodigo,
      terceroCodigo,
      tipoContratoCodigo,
      fechaInicioContrato,
      fechaFinContrato,
      contratoNumero,

      solicitudPresupuestoDetalle,
      fuenteRecursoCodigo,
      rubroPresupuestoCodigo,
      valor,
      guardar,
      eliminar,
      nuevo,
      irAtras,
      consultarSolicitudPresupuesto,
      eliminarSolicitudPresupuestoDetalle,
      guardarSolicitudPresupuestoDetalle,
      consultarFuenteRecurso,
      consultarRubroPresupuesto,
      consultarPersonalPlanta,
      consultarTercero,
      consultarTipoContrato,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
