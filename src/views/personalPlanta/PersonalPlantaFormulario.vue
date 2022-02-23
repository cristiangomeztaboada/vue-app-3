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
          <h5 class="card-title">Personal Planta</h5>
          <label>Código</label>
          <personal-planta-buscador
            v-on:perderFoco="consultarPersonalPlanta"
            v-bind:codigoPropiedad="codigo"
          />
          <label>Nombre</label>
          <input
            class="form-control"
            v-model="nombre"
            type="text"
            id="nombre"
          />
          <label>Cargo</label>
          <input class="form-control" v-model="cargo" type="text" id="cargo" />
          <label>Institución Educativa</label>
          <institucion-educativa-buscador
            v-on:perderFoco="consultarInstitucionEducativa"
            v-bind:codigoPropiedad="institucionEducativaCodigo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponenteAlerta from "@/components/ComponentesTransversales/ComponenteAlerta.vue";
import PersonalPlantaBuscador from "./PersonalPlantaBuscador.vue";
import InstitucionEducativaBuscador from "@/views/institucionEducativa/InstitucionEducativaBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "PersonalPlantaFormulario",
  components: {
    PersonalPlantaBuscador,
    BarraBotones,
    ComponenteAlerta,
    InstitucionEducativaBuscador,
  },
  setup() {
    const mensajeAlerta = ref("");
    const codigo = ref("");
    const nombre = ref("");
    const cargo = ref("");
    const institucionEducativaCodigo = ref("");
    const route = new useRoute();
    const router = useRouter();

    const consultarPersonalPlanta = function (c) {
      api
        .consultarPersonalPlanta(c)
        .then((data) => {
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          institucionEducativaCodigo.value = data.institucionEducativaCodigo;
          cargo.value = data.cargo;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
        });
    };

    consultarPersonalPlanta(route.params.codigo);

    const guardar = function () {
      const personalPlanta = {
        codigo: codigo.value,
        nombre: nombre.value,
        institucionEducativaCodigo: institucionEducativaCodigo.value,
        cargo:cargo.value,
      };

      api
        .insertarPersonalPlanta(personalPlanta)
        .then((mensajeAlerta.value = "registro insertado con exito"))
        .catch(function (e) {
          mensajeAlerta.value = e;
        });
    };

    const irAtras = function () {
      router.push({
        name: "personalplanta",
      });
    };

    const nuevo = function () {
      codigo.value = "";
      nombre.value = "";
      institucionEducativaCodigo.value = "";
      cargo.value = "";
    };

    const eliminar = function () {
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarPersonalPlanta(codigo.value)
          .then(() =>
            router.push({
              name: "personalplanta",
            })
          )
          .catch(function (e) {
            mensajeAlerta.value = e;
          });
      }
    };

    const consultarInstitucionEducativa = function (c) {
      api
        .consultarInstitucionEducativa(c)
        .then((data) => {
          institucionEducativaCodigo.value = data.codigo;
        })
        .catch(function () {
          institucionEducativaCodigo.value = "";
        });
    };

    return {
      mensajeAlerta,
      codigo,
      nombre,
      cargo,
      institucionEducativaCodigo,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarPersonalPlanta,
      consultarInstitucionEducativa,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
