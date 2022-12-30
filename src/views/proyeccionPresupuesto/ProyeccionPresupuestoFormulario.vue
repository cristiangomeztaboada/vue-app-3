<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
      <div class="card shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">
          <barra-botones
            v-on:guardar="guardar"
            v-on:eliminar="eliminar"
            v-on:aprobar="aprobar"
            v-on:importar="importar"
            v-on:imprimir="imprimir"
            v-bind:ocultarBotonAtras="true"
            v-bind:ocultarBotonNuevo="true"
            v-bind:mostrarBotonAprobar="true"
            v-bind:mostrarBotonImportar="true"
            v-bind:mostrarBotonAdjuntar="!esNuevo"
            v-bind:mostrarBotonImprimir="!esNuevo"
            v-bind:tipo="8"
            v-bind:id="id"
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">
            Insertar Proyección Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">
            Actualizar Proyección Presupuesto
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
                        class="btn btn-success"
                        v-on:click="guardarProyeccionPresupuestoDetalle"
                      >
                        <span>💾</span>GUARDAR
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <DxDataGrid
                :data-source="proyeccionPresupuestoDetalle"
                key-expr="id"
                :show-borders="true"
                :selection="{ mode: 'single' }"
                :showRowLines="true"
                :row-alternation-enabled="true"
              >
                <DxEditing :use-icons="true" mode="row"> </DxEditing>
                <DxSearchPanel
                  :visible="true"
                  :highlight-case-sensitive="true"
                />
                <template #fuenteRecursoCodigo>
                  <b style="color: black">FUENTE RECURSO CÓDIGO</b>
                </template>
                <DxColumn
                  data-field="fuenterecursoid.codigo"
                  caption="Fuente Recurso Código"
                  header-cell-template="fuenteRecursoCodigo"
                />
                <template #fuenteRecursoNombre>
                  <b style="color: black">FUENTE RECURSO NOMBRE</b>
                </template>
                <DxColumn
                  data-field="fuenterecursoid.nombre"
                  caption="Fuente Recurso Nombre"
                  header-cell-template="fuenteRecursoNombre"
                />
                <template #rubroPresupuestoCodigo>
                  <b style="color: black">RUBRO PRESUPUESTO CÓDIGO</b>
                </template>
                <DxColumn
                  data-field="rubropresupuestalid.codigo"
                  caption="Rubro Presupuesto Código"
                  header-cell-template="rubroPresupuestoCodigo"
                />
                <template #rubroPresupuestoNombre>
                  <b style="color: black">RUBRO PRESUPUESTO NOMBRE</b>
                </template>
                <DxColumn
                  data-field="rubropresupuestalid.nombre"
                  caption="Rubro Presupuesto Nombre"
                  header-cell-template="rubroPresupuestoNombre"
                />
                <template #valor>
                  <b style="color: black">VALOR</b>
                </template>
                <DxColumn
                  data-field="valor"
                  data-type="number"
                  format="currency"
                  alignment="right"
                  header-cell-template="valor"
                />
                <DxColumn type="buttons" :width="110">
                  <DxButton
                    :on-click="eliminarProyeccionPresupuestoDetalle"
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
                    :data-source="proyeccionPresupuestoDetalleTotalFuente"
                    key-expr="fuenterecursoid.codigo"
                    :show-borders="true"
                    :selection="{ mode: 'single' }"
                    :showRowLines="true"
                    :row-alternation-enabled="true"
                  >
                    <DxSearchPanel
                      :visible="true"
                      :highlight-case-sensitive="true"
                    />
                    <template #fuenteRecursoCodigo>
                      <b style="color: black">FUENTE RECURSO CÓDIGO</b>
                    </template>
                    <DxColumn
                      data-field="fuenterecursoid.codigo"
                      caption="Fuente Recurso Código"
                      header-cell-template="fuenteRecursoCodigo"
                    />
                    <template #fuenteRecursoNombre>
                      <b style="color: black">FUENTE RECURSO NOMBRE</b>
                    </template>
                    <DxColumn
                      data-field="fuenterecursoid.nombre"
                      caption="Fuente Recurso Nombre"
                      header-cell-template="fuenteRecursoNombre"
                    />
                    <template #valor>
                      <b style="color: black">VALOR</b>
                    </template>
                    <DxColumn
                      data-field="valor"
                      data-type="number"
                      format="currency"
                      alignment="right"
                      header-cell-template="valor"
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
                    :data-source="proyeccionPresupuestoDetalleTotalRubro"
                    key-expr="rubropresupuestalid.codigo"
                    :show-borders="true"
                    :selection="{ mode: 'single' }"
                    :showRowLines="true"
                    :row-alternation-enabled="true"
                  >
                    <DxSearchPanel
                      :visible="true"
                      :highlight-case-sensitive="true"
                    />
                    <template #rubroPresupuestoCodigo>
                      <b style="color: black">RUBRO PRESUPUESTO CÓDIGO</b>
                    </template>
                    <DxColumn
                      data-field="rubropresupuestalid.codigo"
                      caption="Rubro Presupuesto Código"
                      header-cell-template="rubroPresupuestoCodigo"
                    />
                    <template #rubroPresupuestoNombre>
                      <b style="color: black">RUBRO PRESUPUESTO NOMBRE</b>
                    </template>
                    <DxColumn
                      data-field="rubropresupuestalid.nombre"
                      caption="Rubro Presupuesto Nombre"
                      header-cell-template="rubroPresupuestoNombre"
                    />
                    <template #valor>
                      <b style="color: black">VALOR</b>
                    </template>
                    <DxColumn
                      data-field="valor"
                      data-type="number"
                      format="currency"
                      alignment="right"
                      header-cell-template="valor"
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
          Proyección Presupuesto
        </h5>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Vigencia:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="periodoCodigo" class="form-control" type="text" />
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
    <br />
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <DxDataGrid
          :data-source="proyeccionPresupuestoDetalle"
          key-expr="id"
          :show-borders="true"
          :selection="{ mode: 'single' }"
          :showRowLines="true"
          :row-alternation-enabled="true"
        >
          <DxEditing :use-icons="true" mode="row"> </DxEditing>
          <template #fuenteRecursoNombre>
            <b style="color: black">FUENTE RECURSO</b>
          </template>
          <DxColumn
            data-field="fuenterecursoid.nombre"
            caption="Fuente Recurso Nombre"
            header-cell-template="fuenteRecursoNombre"
          />
          <template #rubroPresupuestoNombre>
            <b style="color: black">RUBRO PRESUPUESTO</b>
          </template>
          <DxColumn
            data-field="rubropresupuestalid.nombre"
            caption="Rubro Presupuesto Nombre"
            header-cell-template="rubroPresupuestoNombre"
          />
          <template #valor>
            <b style="color: black">VALOR</b>
          </template>
          <DxColumn
            data-field="valor"
            data-type="number"
            format="currency"
            alignment="right"
            header-cell-template="valor"
          />
        </DxDataGrid>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <DxDataGrid
          :data-source="proyeccionPresupuestoDetalleTotalFuente"
          key-expr="fuenterecursoid.codigo"
          :show-borders="true"
          :selection="{ mode: 'single' }"
          :showRowLines="true"
          :row-alternation-enabled="true"
        >
          <template #fuenteRecursoNombre>
            <b style="color: black">FUENTE RECURSO</b>
          </template>
          <DxColumn
            data-field="fuenterecursoid.nombre"
            caption="Fuente Recurso Nombre"
            header-cell-template="fuenteRecursoNombre"
          />
          <template #valor>
            <b style="color: black">VALOR</b>
          </template>
          <DxColumn
            data-field="valor"
            data-type="number"
            format="currency"
            alignment="right"
            header-cell-template="valor"
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
          :data-source="proyeccionPresupuestoDetalleTotalRubro"
          key-expr="rubropresupuestalid.codigo"
          :show-borders="true"
          :selection="{ mode: 'single' }"
          :showRowLines="true"
          :row-alternation-enabled="true"
        >
          <template #rubroPresupuestoNombre>
            <b style="color: black">RUBRO PRESUPUESTO</b>
          </template>
          <DxColumn
            data-field="rubropresupuestalid.nombre"
            caption="Rubro Presupuesto Nombre"
            header-cell-template="rubroPresupuestoNombre"
          />
          <template #valor>
            <b style="color: black">VALOR</b>
          </template>
          <DxColumn
            data-field="valor"
            data-type="number"
            format="currency"
            alignment="right"
            header-cell-template="valor"
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
import $ from "jquery";
import readXlsFile from "read-excel-file";
import html2pdf from "html2pdf.js";

