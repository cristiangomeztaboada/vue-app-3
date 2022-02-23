<template>
  <div class="row">
    <componente-alerta v-bind:mensajeAlerta="mensajeAlerta" />
  </div>
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
          <h5 class="card-title">Tipo Recaudo</h5>
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
import ComponenteAlerta from "@/components/ComponentesTransversales/ComponenteAlerta.vue";
import TipoRecaudoBuscador from "./TipoRecaudoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "TipoRecaudoFormulario",
  components: {
    TipoRecaudoBuscador,
    BarraBotones,
    ComponenteAlerta,
  },
  setup() {
    const mensajeAlerta = ref("");
    const codigo = ref("");
    const nombre = ref("");
    const route = new useRoute();
    const router = useRouter();

    const consultarTipoRecaudo = function (c) {
      api
        .consultarTipoRecaudo(c)
        .then((data) => {
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
      const tipoRecaudo = { codigo: codigo.value, nombre: nombre.value };
      api
        .insertarTipoRecaudo(tipoRecaudo)
        .then((mensajeAlerta.value = "registro insertado con exito"))
        .catch(function (e) {
          mensajeAlerta.value = e;
        });
    };

    const irAtras = function () {
      router.push({
        name: "tiporecaudo",
      });
    };

    const nuevo = function () {
      codigo.value = "";
      nombre.value = "";
    };

    const eliminar = function () {
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarTipoRecaudo(codigo.value)
          .then(() =>
            router.push({
              name: "tiporecaudo",
            })
          )
          .catch(function (e) {
            mensajeAlerta.value = e;
          });
      }
    };

    return {
      mensajeAlerta,
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
