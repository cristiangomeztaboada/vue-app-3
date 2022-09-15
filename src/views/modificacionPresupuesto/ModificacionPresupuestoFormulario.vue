<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">
          <barra-botones
            v-on:guardar="guardar"
            v-on:eliminar="eliminar"
            v-bind:ocultarBotonAtras="true"
            v-bind:ocultarBotonNuevo="true"
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">
            Insertar Modificación Proyección Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">
            Actualizar Modificación Proyección Presupuesto
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
            <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
              <label>Periodo</label>
              <input
                v-model="periodoCodigo"
                class="form-control"
                type="text"
                readonly
              />
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <label>Estado</label>
              <input
                v-model="estado"
                class="form-control"
                type="text"
                readonly
              />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Objeto</label>
              <input v-model="objeto" class="form-control" type="text" />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <label>Fuente Recurso</label>
                  <fuente-recurso-buscador
                    v-bind:soloDetalle="true"
                    v-on:perderFoco="consultarFuenteRecurso"
                    v-bind:mostrarCampoNombre="true"
                    v-bind:nombrePropiedad="fuenteRecursoNombre"
                    v-bind:codigoPropiedad="fuenteRecursoCodigo"
                  />
                </div>
                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <label>Rubro Presupuesto</label>
                  <rubro-presupuesto-buscador
                    v-bind:soloDetalle="true"
                    v-on:perderFoco="consultarRubroPresupuesto"
                    v-bind:mostrarCampoNombre="true"
                    v-bind:nombrePropiedad="rubroPresupuestoNombre"
                    v-bind:codigoPropiedad="rubroPresupuestoCodigo"
                  />
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <label>Valor</label>
                  <DxNumberBox v-model="valor" format="$ #,##0.##" />
                </div>
                <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
                  <br />
                  <ul class="nav nav-pills card-header-pills">
                    <li class="nav-item">
                      <button
                        type="button"
                        class="btn btn-outline-primary"
                        v-on:click="guardarModificacionPresupuestoDetalle"
                      >
                        💾
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <DxDataGrid
                :data-source="modificacionPresupuestoDetalle"
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
                    :on-click="eliminarModificacionPresupuestoDetalle"
                    hint="Eliminar"
                    icon="trash"
                  />
                </DxColumn>
              </DxDataGrid>
            </div>
          </div>

          <div class="card shadow-lg p-3 mb-5 bg-white rounded">
            <div class="card-header"></div>
            <div class="card-body">
              <h5 class="card-title">Totales</h5>
              <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <DxDataGrid
                    :data-source="modificacionPresupuestoDetalleTotalFuente"
                    key-expr="fuenterecursoid.codigo"
                    :show-borders="true"
                    :selection="{ mode: 'single' }"
                    :showRowLines="true"
                  >
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
                      data-field="valor"
                      data-type="number"
                      format="currency"
                      alignment="right"
                    />
                    <DxSummary>
                      <DxTotalItem
                        column="valor"
                        summary-type="sum"
                        value-format="currency"
                      />
                    </DxSummary>
                  </DxDataGrid>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <DxDataGrid
                    :data-source="modificacionPresupuestoDetalleTotalRubro"
                    key-expr="rubropresupuestalid.codigo"
                    :show-borders="true"
                    :selection="{ mode: 'single' }"
                    :showRowLines="true"
                  >
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
                    <DxSummary>
                      <DxTotalItem
                        column="valor"
                        summary-type="sum"
                        value-format="currency"
                      />
                    </DxSummary>
                  </DxDataGrid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="modalImportar" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input id="archivo" type="file" @input="leerArchivo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  DxSummary,
  DxTotalItem,
} from "devextreme-vue/data-grid";
import FuenteRecursoBuscador from "@/views/fuenteRecurso/FuenteRecursoBuscador.vue";
import RubroPresupuestoBuscador from "@/views/rubroPresupuesto/RubroPresupuestoBuscador.vue";
import DxNumberBox from "devextreme-vue/number-box";

