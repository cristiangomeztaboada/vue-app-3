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
          <h5 class="card-title">Usuario</h5>
          <usuario-buscador
            v-on:perderFoco="consultarUsuario"
            v-bind:codigoPropiedad="codigo"
          />
          <input
            class="form-control"
            v-model="nombre"
            type="text"
            id="nombre"
            placeholder="Nombre"
          />
          <input
            class="form-control"
            v-model="clave"
            type="password"
            id="clave"
            placeholder="Clave"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponenteAlerta from "@/components/ComponentesTransversales/ComponenteAlerta.vue";
import UsuarioBuscador from "./UsuarioBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "UsuarioFormulario",
  components: {
    UsuarioBuscador,
    BarraBotones,
    ComponenteAlerta,
  },
  setup() {
    const mensajeAlerta = ref("");
    const codigo = ref("");
    const nombre = ref("");
    const clave = ref("");
    const route = new useRoute();
    const router = useRouter();

    const consultarUsuario = function (c) {
      api
        .consultarUsuario(c)
        .then((data) => {
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          clave.value = data.clave;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
        });
    };

    consultarUsuario(route.params.codigo);

    const guardar = function () {
      const usuario = {
        codigo: codigo.value,
        nombre: nombre.value,
        clave: clave.value,
      };
      api
        .insertarUsuario(usuario)
        .then((mensajeAlerta.value = "registro insertado con exito"))
        .catch(function (e) {
          mensajeAlerta.value = e;
        });
    };

    const irAtras = function () {
      router.push({
        name: "usuario",
      });
    };

    const nuevo = function () {
      codigo.value = "";
      nombre.value = "";
      clave.value = "";
    };

    const eliminar = function () {
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarUsuario(codigo.value)
          .then(() =>
            router.push({
              name: "usuario",
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
      clave,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarUsuario,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
