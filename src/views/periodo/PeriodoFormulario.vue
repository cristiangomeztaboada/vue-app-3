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
import ComponenteAlerta from "@/components/ComponentesTransversales/ComponenteAlerta.vue";
import PeriodoBuscador from "./PeriodoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "PeriodoFormulario",
  components: {
    PeriodoBuscador,
    BarraBotones,
    ComponenteAlerta,
  },
  setup() {
    const mensajeAlerta = ref("");
    const esNuevo = ref(true);
    const codigo = ref(0);
    const activo = ref(false);
    const route = new useRoute();
    const router = useRouter();

    const consultarPeriodo = function (c) {
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
      const periodo = { codigo: Number(codigo.value), activo: Number(activo.value) };
      api
        .insertarPeriodo(periodo)
        .then((mensajeAlerta.value = "registro insertado con exito"))
        .catch(function (e) {
          mensajeAlerta.value = e;
        });
    };

    const irAtras = function () {
      router.push({
        name: "periodo",
      });
    };

    const nuevo = function () {
      esNuevo.value = true;
      codigo.value = "";
      activo.value = "";
    };

    const eliminar = function () {
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarPeriodo(codigo.value)
          .then(() =>
            router.push({
              name: "periodo",
            })
          )
          .catch(function (e) {
            mensajeAlerta.value = e;
          });
      }
    };

    return {
      mensajeAlerta,
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