export default {
  name: "ModificacionPresupuestoFormulario",
  components: {
    BarraBotones,
    DxDataGrid,
    DxSearchPanel,
    DxColumn,
    DxButton,
    DxEditing,
    FuenteRecursoBuscador,
    RubroPresupuestoBuscador,
    DxNumberBox,
    DxSummary,
    DxTotalItem,
  },
  setup() {
    const esNuevo = ref(true);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const periodoCodigo = ref("");
    const estado = ref("");
    const objeto = ref("");
    const observacion = ref("");
    const store = useStore();
    const modificacionPresupuestoDetalle = ref([]);
    const modificacionPresupuestoDetalleTotalFuente = ref([]);
    const modificacionPresupuestoDetalleTotalRubro = ref([]);
    const fuenteRecursoCodigo = ref("");
    const fuenteRecursoNombre = ref("");
    const rubroPresupuestoCodigo = ref("");
    const rubroPresupuestoNombre = ref("");
    const valor = ref(0);

    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const totalizarFuente = function () {
      modificacionPresupuestoDetalleTotalFuente.value = [];
      modificacionPresupuestoDetalleTotalFuente.value =
        modificacionPresupuestoDetalle.value.reduce(function (a, d) {
          let existe = false;
          for (var i = 0; i < a.length; i++) {
            if (a[i].fuenterecursoid.codigo == d.fuenterecursoid.codigo) {
              existe = true;
            }
          }
          if (!existe) {
            a.push({
              fuenterecursoid: {
                codigo: d.fuenterecursoid.codigo,
                nombre: d.fuenterecursoid.nombre,
              },
              valor: Number(0),
            });
          }
          return a;
        }, []);

      for (
        var i = 0;
        i < modificacionPresupuestoDetalleTotalFuente.value.length;
        i++
      ) {
        for (var j = 0; j < modificacionPresupuestoDetalle.value.length; j++) {
          if (
            modificacionPresupuestoDetalleTotalFuente.value[i].fuenterecursoid
              .codigo ==
            modificacionPresupuestoDetalle.value[j].fuenterecursoid.codigo
          ) {
            modificacionPresupuestoDetalleTotalFuente.value[i].valor += Number(
              modificacionPresupuestoDetalle.value[j].valor
            );
          }
        }
      }
    };

    const totalizarRubro = function () {
      modificacionPresupuestoDetalleTotalRubro.value = [];
      modificacionPresupuestoDetalleTotalRubro.value =
        modificacionPresupuestoDetalle.value.reduce(function (a, d) {
          let existe = false;
          for (var i = 0; i < a.length; i++) {
            if (
              a[i].rubropresupuestalid.codigo == d.rubropresupuestalid.codigo
            ) {
              existe = true;
            }
          }
          if (!existe) {
            a.push({
              rubropresupuestalid: {
                codigo: d.rubropresupuestalid.codigo,
                nombre: d.rubropresupuestalid.nombre,
              },
              valor: Number(0),
            });
          }
          return a;
        }, []);

      for (
        var i = 0;
        i < modificacionPresupuestoDetalleTotalRubro.value.length;
        i++
      ) {
        for (var j = 0; j < modificacionPresupuestoDetalle.value.length; j++) {
          if (
            modificacionPresupuestoDetalleTotalRubro.value[i].rubropresupuestalid
              .codigo ==
            modificacionPresupuestoDetalle.value[j].rubropresupuestalid.codigo
          ) {
            modificacionPresupuestoDetalleTotalRubro.value[i].valor += Number(
              modificacionPresupuestoDetalle.value[j].valor
            );
          }
        }
      }
    };

    const totalizar = function () {
      totalizarFuente();
      totalizarRubro();
    };

    const consultarModificacionPresupuesto = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .listarPeriodoActivos()
        .then((data) => {          
          periodoCodigo.value = data[0].codigo;
          institucionEducativaCodigo.value = store.state.institucioneducativa;
          api
            .consultarModificacionPresupuesto(
              data[0].codigo,
              store.state.institucioneducativa
            )
            .then((data) => {
              if (data.id) {
                esNuevo.value = false;
              }                            
              periodoCodigo.value = data.periodoid.codigo;
              institucionEducativaCodigo.value =
                data.institucioneducativaid.codigo;
              estado.value = data.estado;
              observacion.value = data.observacion;
              objeto.value = data.objeto;
              modificacionPresupuestoDetalle.value =
                data.modificacionproyeccionpresupuestaldetalle;
              totalizar();
              
            })
            .catch(() => {
              store.commit("mostrarError", "No existe modificación proyección presupuestal");
            });
        })
        .catch(function (e) {
          store.commit("mostrarError", e);
        });
    };

    consultarModificacionPresupuesto();

    const guardar = function () {
      store.commit("ocultarAlerta");

      const modificacionPresupuesto = {
        institucioneducativaid: {
          codigo: institucionEducativaCodigo.value,
        },
        periodoid: {
          codigo: periodoCodigo.value,
        },
        observacion: observacion.value,
        objeto: objeto.value,
        estado: estado.value,
      };

      if (esNuevo.value) {

        api
          .insertarModificacionPresupuesto(modificacionPresupuesto)
          .then(() => {
            consultarModificacionPresupuesto();
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch((e) => {
            store.commit("mostrarError", e);

            if (!modificacionPresupuesto.objeto) {
              store.commit(
                "mostrarError",
                "ingrese un valor en el campo objeto"
              );
            }
          });
      } else {
        api
          .actualizarModificacionPresupuesto(modificacionPresupuesto)
          .then(() => {
            consultarModificacionPresupuesto();
            store.commit(
              "mostrarInformacion",
              "registro actualizado con exito"
            );
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "No se puede modificar un documento aprobado"
            );
          });
      }
    };

    const guardarModificacionPresupuestoDetalle = function () {
      store.commit("ocultarAlerta");

      const modificacionPresupuestoDetalle = {
        modificacionproyeccionpresupuestalid: {
          codigoperiodo: periodoCodigo.value,
          codigoinstitucioneducativa: institucionEducativaCodigo.value,
        },
        fuenterecursoid: {
          codigo: fuenteRecursoCodigo.value,
        },
        rubropresupuestalid: {
          codigo: rubroPresupuestoCodigo.value,
        },
        valor: Number(valor.value),
      };

      api
        .insertarModificacionPresupuestoDetalle(modificacionPresupuestoDetalle)
        .then(() => {
          store.commit("mostrarInformacion", "registro insertado con exito");
          consultarModificacionPresupuesto();

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

      api
        .listarPeriodoActivos()
        .then((data) => {
          periodoCodigo.value = data[0].codigo;
        })
        .catch(function (e) {
          store.commit("mostrarError", e);
        });

      observacion.value = "";
      estado.value = "";
      objeto.value = "";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarModificacionPresupuesto(
            periodoCodigo.value,
            institucionEducativaCodigo.value
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

    const eliminarModificacionPresupuestoDetalle = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarModificacionPresupuestoDetalle(
            periodoCodigo.value,
            institucionEducativaCodigo.value,
            rowData.row.values[0]
          )
          .then(() => {
            consultarModificacionPresupuesto();
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "No es posible eliminar por: -1)Existe ingreso presupuestal con esta fuente asociada -2)Existe solicitud presupuestal con este rubro asociado"
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
          fuenteRecursoNombre.value = data.nombre;
        })
        .catch(() => {
          fuenteRecursoCodigo.value = "";
          fuenteRecursoNombre.value = "";
        });
    };

    const consultarRubroPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarRubroPresupuesto(c)
        .then((data) => {
          rubroPresupuestoCodigo.value = data.codigo;
          rubroPresupuestoNombre.value = data.nombre;
        })
        .catch(() => {
          rubroPresupuestoCodigo.value = "";
          rubroPresupuestoNombre.value = "";
        });
    };  

    return {
      esNuevo,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      periodoCodigo,
      estado,
      objeto,
      observacion,
      modificacionPresupuestoDetalle,
      modificacionPresupuestoDetalleTotalFuente,
      modificacionPresupuestoDetalleTotalRubro,
      fuenteRecursoCodigo,
      fuenteRecursoNombre,
      rubroPresupuestoCodigo,
      rubroPresupuestoNombre,
      valor,
      guardar,
      eliminar,
      nuevo,
      consultarModificacionPresupuesto,
      eliminarModificacionPresupuestoDetalle,
      guardarModificacionPresupuestoDetalle,
      consultarFuenteRecurso,
      consultarRubroPresupuesto,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
