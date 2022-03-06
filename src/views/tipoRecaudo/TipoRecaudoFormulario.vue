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
          <h5 v-if="esNuevo" class="card-title">Insertar Tipo Recaudo</h5>
          <h5 v-if="!esNuevo" class="card-title">Actualizar Tipo Recaudo</h5>
          <label>Código</label>
          <tipo-recaudo-buscador
            v-on:perderFoco="consultarTipoRecaudo"
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
import TipoRecaudoBuscador from "./TipoRecaudoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "TipoRecaudoFormulario",
  components: {
    TipoRecaudoBuscador,
    BarraBotones,
  },
  setup() {
    const esNuevo = ref(true);
    const codigo = ref("");
    const nombre = ref("");
    const route = new useRoute();
    const router = useRouter();
    const store = useStore();

    const consultarTipoRecaudo = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarTipoRecaudo(c)
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

    consultarTipoRecaudo(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");
      const tipoRecaudo = { codigo: codigo.value, nombre: nombre.value };

      if (esNuevo.value) {
        api
          .insertarTipoRecaudo(tipoRecaudo)
          .then(store.commit("mostrarInformacion", "registro insertado con exito"))
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      } else {
        api
          .actualizarTipoRecaudo(tipoRecaudo)
          .then(store.commit("mostrarInformacion", "registro actualizado con exito"))
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "tiporecaudo",
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
          .eliminarTipoRecaudo(codigo.value)
          .then(() =>
            router.push({
              name: "tiporecaudo",
            })
          )
          .catch(function (e) {
            store.commit("mostrarError", e);
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
      consultarTipoRecaudo,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
