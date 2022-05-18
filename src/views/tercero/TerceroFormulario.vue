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
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">Insertar Tercero</h5>
          <h5 v-if="!esNuevo" class="card-title">Actualizar Tercero</h5>

          <label>Código</label>
          <tercero-buscador
            v-on:perderFoco="consultarTercero"
            v-bind:codigoPropiedad="codigo"
          />
          <label>Tipo Identificacion</label>
          <DxSelectBox
            :items="tiposIdentificacion"
            display-expr="nombre"
            value-expr="codigo"
            v-model="tipoIdentificacionCodigo"
          />
          <label>Nombre</label>
          <input
            class="form-control"
            v-model="nombre"
            type="text"
            id="nombre"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TerceroBuscador from "./TerceroBuscador.vue";
import DxSelectBox from "devextreme-vue/select-box";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "TerceroFormulario",
  components: {
    TerceroBuscador,
    BarraBotones,
    DxSelectBox,
    //TipoIdentificacionBuscador,
  },
  setup() {
    const esNuevo = ref(true);
    const codigo = ref("");
    const nombre = ref("");
    const tipoIdentificacionCodigo = ref("");
    const route = new useRoute();
    const router = useRouter();
    const store = useStore();
    const tiposIdentificacion = ref([]);

    const listarTipoIdentificacion = function () {
      api
        .listarTipoIdentificacion()
        .then((data) => {
          tiposIdentificacion.value = data;
        })
        .catch(() => {});
    };

    listarTipoIdentificacion();

    const consultarTercero = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      const ti = tipoIdentificacionCodigo.value;
      api
        .consultarTercero(c)
        .then((data) => {
          if (data.codigo && data.tipoidentificacionid.codigo) {
            esNuevo.value = false;
          }
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          tipoIdentificacionCodigo.value = data.tipoidentificacionid.codigo;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
          tipoIdentificacionCodigo.value = ti;
        });
    };

    consultarTercero(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");
      const tercero = {
        codigo: codigo.value,
        nombre: nombre.value,
        tipoidentificacionid: { codigo: tipoIdentificacionCodigo.value },
      };

      if (esNuevo.value) {
        api
          .insertarTercero(tercero)
          .then(
            store.commit("mostrarInformacion", "registro insertado con exito")
          )
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      } else {
        api
          .actualizarTercero(tercero)
          .then(
            store.commit("mostrarInformacion", "registro actualizado con exito")
          )
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "tercero",
      });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      codigo.value = "";
      nombre.value = "";
      tipoIdentificacionCodigo.value = "";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarTercero(codigo.value)
          .then(() =>
            router.push({
              name: "tercero",
            })
          )
          .catch(() => {
            store.commit(
              "mostrarError",
              "Imposible eliminar, se encuentra asociado a documento"
            );
          });
      }
    };

    const consultarTipoIdentificacion = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarTipoIdentificacion(c)
        .then((data) => {
          tipoIdentificacionCodigo.value = data.codigo;
        })
        .catch(function () {
          tipoIdentificacionCodigo.value = "";
        });
    };

    return {
      esNuevo,
      codigo,
      nombre,
      tipoIdentificacionCodigo,
      tiposIdentificacion,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarTercero,
      consultarTipoIdentificacion,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
