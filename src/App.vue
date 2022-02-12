<template>
  <div class="row">
    <nav
      v-if="usuario ? true : false"
      class="navbar navbar-dark bg-primary fixed-top"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">SED Cartagena</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link
                  class="btn btn-outline-primary"
                  :to="{ name: 'maestrogenerico' }"
                >
                  MaestroGenerico
                </router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">{{ usuario }}</a>
              </li>
              <li class="nav-item">
                <button
                  v-on:click="salir"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  [ {{ usuario }} ] Salir
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <div class="row">
    &nbsp;
  </div>  
  <div class="row">
    &nbsp;
  </div>  
  <div class="row">
    &nbsp;
  </div>  
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
