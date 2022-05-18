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
          <h5 v-if="esNuevo" class="card-title">Insertar Personal Planta</h5>
          <h5 v-if="!esNuevo" class="card-title">Actualizar Personal Planta</h5>

          <label>Institución Educativa</label>
          <input
            v-model="institucionEducativaCodigo"
            class="form-control"
            type="text"
            readonly
          />
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalPlantaBuscador from "./PersonalPlantaBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "PersonalPlantaFormulario",
  components: {
    PersonalPlantaBuscador,
    BarraBotones,
  },
  setup() {
    const esNuevo = ref(true);
    const codigo = ref("");
    const nombre = ref("");
    const cargo = ref("");
    const institucionEducativaCodigo = ref("");
    const route = new useRoute();
    const router = useRouter();
    const store = useStore();

    const consultarPersonalPlanta = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarPersonalPlanta(c)
        .then((data) => {
          if (data.codigo) {
            esNuevo.value = false;
          }
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          institucionEducativaCodigo.value = store.state.institucioneducativa;
          cargo.value = data.cargo;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
        });
    };

    consultarPersonalPlanta(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");
      const personalPlanta = {
        codigo: codigo.value,
        nombre: nombre.value,
        institucioneducativaid: {codigo:institucionEducativaCodigo.value},
        cargo: cargo.value,
      };

      if (esNuevo.value) {
        api
          .insertarPersonalPlanta(personalPlanta)
          .then(store.commit("mostrarInformacion", "registro insertado con exito"))
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      } else {
        api
          .actualizarPersonalPlanta(personalPlanta)
          .then(store.commit("mostrarInformacion", "registro actualizado con exito"))
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "personalplanta",
      });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      codigo.value = "";
      nombre.value = "";
      institucionEducativaCodigo.value = store.state.institucioneducativa;
      cargo.value = "";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarPersonalPlanta(codigo.value)
          .then(() =>
            router.push({
              name: "personalplanta",
            })
          )
          .catch( ()=> {
            store.commit("mostrarError", "Imposible eliminar, se encuentra asociado en una solicitud presupuestal");
          });
      }
    };

    const consultarInstitucionEducativa = function (c) {
      store.commit("ocultarAlerta");
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
      esNuevo,
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
