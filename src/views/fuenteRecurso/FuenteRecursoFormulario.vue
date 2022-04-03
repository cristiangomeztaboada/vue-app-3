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
          <h5 v-if="esNuevo" class="card-title">Insertar Fuente Recurso</h5>
          <h5 v-if="!esNuevo" class="card-title">Actualizar Fuente Recurso</h5>

          <label>Fuente Recurso Padre</label>
          <fuente-recurso-padre-buscador
            v-on:perderFocoPadre="consultarFuenteRecursoPadre"
            v-bind:codigoPropiedad="fuenteRecursoCodigoPadre"
          />
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FuenteRecursoBuscador from "./FuenteRecursoBuscador.vue";
import FuenteRecursoPadreBuscador from "./FuenteRecursoPadreBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "FuenteRecursoFormulario",
  components: {
    FuenteRecursoBuscador,
    FuenteRecursoPadreBuscador,
    BarraBotones,
  },
  setup() {
    const esNuevo = ref(true);
    const codigo = ref("");
    const nombre = ref("");
    const fuenteRecursoCodigoPadre = ref("");
    const route = new useRoute();
    const router = useRouter();
    const store = useStore();

    const consultarFuenteRecurso = function (c) {
      esNuevo.value = true;
      store.commit("ocultarAlerta");
      api
        .consultarFuenteRecurso(c)
        .then((data) => {
          if (data.codigo) {
            esNuevo.value = false;
          }
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          fuenteRecursoCodigoPadre.value = data.idpadre.codigo;
        })
        .catch(function () {
          let p = fuenteRecursoCodigoPadre.value;
          nuevo();
          fuenteRecursoCodigoPadre.value = p;
          codigo.value = c;
        });
    };

    consultarFuenteRecurso(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");
      const fuenteRecurso = {
        codigo: codigo.value,
        nombre: nombre.value,
        idpadre: { codigo: fuenteRecursoCodigoPadre.value },
      };

      if (!fuenteRecursoCodigoPadre.value) {
        delete fuenteRecurso["idpadre"];
      }

      if (esNuevo.value) {
        api
          .insertarFuenteRecurso(fuenteRecurso)
          .then(() => {
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch(()=> {
            if(fuenteRecursoCodigoPadre.value){
              store.commit("mostrarError", "Si la fuente de recurso esta asociado a una proyección presupuestal, no puede crearle hijos");
            }else{
              store.commit("mostrarError", "Solo puede existir una fuente de recurso raiz");
            }            
          });
      } else {
        api
          .actualizarFuenteRecurso(fuenteRecurso)
          .then(() => {
            store.commit("mostrarInformacion", "registro actualizado con exito");
          })
          .catch( ()=> {
            store.commit("mostrarError", "Ingrese un código padre válido");
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "fuenterecurso",
      });
    };

    const nuevo = function () {      
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      codigo.value = "";
      nombre.value = "";
      fuenteRecursoCodigoPadre.value = "";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarFuenteRecurso(codigo.value)
          .then(() =>
            router.push({
              name: "fuenterecurso",
            })
          )
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      }
    };

    const consultarFuenteRecursoPadre = function (c) {
      store.commit("ocultarAlerta");
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
      esNuevo,
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
