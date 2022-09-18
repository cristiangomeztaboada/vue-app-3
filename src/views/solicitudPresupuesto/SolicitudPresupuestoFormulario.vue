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
            v-bind:mostrarBotonEliminar="!esNuevo"
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">
            Insertar Solicitud Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">Solicitud Presupuesto</h5>
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
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <label>Consecutivo</label>
              <solicitud-presupuesto-buscador
                v-on:perderFoco="consultarSolicitudPresupuesto"
                v-bind:codigoPropiedad="consecutivo"
              />
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <label>Fecha</label>
              <input
                class="form-control"
                v-model="fecha"
                type="date"
                id="fecha"
                readonly
              />
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
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
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <label>Solicitante</label>
              <DxSelectBox
                :items="listaPersonalPlanta"
                display-expr="nombre"
                value-expr="codigo"
                v-model="solicitante"
              />
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <label>Solicitado</label>
              <DxSelectBox
                :items="listaPersonalPlanta"
                display-expr="nombre"
                value-expr="codigo"
                v-model="solicitado"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Objeto</label>
              <input v-model="objeto" class="form-control" type="text" />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Observación</label>
              <input v-model="observacion" class="form-control" type="text" />
            </div>
          </div>

          <br />
          <div class="card shadow-lg p-3 mb-5 bg-white rounded">
            <div class="card-header"></div>
            <div class="card-body">
              <h5 class="card-title">Fuente Recurso-Rubro Presupuesto</h5>
              <div class="row">
                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <label>Fuente Recurso</label>
                  <DxSelectBox
                    :items="listaFuenteRecurso"
                    display-expr="nombre"
                    value-expr="codigo"
                    v-model="fuenteRecursoCodigo"
                    @value-changed="consultarFuenteRecursoSaldoRecaudo"
                  />
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <label>Saldo</label>
                  <DxNumberBox
                    v-model="fuenteRecursoSaldo"
                    format="$ #,##0.##"
                    :read-only="true"
                  />
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <label>Rubro Presupuesto</label>
                  <DxSelectBox
                    :items="listaRubroPresupuesto"
                    display-expr="nombre"
                    value-expr="codigo"
                    v-model="rubroPresupuestoCodigo"
                    @value-changed="consultarRubroPresupuestoSaldo"
                  />
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <label>Saldo</label>
                  <DxNumberBox
                    v-model="rubroPresupuestoSaldo"
                    format="$ #,##0.##"
                    :read-only="true"
                  />
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <label>Valor</label>
                  <DxNumberBox
                    v-model="rubroPresupuestoValor"
                    format="$ #,##0.##"
                  />
                </div>
                <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
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
                  data-field="id"
                  caption="Id"
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
    const solicitante = ref("");
    const solicitado = ref("");
    const listaPersonalPlanta = ref([]);
    const listaRubroPresupuesto = ref([]);
    const listaFuenteRecurso = ref([]);
    const rubroPresupuestoSaldo = ref(0);
    const fuenteRecursoSaldo = ref(0);
    const listaTipoContrato = ref([]);

    const store = useStore();

    const solicitudPresupuestoDetalle = ref([]);

    const rubroPresupuestoCodigo = ref("");
    const rubroPresupuestoValor = ref(0);

    const fuenteRecursoCodigo = ref("");
    const fuenteRecursoValor = ref(0);

    const route = new useRoute();
    const router = useRouter();

    institucionEducativaCodigo.value = store.state.institucioneducativa;
    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const listarTipoContrato = function () {
      store.commit("ocultarAlerta");
      api
        .listarTipoContrato()
        .then((data) => {
          listaTipoContrato.value = data;
        })
        .catch(() => {});
    };

    listarTipoContrato();

    const listarRubroPresupuestoProyeccion = function () {
      store.commit("ocultarAlerta");
      api
        .listarRubroPresupuestoProyeccion(institucionEducativaCodigo.value)
        .then((data) => {
          listaRubroPresupuesto.value = data;
        })
        .catch(() => {});
    };

    const listarFuenteRecursoProyeccion = function () {
      store.commit("ocultarAlerta");
      api
        .listarFuenteRecursoProyeccion(institucionEducativaCodigo.value)
        .then((data) => {
          listaFuenteRecurso.value = data;
        })
        .catch(() => {});
    };

    listarRubroPresupuestoProyeccion();
    listarFuenteRecursoProyeccion();

    const listarPersonalPlanta = function () {
      store.commit("ocultarAlerta");
      api
        .listarPersonalPlanta(institucionEducativaCodigo.value)
        .then((data) => {
          listaPersonalPlanta.value = data;
        })
        .catch(() => {});
    };

    listarPersonalPlanta();

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
          estado.value = data.estado;
          objeto.value = data.objeto;
          observacion.value = data.observacion;
          solicitante.value = data.personalplantaidsolicitante.codigo;
          solicitado.value = data.personalplantaidsolicitado.codigo;
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
        objeto: objeto.value,
        observacion: observacion.value,
        personalplantaidsolicitante: {
          codigo: solicitante.value,
        },
        personalplantaidsolicitado: {
          codigo: solicitado.value,
        },
      };

      if (esNuevo.value) {
        api
          .insertarSolicitudPresupuesto(solicitudPresupuesto)
          .then((data) => {
            consultarSolicitudPresupuesto(data.consecutivo);
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch((e) => {
            store.commit("mostrarError", e);

            if (!objeto.value) {
              store.commit("mostrarError", "diligencie el campo objeto");
            }

            if (!solicitado.value) {
              store.commit("mostrarError", "ingrese un solicitado válido");
            }

            if (!solicitante.value) {
              store.commit("mostrarError", "ingrese un solicitante válido");
            }
          });
      } else {
        api
          .actualizarSolicitudPresupuesto(solicitudPresupuesto)
          .then((data) => {
            consultarSolicitudPresupuesto(data.consecutivo);
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch((e) => {
            store.commit("mostrarError", e);

            if (!objeto.value) {
              store.commit("mostrarError", "diligencie el campo objeto");
            }

            if (!solicitado.value) {
              store.commit("mostrarError", "ingrese un solicitado válido");
            }

            if (!solicitante.value) {
              store.commit("mostrarError", "ingrese un solicitante válido");
            }
          });
      }
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
        fuenterecursoid: {
          codigo: fuenteRecursoCodigo.value,
        },
        valor: Math.abs(rubroPresupuestoValor.value),
      };

      api
        .insertarSolicitudPresupuestoDetalle(solicitudPresupuestoDetalle)
        .then(() => {
          store.commit("mostrarInformacion", "registro insertado con exito");
          consultarSolicitudPresupuesto(consecutivo.value);
          rubroPresupuestoCodigo.value = "";
          rubroPresupuestoSaldo.value = 0;
          rubroPresupuestoValor.value = 0;

          fuenteRecursoCodigo.value = "";
          fuenteRecursoSaldo.value = 0;
          fuenteRecursoValor.value = 0;
        })
        .catch(() => {
          store.commit(
            "mostrarError",
            "1)Guarde primero la cabecera de la solicitud. 2)Ingrese una fuente, rubro y valor válido. 3)Asegurese que el monto solicitado por fuente-rubro no supera al montro proyectado 4)La combinación fuente-rubro no se puede repetir para la misma solicitud"
          );
        });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      consecutivo.value = 0;
      fecha.value = api.obtenerFechaActual();
      estado.value = "";
      observacion.value = "";
      solicitante.value = "";
      solicitado.value = "";
      solicitudPresupuestoDetalle.value = [];
      rubroPresupuestoCodigo.value = "";
      rubroPresupuestoSaldo.value = 0;
      fuenteRecursoCodigo.value = "";
      fuenteRecursoSaldo.value = 0;
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
            router.push({
              name: "solicitudpresupuesto",
            })
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Primero debe eliminar los registros de detalle del documento"
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

    const consultarRubroPresupuestoSaldo = function (e) {
      store.commit("ocultarAlerta");
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

    const consultarFuenteRecursoSaldoRecaudo = function (e) {
      store.commit("ocultarAlerta");
      api
        .consultarFuenteRecursoSaldoRecaudo(
          institucionEducativaCodigo.value,
          e.value
        )
        .then((data) => {
          fuenteRecursoSaldo.value = data;
        })
        .catch(() => {});
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
      solicitante,
      solicitado,
      solicitudPresupuestoDetalle,
      rubroPresupuestoCodigo,
      rubroPresupuestoValor,
      fuenteRecursoCodigo,
      fuenteRecursoValor,
      listaPersonalPlanta,
      listaRubroPresupuesto,
      listaFuenteRecurso,
      rubroPresupuestoSaldo,
      fuenteRecursoSaldo,
      listaTipoContrato,

      guardar,
      eliminar,
      nuevo,
      irAtras,
      consultarSolicitudPresupuesto,
      eliminarSolicitudPresupuestoDetalle,
      guardarSolicitudPresupuestoDetalle,
      listarPersonalPlanta,
      listarRubroPresupuestoProyeccion,
      listarFuenteRecursoProyeccion,
      consultarRubroPresupuestoSaldo,
      consultarFuenteRecursoSaldoRecaudo,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
