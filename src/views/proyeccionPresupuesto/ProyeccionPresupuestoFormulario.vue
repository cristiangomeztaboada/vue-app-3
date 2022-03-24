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
            Insertar Proyección Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">
            Actualizar Proyección Presupuesto
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

          <label>Periodo</label>
          <input
            v-model="periodoCodigo"
            class="form-control"
            type="text"
            readonly
          />
          <label>Observación</label>
          <input v-model="observacion" class="form-control" type="text" />
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
                  <input
                    class="form-control"
                    v-model="valor"
                    type="number"
                    id="valor"
                  />
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <br />
                  <ul class="nav nav-pills card-header-pills">
                    <li class="nav-item">
                      <button
                        type="button"
                        class="btn btn-outline-primary"
                        v-on:click="guardarProyeccionPresupuestoDetalle"
                      >
                        💾
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
                    :on-click="eliminarProyeccionPresupuestoDetalle"
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
  },
  setup() {
    const esNuevo = ref(true);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const periodoCodigo = ref("");
    const observacion = ref("");
    const store = useStore();
    const proyeccionPresupuestoDetalle = ref([]);
    const fuenteRecursoCodigo = ref("");
    const rubroPresupuestoCodigo = ref("");
    const valor = ref(0);

    institucionEducativaNombre.value = store.state.institucioneducativanombre;

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
              periodoCodigo.value = data.periodoid.codigo;
              institucionEducativaCodigo.value =
                data.institucioneducativaid.codigo;
              observacion.value = data.observacion;
              proyeccionPresupuestoDetalle.value =
                data.proyeccionpresupuestaldetalle;
            })
            .catch(() => {
              store.commit("mostrarError", "No existe proyección presupuestal");
            });
        })
        .catch(function (e) {
          store.commit("mostrarError", e);
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
      };

      if (esNuevo.value) {
        api
          .insertarProyeccionPresupuesto(proyeccionPresupuesto)
          .then(() => {
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch((e) => {
            store.commit("mostrarError", e);
          });
      } else {
        api
          .insertarProyeccionPresupuesto(proyeccionPresupuesto)
          .then(() => {
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch((e) => {
            store.commit("mostrarError", e);
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

    const eliminarProyeccionPresupuestoDetalle = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        /*
        api
          .eliminarProyeccionPresupuesto(
            periodoCodigo.value,
            institucionEducativaCodigo.value
          )
          .then(() => {
            nuevo();
          })
          .catch((e) => {
            store.commit("mostrarError", e);
          });
          */
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

    return {
      esNuevo,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      periodoCodigo,
      observacion,
      proyeccionPresupuestoDetalle,
      fuenteRecursoCodigo,
      rubroPresupuestoCodigo,
      valor,
      guardar,
      eliminar,
      nuevo,
      consultarProyeccionPresupuesto,
      eliminarProyeccionPresupuestoDetalle,
      guardarProyeccionPresupuestoDetalle,
      consultarFuenteRecurso,
      consultarRubroPresupuesto,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
