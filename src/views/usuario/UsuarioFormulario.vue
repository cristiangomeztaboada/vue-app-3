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
          <h5 v-if="esNuevo" class="card-title">Insertar Usuario</h5>
          <h5 v-if="!esNuevo" class="card-title">Actualizar Usuario</h5>
          <label>Código</label>
          <usuario-buscador
            v-on:perderFoco="consultarUsuario"
            v-bind:codigoPropiedad="codigo"
          />
          <label>Nombre</label>
          <input
            class="form-control"
            v-model="nombre"
            type="text"
            id="nombre"
          />
          <label>Clave</label>
          <input
            class="form-control"
            v-model="clave"
            type="password"
            id="clave"
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
    const esNuevo = ref(true);
    const codigo = ref("");
    const nombre = ref("");
    const clave = ref("");
    const route = new useRoute();
    const router = useRouter();

    const consultarUsuario = function (c) {
      esNuevo.value = true;
      api
        .consultarUsuario(c)
        .then((data) => {
          if (data.codigo) {
            esNuevo.value = false;
          }
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
      if (esNuevo.value) {
        api
          .insertarUsuario(usuario)
          .then((mensajeAlerta.value = "registro insertado con exito"))
          .catch(function (e) {
            mensajeAlerta.value = e;
          });
      } else {
        api
          .actualizarUsuario(usuario)
          .then((mensajeAlerta.value = "registro actualizado con exito"))
          .catch(function (e) {
            mensajeAlerta.value = e;
          });
      }
    };

    const irAtras = function () {
      router.push({
        name: "usuario",
      });
    };

    const nuevo = function () {
      esNuevo.value = true;
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
          .catch(() => (mensajeAlerta.value = "No se puede eliminar usuario, se encuentra asociado a una institución educativa"));
      }
    };

    return {
      mensajeAlerta,
      esNuevo,
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
