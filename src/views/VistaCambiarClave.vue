<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <div class="card shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">
          <ul class="nav nav-pills card-header-pills">
            <li class="nav-item">
              <button
                type="button"
                class="btn btn-success"
                v-on:click="guardar"
              >
                <span>💾</span>GUARDAR
              </button>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <h5 class="card-title">Cambiar mi clave</h5>
          <label>Código</label>
          <input v-model="codigo" class="form-control" type="text" readonly />
          <label>Nombre</label>
          <input v-model="nombre" class="form-control" type="text" readonly />
          <label>Clave actual</label>
          <input
            class="form-control"
            v-model="claveActual"
            type="password"
            id="clave"
          />
          <label>Nueva clave</label>
          <input
            class="form-control"
            v-model="claveNueva1"
            type="password"
            id="clave"
          />
          <label>Confirmar nueva clave</label>
          <input
            class="form-control"
            v-model="claveNueva2"
            type="password"
            id="clave"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "@/api.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "VistaCambiarClave",
  components: {
  },
  setup() {
    const codigo = ref("");
    const nombre = ref("");
    const clave = ref("");
    const claveActual = ref("");
    const claveNueva1 = ref("");
    const claveNueva2 = ref("");
    const router = useRouter();
    const store = useStore();

    const consultarUsuario = function () {
      store.commit("ocultarAlerta");
      api
        .consultarUsuario(store.state.usuario)
        .then((data) => {
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          clave.value = data.clave;
        })
        .catch((e) => store.commit("mostrarError", e));
    };

    consultarUsuario();

    const guardar = function () {
      if (
        clave.value == claveActual.value &&
        claveNueva1.value == claveNueva2.value
      ) {
        const usuario = {
          codigo: codigo.value,
          nombre: nombre.value,
          clave: claveNueva1.value,
        };

        api
          .actualizarUsuario(usuario)
          .then(() => {
            store.commit("logout");
            router.push({ name: "login" });
          })
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      } else {
        store.commit("mostrarError", "verifique las claves ingresadas");
      }
    };

    return {
      codigo,
      nombre,
      clave,
      claveActual,
      claveNueva1,
      claveNueva2,
      guardar,
      consultarUsuario,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
