import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      usuario: "",
    };
  },
  mutations: {
    login(state) {
      state.usuario = sessionStorage.getItem("usuario");
      state.usuarionombre = sessionStorage.getItem("usuarionombre");
      state.institucioneducativa = sessionStorage.getItem("institucioneducativa");
      state.institucioneducativanombre = sessionStorage.getItem("institucioneducativanombre");
    },
    logout(state) {
      sessionStorage.clear();
      state.usuario = "";
    },
    mostrarInformacion(state, mensaje) {
      state.informacion = mensaje;
      state.error = "";      
    },
    mostrarError(state, mensaje) {      
      state.error = mensaje;
      state.informacion = "";
    },
    ocultarAlerta(state) {
      state.informacion = "";
      state.error = "";
    },
  },
});

export default store;
