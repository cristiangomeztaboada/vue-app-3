<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <div class="card shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">
          <barra-botones
            v-on:guardar="guardar"
            v-bind:ocultarBotonAtras="true"
            v-bind:ocultarBotonNuevo="true"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">Usuario Auditor</h5>
          <DxSelectBox
            :items="usuarioAuditor"
            display-expr="name"
            value-expr="username"
            v-model="usuarioAuditorCodigo"
            @value-changed="usuarioAuditorCodigoCambio"
          />
          <label>Institución Educativa</label>
          <institucion-educativa-buscador
            v-on:perderFoco="consultarInstitucionEducativa"
            v-bind:codigoPropiedad="institucionEducativaCodigo"
            v-bind:nombrePropiedad="institucionEducativaNombre"
            v-bind:mostrarCampoNombre="true"
          />
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <DxDataGrid
              :data-source="usuarioAuditorInstitucionEducativa"
              key-expr="id"
              :show-borders="true"
              :selection="{ mode: 'single' }"
              :showRowLines="true"
              :row-alternation-enabled="true"
            >
              <DxEditing :use-icons="true" mode="row"> </DxEditing>
              <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
              <template #id>
                <b style="color: black">ID</b>
              </template>
              <DxColumn
                data-field="id"
                header-cell-template="id"
              />
              <template #institucionEducativaNombre>
                <b style="color: black">INSTITUCIÓN EDUCATIVA</b>
              </template>
              <DxColumn
                data-field="institucioneducativaid.nombre"
                header-cell-template="institucionEducativaNombre"
              />
              <DxColumn type="buttons" :width="110">
                <DxButton
                  :on-click="eliminarUsuarioAuditorInstitucionEducativa"
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
</template>

<script>
import InstitucionEducativaBuscador from "@/views/institucionEducativa/InstitucionEducativaBuscador.vue";
import DxSelectBox from "devextreme-vue/select-box";
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

export default {
  name: "TerceroFormulario",
  components: {
    InstitucionEducativaBuscador,
    BarraBotones,
    DxDataGrid,
    DxSearchPanel,
    DxSelectBox,
    DxColumn,
    DxButton,
    DxEditing,
  },
  setup() {
    const esNuevo = ref(true);
    const codigo = ref("");
    const nombre = ref("");
    const usuarioAuditorCodigo = ref("");
    const store = useStore();
    const usuarioAuditor = ref([]);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const usuarioAuditorInstitucionEducativa = ref([]);

    const usuarioAuditorCodigoCambio = function () {
      store.commit("ocultarAlerta");
      usuarioAuditorInstitucionEducativa.value = [];
      api
        .consultarUsuarioAuditor(usuarioAuditorCodigo.value)
        .then((data) => {
          usuarioAuditorInstitucionEducativa.value = data;
        })
        .catch(() => {});
    };

    const listarUsuarioAuditor = function () {
      store.commit("ocultarAlerta");
      api
        .listarUsuarioAuditor()
        .then((data) => {          
          usuarioAuditor.value = data;
        })
        .catch(() => {});
    };

    listarUsuarioAuditor();

    const guardar = function () {
      store.commit("ocultarAlerta");
      const objeto = {
        usuarioid: { username: usuarioAuditorCodigo.value },
        institucioneducativaid: { codigo: institucionEducativaCodigo.value },
      };
      
      if(!objeto.usuarioid.username || !objeto.institucioneducativaid.codigo){
        store.commit("mostrarError", "Ingrese el usuario y la institución educativa");
        return;
      }

      api
        .insertarUsuarioAuditor(objeto)
        .then(() => {
          usuarioAuditorCodigoCambio();
          institucionEducativaCodigo.value = "";
          institucionEducativaNombre.value = "";
          store.commit("mostrarInformacion", "registro insertado con exito");
        })
        .catch(function () {
          store.commit("mostrarError", "El usuario ya es auditor de la institución educativa");
        });
    };

    const eliminarUsuarioAuditorInstitucionEducativa = function (rowData) {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarUsuarioAuditorInstitucionEducativa(rowData.row.values[0])
          .then(() => {
            usuarioAuditorCodigoCambio();
          })
          .catch(() => {});
      }
    };

    const consultarUsuarioAuditor = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarUsuarioAuditor(c)
        .then((data) => {
          usuarioAuditorCodigo.value = data.codigo;
        })
        .catch(function () {
          usuarioAuditorCodigo.value = "";
        });
    };

    const consultarInstitucionEducativa = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarInstitucionEducativa(c)
        .then((data) => {
          institucionEducativaCodigo.value = data.codigo;
          institucionEducativaNombre.value = data.nombre;
        })
        .catch(function () {
          institucionEducativaCodigo.value = "";
          institucionEducativaNombre.value = "";
        });
    };

    return {
      esNuevo,
      codigo,
      nombre,
      usuarioAuditorCodigo,
      usuarioAuditor,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      usuarioAuditorInstitucionEducativa,
      guardar,
      eliminarUsuarioAuditorInstitucionEducativa,
      consultarUsuarioAuditor,
      consultarInstitucionEducativa,
      usuarioAuditorCodigoCambio,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
