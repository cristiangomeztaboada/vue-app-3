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
import UsuarioBuscador from "./UsuarioBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "UsuarioFormulario",
  components: {
    UsuarioBuscador,
    BarraBotones,
  },
  setup() {
    const esNuevo = ref(true);
    const id = ref("");
    const codigo = ref("");
    const nombre = ref("");
    const clave = ref("");
    const route = new useRoute();
    const router = useRouter();
    const store = useStore();

    const consultarUsuario = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarUsuario(c)
        .then((data) => {
          if (data.codigo) {
            esNuevo.value = false;
          }
          id.value = data.id;
          codigo.value = data.username;
          nombre.value = data.name;
          clave.value = data.password;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
        });
    };

    consultarUsuario(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");
      const usuario = {
        id: id.value,
        username: codigo.value,
        name: nombre.value,
        password: clave.value,
      };
      if (esNuevo.value) {
        api
          .insertarUsuario(usuario)
          .then(() => {
            store.commit("mostrarInformacion", "registro insertado con exito");
          })
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      } else {
        api
          .actualizarUsuario(usuario)
          .then(() => {
            store.commit("mostrarInformacion", "registro actualizado con exito");
          })
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "usuario",
      });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      codigo.value = "";
      nombre.value = "";
      clave.value = "";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarUsuario(codigo.value)
          .then(() =>
            router.push({
              name: "usuario",
            })
          )
          .catch(() =>
            store.commit(
              "mostrarError",
              "No se puede eliminar usuario, se encuentra asociado a una institución educativa"
            )
          );
      }
    };

    return {
      esNuevo,
      id,
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
