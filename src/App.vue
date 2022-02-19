<template>
  <nav
    v-if="usuario ? true : false"
    class="navbar navbar-expand-lg navbar-dark bg-primary"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">PRESTIGE</a>
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
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                <router-link 
                  :to="{ name: 'usuario' }"
                >
                  Usuario
                </router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li>
                <router-link 
                  :to="{ name: 'institucioneducativa' }"
                >
                  Institución Educativa
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <button v-on:click="salir" type="button" class="btn btn-warning">
            [ {{ usuario }} ] Salir
          </button>
        </form>
      </div>
    </div>
  </nav>
  <div class="row">
    <router-view />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();

    router.push({ name: "login" });

    const usuario = computed(() => {
      return store.state.usuario;
    });

    const salir = function () {
      store.commit("logout");
      router.push({ name: "login" });
    };

    return {
      usuario,
      salir,
    };
  },
};
</script>

<style>
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