export default {
  name: "ProyeccionPresupuestoFormulario",
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
    const id = ref(0);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const periodoCodigo = ref("");
    const estado = ref("");
    const objeto = ref("");
    const observacion = ref("");
    const store = useStore();
    const proyeccionPresupuestoDetalle = ref([]);
    const proyeccionPresupuestoDetalleTotalFuente = ref([]);
    const proyeccionPresupuestoDetalleTotalRubro = ref([]);
    const fuenteRecursoCodigo = ref("");
    const fuenteRecursoNombre = ref("");
    const rubroPresupuestoCodigo = ref("");
    const rubroPresupuestoNombre = ref("");
    const valor = ref(0);
    const filasArchivo = ref([]);
    const jsonDetalle = ref([]);
    const imprimiendo = ref(false);

    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const totalizarFuente = function () {
      proyeccionPresupuestoDetalleTotalFuente.value = [];
      proyeccionPresupuestoDetalleTotalFuente.value =
        proyeccionPresupuestoDetalle.value.reduce(function (a, d) {
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
        i < proyeccionPresupuestoDetalleTotalFuente.value.length;
        i++
      ) {
        for (var j = 0; j < proyeccionPresupuestoDetalle.value.length; j++) {
          if (
            proyeccionPresupuestoDetalleTotalFuente.value[i].fuenterecursoid
              .codigo ==
            proyeccionPresupuestoDetalle.value[j].fuenterecursoid.codigo
          ) {
            proyeccionPresupuestoDetalleTotalFuente.value[i].valor += Number(
              proyeccionPresupuestoDetalle.value[j].valor
            );
          }
        }
      }
    };

    const totalizarRubro = function () {
      proyeccionPresupuestoDetalleTotalRubro.value = [];
      proyeccionPresupuestoDetalleTotalRubro.value =
        proyeccionPresupuestoDetalle.value.reduce(function (a, d) {
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
        i < proyeccionPresupuestoDetalleTotalRubro.value.length;
        i++
      ) {
        for (var j = 0; j < proyeccionPresupuestoDetalle.value.length; j++) {
          if (
            proyeccionPresupuestoDetalleTotalRubro.value[i].rubropresupuestalid
              .codigo ==
            proyeccionPresupuestoDetalle.value[j].rubropresupuestalid.codigo
          ) {
            proyeccionPresupuestoDetalleTotalRubro.value[i].valor += Number(
              proyeccionPresupuestoDetalle.value[j].valor
            );
          }
        }
      }
    };

    const totalizar = function () {
      totalizarFuente();
      totalizarRubro();
    };

    const consultarProyeccionPresupuesto = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .listarPeriodoActivos()
        .then((data) => {
          periodoCodigo.value = data[0].codigo;
          institucionEducativaCodigo.value = store.state.institucioneducativa;
          api
            .consultarProyeccionPresupuesto(
              data[0].codigo,
              store.state.institucioneducativa
            )
            .then((data) => {
              if (data.id) {
                esNuevo.value = false;
              }
              id.value = data.id;
              periodoCodigo.value = data.periodoid.codigo;
              institucionEducativaCodigo.value =
                data.institucioneducativaid.codigo;
              estado.value = data.estado;
              observacion.value = data.observacion;
              objeto.value = data.objeto;
              proyeccionPresupuestoDetalle.value =
                data.proyeccionpresupuestaldetalle;
              totalizar();
            })
            .catch(() => {
              store.commit("mostrarError", "No existe proyección presupuestal");
            });
        })
        .catch(() => {
          store.commit("mostrarError", "No existe periodo activo");
        });
    };

    consultarProyeccionPresupuesto();

    const guardar = function () {
      store.commit("ocultarAlerta");

      const proyeccionPresupuesto = {
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
          .insertarProyeccionPresupuesto(proyeccionPresupuesto)
          .then(() => {
            consultarProyeccionPresupuesto();
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch((e) => {
            store.commit("mostrarError", e);

            if (!proyeccionPresupuesto.objeto) {
              store.commit(
                "mostrarError",
                "ingrese un valor en el campo objeto"
              );
            }
          });
      } else {
        api
          .actualizarProyeccionPresupuesto(proyeccionPresupuesto)
          .then(() => {
            consultarProyeccionPresupuesto();
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

    const guardarProyeccionPresupuestoDetalle = function () {
      store.commit("ocultarAlerta");

      const proyeccionPresupuestoDetalle = {
        proyeccionpresupuestalid: {
          codigoperiodo: periodoCodigo.value,
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
        .insertarProyeccionPresupuestoDetalle(proyeccionPresupuestoDetalle)
        .then(() => {
          store.commit("mostrarInformacion", "registro insertado con exito");
          consultarProyeccionPresupuesto();
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
      id.value = 0;
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
          .eliminarProyeccionPresupuesto(
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

    const eliminarProyeccionPresupuestoDetalle = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarProyeccionPresupuestoDetalle(
            periodoCodigo.value,
            institucionEducativaCodigo.value,
            rowData.row.values[0],
            rowData.row.values[2]
          )
          .then(() => {
            consultarProyeccionPresupuesto();
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "No es posible eliminar por: -1)El documento se encuentra aprobado -2)Existe ingreso presupuestal con esta fuente asociada -3)Existe solicitud presupuestal con este rubro asociado"
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

    const aprobar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea aprobar este documento?")) {
        api
          .aprobarProyeccionPresupuesto(
            periodoCodigo.value,
            institucionEducativaCodigo.value
          )
          .then(() => {
            consultarProyeccionPresupuesto();
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Primero debe ingresar los registros de detalle del documento"
            );
          });
      }
    };

    const importar = function () {
      store.commit("ocultarAlerta");
      if (!esNuevo.value) {
        $("#modalImportar").modal("show");
      }
    };

    const leerArchivo = function () {
      store.commit("ocultarAlerta");
      const inputArchivo = document.getElementById("archivo");
      readXlsFile(inputArchivo.files[0]).then((rows) => {
        filasArchivo.value = rows;
        jsonDetalle.value = [];

        for (var i = 1; i < filasArchivo.value.length; i++) {
          jsonDetalle.value.push({
            proyeccionpresupuestalid: {
              codigoperiodo: periodoCodigo.value,
              codigoinstitucioneducativa: institucionEducativaCodigo.value,
            },
            fuenterecursoid: {
              codigo: filasArchivo.value[i][0],
            },
            rubropresupuestalid: {
              codigo: filasArchivo.value[i][1],
            },
            valor: Math.abs(filasArchivo.value[i][2]),
          });
        }

        api
          .eliminarProyeccionPresupuestoDetalleMultiple(
            periodoCodigo.value,
            institucionEducativaCodigo.value
          )
          .then(() => {})
          .catch(() => {
            store.commit(
              "mostrarError",
              "No es posible eliminar por: -1)El documento se encuentra aprobado -2)Existe ingreso presupuestal con esta fuente asociada -3)Existe solicitud presupuestal con este rubro asociado"
            );
          });

        api
          .insertarProyeccionPresupuestoDetalleMultiple(
            periodoCodigo.value,
            institucionEducativaCodigo.value,
            jsonDetalle.value
          )
          .then(() => {
            consultarProyeccionPresupuesto();
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Error al importar plantilla por: 1)El documento se encuentra aprobado 2)revise los datos de la plantilla e intente nuevamente"
            );
          });

        consultarProyeccionPresupuesto();
      });
      document.getElementById("archivo").value = "";
      $("#modalImportar").modal("hide");
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
      periodoCodigo,
      estado,
      objeto,
      observacion,
      proyeccionPresupuestoDetalle,
      proyeccionPresupuestoDetalleTotalFuente,
      proyeccionPresupuestoDetalleTotalRubro,
      fuenteRecursoCodigo,
      fuenteRecursoNombre,
      rubroPresupuestoCodigo,
      rubroPresupuestoNombre,
      valor,
      imprimiendo,
      guardar,
      eliminar,
      nuevo,
      consultarProyeccionPresupuesto,
      eliminarProyeccionPresupuestoDetalle,
      guardarProyeccionPresupuestoDetalle,
      consultarFuenteRecurso,
      consultarRubroPresupuesto,
      aprobar,
      importar,
      leerArchivo,
      imprimir,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
