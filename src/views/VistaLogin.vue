<template>
  <div class="row">
    <componente-alerta v-bind:mensajeAlerta="mensajeAlerta" />
  </div>
  <div class="row justify-content-md-center align-items-center">
    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">Bienvenido</div>
        <div class="card-body">
          <div class="row">
            <input
              v-model="usuario"
              type="text"
              class="form-control"
              placeholder="Usuario"
            />
          </div>
          <div class="row">
            <input
              v-model="clave"
              type="password"
              class="form-control"
              placeholder="Contraseña"
            />
          </div>
          <div class="row">
            <button v-on:click="ingresar" type="button" class="btn btn-outline-primary">
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponenteAlerta from "@/components/ComponentesTransversales/ComponenteAlerta.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "VistaLogin",
  components: {
    ComponenteAlerta,
  },
  setup() {
    const mensajeAlerta = ref("");
    const router = useRouter();
    const store = useStore();

    const usuario = ref("");
    const clave = ref("");

    const ingresar = function () {
      try {
        mensajeAlerta.value = "";
        if (usuario.value == "admin" && clave.value == "admin") {
          sessionStorage.setItem("usuario", usuario.value);
          store.commit("login");
          router.push({ name: "principal" });
        } else {
          mensajeAlerta.value = "ingrese un usuario y clave correcta";
        }
      } catch (e) {
        console.log(e);
      }
    };

    const ingresarAutomaticamente = function () {
      try {
        if(sessionStorage.getItem("usuario")){
          store.commit("login");
          router.push({ name: "principal" });
        }
      } catch (e) {
        console.log(e);
      }
    };

    ingresarAutomaticamente();

    return {
      usuario,
      clave,
      ingresar,
      mensajeAlerta,
      ingresarAutomaticamente,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
