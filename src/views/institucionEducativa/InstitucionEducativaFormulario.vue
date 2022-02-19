<template>
  <div class="row">
    <componente-alerta v-bind:mensajeAlerta="mensajeAlerta" />
  </div>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">
          <barra-botones
            v-on:guardar="guardar"
            v-on:irAtras="irAtras"
            v-on:nuevo="nuevo"
            v-on:eliminar="eliminar"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">InstitucionEducativa</h5>
          <institucion-educativa-buscador
            v-on:perderFoco="consultarInstitucionEducativa"
            v-bind:codigoPropiedad="codigo"
          />
          <input
            class="form-control"
            v-model="nombre"
            type="text"
            id="nombre"
            placeholder="Nombre"
          />
          <usuario-buscador
            v-on:perderFoco="consultarUsuario"
            v-bind:codigoPropiedad="codigo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponenteAlerta from "@/components/ComponentesTransversales/ComponenteAlerta.vue";
import InstitucionEducativaBuscador from "./InstitucionEducativaBuscador.vue";
import UsuarioBuscador from "@/views/usuario/UsuarioBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "InstitucionEducativaFormulario",
  components: {
    InstitucionEducativaBuscador,
    BarraBotones,
    ComponenteAlerta,
    UsuarioBuscador,
  },
  setup() {
    const mensajeAlerta = ref("");
    const codigo = ref("");
    const nombre = ref("");
    const route = new useRoute();
    const router = useRouter();

    const consultarInstitucionEducativa = function (c) {
      api
        .consultarInstitucionEducativa(c)
        .then((data) => {
          codigo.value = data.codigo;
          nombre.value = data.nombre;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
        });
    };

    consultarInstitucionEducativa(route.params.codigo);

    const guardar = function () {
      const institucionEducativa = {
        codigo: codigo.value,
        nombre: nombre.value,
      };
      api
        .insertarInstitucionEducativa(institucionEducativa)
        .then((mensajeAlerta.value = "registro insertado con exito"))
        .catch(function (e) {
          mensajeAlerta.value = e;
        });
    };

    const irAtras = function () {
      router.push({
        name: "institucioneducativa",
      });
    };

    const nuevo = function () {
      codigo.value = "";
      nombre.value = "";
    };

    const eliminar = function () {
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarInstitucionEducativa(codigo.value)
          .then(() =>
            router.push({
              name: "institucioneducativa",
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
      consultarInstitucionEducativa,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
