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
          <h5 class="card-title">Fuente Recurso</h5>
          <label>Código</label>
          <fuente-recurso-buscador
            v-on:perderFoco="consultarFuenteRecurso"
            v-bind:codigoPropiedad="codigo"
          />
          <label>Nombre</label>
          <input
            class="form-control"
            v-model="nombre"
            type="text"
            id="nombre"
          />
          <label>Fuente Recurso Padre</label>
          <fuente-recurso-padre-buscador
            v-on:perderFocoPadre="consultarFuenteRecursoPadre"
            v-bind:codigoPropiedad="fuenteRecursoCodigoPadre"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponenteAlerta from "@/components/ComponentesTransversales/ComponenteAlerta.vue";
import FuenteRecursoBuscador from "./FuenteRecursoBuscador.vue";
import FuenteRecursoPadreBuscador from "./FuenteRecursoPadreBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "FuenteRecursoFormulario",
  components: {
    FuenteRecursoBuscador,
    FuenteRecursoPadreBuscador,
    BarraBotones,
    ComponenteAlerta,
  },
  setup() {
    const mensajeAlerta = ref("");
    const codigo = ref("");
    const nombre = ref("");
    const fuenteRecursoCodigoPadre = ref("");
    const route = new useRoute();
    const router = useRouter();

    const consultarFuenteRecurso = function (c) {
      api
        .consultarFuenteRecurso(c)
        .then((data) => {
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          fuenteRecursoCodigoPadre.value = data.fuenteRecursoCodigoPadre;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
        });
    };

    consultarFuenteRecurso(route.params.codigo);

    const guardar = function () {
      const fuenteRecurso = {
        codigo: codigo.value,
        nombre: nombre.value,
        fuenteRecursoCodigoPadre: fuenteRecursoCodigoPadre.value,
      };

      api
        .insertarFuenteRecurso(fuenteRecurso)
        .then((mensajeAlerta.value = "registro insertado con exito"))
        .catch(function (e) {
          mensajeAlerta.value = e;
        });
    };

    const irAtras = function () {
      router.push({
        name: "fuenterecurso",
      });
    };

    const nuevo = function () {
      codigo.value = "";
      nombre.value = "";
      fuenteRecursoCodigoPadre.value = "";
    };

    const eliminar = function () {
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarFuenteRecurso(codigo.value)
          .then(() =>
            router.push({
              name: "fuenterecurso",
            })
          )
          .catch(function (e) {
            mensajeAlerta.value = e;
          });
      }
    };

    const consultarFuenteRecursoPadre = function (c) {
      api
        .consultarFuenteRecurso(c)
        .then((data) => {
          fuenteRecursoCodigoPadre.value = data.codigo;
        })
        .catch(function () {
          fuenteRecursoCodigoPadre.value = "";
        });
    };

    return {
      mensajeAlerta,
      codigo,
      nombre,
      fuenteRecursoCodigoPadre,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarFuenteRecurso,
      consultarFuenteRecursoPadre,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
