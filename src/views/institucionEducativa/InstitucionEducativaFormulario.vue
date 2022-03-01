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
          <h5 v-if="esNuevo" class="card-title">
            Insertar Institución Educativa
          </h5>
          <h5 v-if="!esNuevo" class="card-title">
            Actualizar Institución Educativa
          </h5>
          <label>Código</label>
          <institucion-educativa-buscador
            v-on:perderFoco="consultarInstitucionEducativa"
            v-bind:codigoPropiedad="codigo"
          />
          <label>Nombre</label>
          <input
            class="form-control"
            v-model="nombre"
            type="text"
            id="nombre"
          />
          <label>Usuario</label>
          <usuario-buscador
            v-on:perderFoco="consultarUsuario"
            v-bind:codigoPropiedad="usuarioCodigo"
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
    const esNuevo = ref(true);
    const codigo = ref("");
    const nombre = ref("");
    const usuarioCodigo = ref("");
    const route = new useRoute();
    const router = useRouter();

    const consultarInstitucionEducativa = function (c) {
      esNuevo.value = true;
      api
        .consultarInstitucionEducativa(c)
        .then((data) => {
          if (data.codigo) {
            esNuevo.value = false;
          }
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          usuarioCodigo.value = data.usuarioid.codigo;
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
        usuarioid: { codigo: usuarioCodigo.value },
      };

      if (esNuevo.value) {
        api
          .insertarInstitucionEducativa(institucionEducativa)
          .then((mensajeAlerta.value = "registro insertado con exito"))
          .catch(function (e) {
            mensajeAlerta.value = e;
          });
      } else {
        api
          .actualizarInstitucionEducativa(institucionEducativa)
          .then((mensajeAlerta.value = "registro actualizado con exito"))
          .catch(
            () =>
              (mensajeAlerta.value =
                "Ingrese un usuario válido que no este asociado a otra institución educativa")
          );
      }
    };

    const irAtras = function () {
      router.push({
        name: "institucioneducativa",
      });
    };

    const nuevo = function () {
      esNuevo.value = true;
      codigo.value = "";
      nombre.value = "";
      usuarioCodigo.value = "";
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
          .catch((e) => (mensajeAlerta.value = e));
      }
    };

    const consultarUsuario = function (c) {
      api
        .consultarUsuario(c)
        .then((data) => {
          usuarioCodigo.value = data.codigo;
        })
        .catch(function () {
          usuarioCodigo.value = "";
        });
    };

    return {
      mensajeAlerta,
      esNuevo,
      codigo,
      nombre,
      usuarioCodigo,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarInstitucionEducativa,
      consultarUsuario,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
