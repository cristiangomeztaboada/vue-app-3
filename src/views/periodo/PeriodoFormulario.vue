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
          <h5 v-if="esNuevo" class="card-title">Insertar Periodo</h5>
          <h5 v-if="!esNuevo" class="card-title">Actualizar Periodo</h5>
          <label>Código</label>
          <periodo-buscador
            v-on:perderFoco="consultarPeriodo"
            v-bind:codigoPropiedad="codigo"
          />
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="activo"
              v-model="activo"
            />
            <label class="form-check-label" for="activo"> Activo </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PeriodoBuscador from "./PeriodoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "PeriodoFormulario",
  components: {
    PeriodoBuscador,
    BarraBotones,
  },
  setup() {
    const esNuevo = ref(true);
    const codigo = ref(0);
    const activo = ref(false);
    const route = new useRoute();
    const router = useRouter();
    const store = useStore();

    const consultarPeriodo = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarPeriodo(c)
        .then((data) => {
          if (data.codigo) {
            esNuevo.value = false;
          }
          codigo.value = data.codigo;
          if (data.activo == 1) {
            activo.value = true;
          } else {
            activo.value = false;
          }
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
        });
    };

    consultarPeriodo(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");
      const periodo = {
        codigo: Number(codigo.value),
        activo: Number(activo.value),
      };

      if (esNuevo.value) {
        api
          .insertarPeriodo(periodo)
          .then(
            store.commit("mostrarInformacion", "registro insertado con exito")
          )
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      } else {
        api
          .actualizarPeriodo(periodo)
          .then(
            store.commit("mostrarInformacion", "registro actualizado con exito")
          )
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "periodo",
      });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      codigo.value = "";
      activo.value = "";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarPeriodo(codigo.value)
          .then(() =>
            router.push({
              name: "periodo",
            })
          )
          .catch(() => {
            store.commit(
              "mostrarError",
              "Imposible eliminar, se encuentra asociado a documento"
            );
          });
      }
    };

    return {
      esNuevo,
      codigo,
      activo,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarPeriodo,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
