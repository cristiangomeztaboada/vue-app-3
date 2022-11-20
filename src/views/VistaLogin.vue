<template>
  <div class="row justify-content-md-center align-items-center">
    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
      <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">Bienvenido</div>
        <div class="card-body">
          <div class="row">
            <input
              v-model="codigo"
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
            <button v-on:click="ingresar" type="button" class="btn btn-warning">
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import api from "@/api.js";

export default {
  name: "VistaLogin",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();

    const codigo = ref("");
    const clave = ref("");

    store.commit("ocultarAlerta");

    const ingresar = function () {
      store.commit("ocultarAlerta");
      try {
        const usuario = {
          username: codigo.value,
          password: clave.value,
        };

        api
          .consultarToken(usuario)
          .then((data) => {
            if (data.access) {
              sessionStorage.setItem("usuario", codigo.value);
              sessionStorage.setItem("usuarionombre", codigo.value);
              sessionStorage.setItem("token", data.access);

              api
                .consultarUsuario(codigo.value)
                .then((data) => {
                  sessionStorage.setItem("usuariorol", data.rol);

                  if (sessionStorage.getItem("usuariorol") == "Institucion") {
                    api
                      .consultarInstitucionEducativaPorUsuario(codigo.value)
                      .then((data) => {
                        sessionStorage.setItem(
                          "institucioneducativa",
                          data.codigo
                        );
                        sessionStorage.setItem(
                          "institucioneducativanombre",
                          data.nombre
                        );

                        store.commit("login");
                        router.push({ name: "principal" });
                      })
                      .catch(() => {
                        store.commit(
                          "mostrarError",
                          "El usuario no tiene una institución educativa asignada, póngase en contacto con el administrador del sistema"
                        );
                      });
                  } else {
                    store.commit("login");
                    router.push({ name: "principal" });
                    store.commit("ocultarAlerta");
                  }
                })
                .catch(() => {});
            } else {
              store.commit(
                "mostrarError",
                "ingrese un usuario y clave correcta"
              );
            }
          })
          .catch(() => {
            store.commit("mostrarError", "ingrese un usuario y clave correcta");
          });
      } catch (e) {
        console.log(e);
      }
    };

    const ingresarAutomaticamente = function () {
      try {
        if (sessionStorage.getItem("usuario")) {
          store.commit("login");
          router.push({ name: "principal" });
        }
      } catch (e) {
        console.log(e);
      }
    };

    ingresarAutomaticamente();

    return {
      codigo,
      clave,
      ingresar,
      ingresarAutomaticamente,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
