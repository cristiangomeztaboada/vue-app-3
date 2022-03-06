<template>
  <div align="center">
    <img src="@/assets/logo2.png" />
  </div>

  <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        v-if="usuario ? true : false"
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li
            v-if="usuario == 'admin' ? true : false"
            class="nav-item dropdown"
          >
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sistema
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" :to="{ name: 'usuario' }">
                  Usuario
                </router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'institucioneducativa' }"
                >
                  Institución Educativa
                </router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'tipocontrato' }"
                >
                  Tipo Contrato
                </router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'tiporecaudo' }"
                >
                  Tipo Recaudo
                </router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'fuenterecurso' }"
                >
                  Fuente Recurso
                </router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'rubropresupuesto' }"
                >
                  Rubro Presupuesto
                </router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'tipoidentificacion' }"
                >
                  Tipo Identificación
                </router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'periodo' }">
                  Periodo
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Maestro
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'personalplanta' }"
                >
                  Personal Planta
                </router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'tercero' }">
                  Tercero
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Presupuesto
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'proyeccionpresupuesto' }"
                >
                  Proyección Presupuesto
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <button v-on:click="salir" type="button" class="btn btn-warning">
            [ {{ usuarionombre }} - {{ institucioneducativanombre }} ] Salir
          </button>
        </form>
      </div>
    </div>
  </nav>
  <div class="row">
    <componente-alerta v-bind:informacion="informacion" v-bind:error="error" />
  </div>
  <div class="row">
    <br />
    <router-view />
  </div>  
  <div class="footer p-3 mb-2 bg-light text-dark">
    <p class="text-secondary">
      ©<b>PRESTIGE</b> - Sistema de control y gestión presupuestal
    </p>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
import ComponenteAlerta from "@/components/ComponentesTransversales/ComponenteAlerta.vue";

export default {
  name: "App",
  components: { ComponenteAlerta },
  setup() {
    const router = useRouter();
    const store = useStore();

    router.push({ name: "login" });

    const usuario = computed(() => {
      return store.state.usuario;
    });

    const usuarionombre = computed(() => {
      return store.state.usuarionombre;
    });

    const institucioneducativanombre = computed(() => {
      return store.state.institucioneducativanombre;
    });

    const informacion = computed(() => {
      return store.state.informacion;
    });

    const error = computed(() => {
      return store.state.error;
    });

    const salir = function () {
      store.commit("logout");
      router.push({ name: "login" });
    };

    return {
      usuario,
      usuarionombre,
      institucioneducativanombre,
      salir,
      informacion,
      error,
      ComponenteAlerta,
    };
  },
};
</script>

<style>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
</style>
