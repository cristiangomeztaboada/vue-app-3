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
          <h5 v-if="esNuevo" class="card-title">
            Insertar Tipo Identificación
          </h5>
          <h5 v-if="!esNuevo" class="card-title">
            Actualizar Tipo Identificación
          </h5>
          <label>Código</label>
          <tipo-identificacion-buscador
            v-on:perderFoco="consultarTipoIdentificacion"
            v-bind:codigoPropiedad="codigo"
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
import TipoIdentificacionBuscador from "./TipoIdentificacionBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "TipoIdentificacionFormulario",
  components: {
    TipoIdentificacionBuscador,
    BarraBotones,
  },
  setup() {
    const esNuevo = ref(true);
    const codigo = ref("");
    const nombre = ref("");
    const route = new useRoute();
    const router = useRouter();
    const store = useStore();

    const consultarTipoIdentificacion = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarTipoIdentificacion(c)
        .then((data) => {
          if (data.codigo) {
            esNuevo.value = false;
          }
          codigo.value = data.codigo;
          nombre.value = data.nombre;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
        });
    };

    consultarTipoIdentificacion(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");
      const tipoIdentificacion = { codigo: codigo.value, nombre: nombre.value };

      if (esNuevo.value) {
        api
          .insertarTipoIdentificacion(tipoIdentificacion)
          .then(
            store.commit("mostrarInformacion", "registro insertado con exito")
          )
          .catch(() => {});
      } else {
        api
          .actualizarTipoIdentificacion(tipoIdentificacion)
          .then(
            store.commit("mostrarInformacion", "registro actualizado con exito")
          )
          .catch(() => {});
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "tipoidentificacion",
      });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      codigo.value = "";
      nombre.value = "";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarTipoIdentificacion(codigo.value)
          .then(() =>
            router.push({
              name: "tipoidentificacion",
            })
          )
          .catch(() => {
            store.commit(
              "mostrarError",
              "Imposible eliminar, se encuentra asociado a un tercero"
            );
          });
      }
    };

    return {
      esNuevo,
      codigo,
      nombre,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarTipoIdentificacion,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
