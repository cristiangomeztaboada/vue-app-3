<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div class="input-group mb-3">
        <input
          class="form-control"
          v-model="codigo"
          type="text"
          id="codigo"
          v-on:blur="perderFoco"
        />
        <div class="input-group-append">
          <button
            type="button"
            class="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalFuenteRecurso"
          >
            🔎
          </button>
        </div>
        <input v-if="mostrarCampoNombre ? true : false"
          class="form-control"
          v-model="nombre"
          type="text"
          id="nombre"
          readonly
        />
      </div>
    </div>
    <div class="modal" id="modalFuenteRecurso" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <fuente-recurso-grid
              v-bind:mostrarColumnaBotones="false"
              v-bind:soloDetalle=soloDetalle
              v-on:seleccionarFuenteRecurso="
                recibirFuenteRecursoSeleccionado
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FuenteRecursoGrid from "@/views/fuenteRecurso/FuenteRecursoGrid.vue";
import $ from "jquery";
import { ref, watch } from "vue";

export default {
  name: "FuenteRecursoBuscador",
  components: {
    FuenteRecursoGrid,
  },
  props: {
    codigoPropiedad: String,
    soloDetalle: Boolean,
    nombrePropiedad: String,
    mostrarCampoNombre : Boolean,
  },
  setup(props, context) {
    const codigo = ref("");
    const nombre = ref("");

    watch(
      () => props.codigoPropiedad,
      (newCodigoPropiedad) => {
        codigo.value = newCodigoPropiedad;
      }
    );

    watch(
      () => props.nombrePropiedad,
      (newNombrePropiedad) => {
        nombre.value = newNombrePropiedad;
      }
    );

    const recibirFuenteRecursoSeleccionado = function (c) {
      $("#modalFuenteRecurso").modal("hide");
      codigo.value = c;
      perderFoco();
    };

    const perderFoco = function () {
      $("#modalFuenteRecurso").modal("hide");
      context.emit("perderFoco", codigo.value);
    };

    return {
      codigo,
      nombre,
      recibirFuenteRecursoSeleccionado,
      perderFoco,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
