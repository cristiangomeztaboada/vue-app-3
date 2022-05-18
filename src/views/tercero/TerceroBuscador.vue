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
            data-bs-target="#modalTercero"
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
    <div class="modal" id="modalTercero" tabindex="-1">
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
            <tercero-grid
              v-bind:mostrarColumnaBotones="false"
              v-on:seleccionarTercero="
                recibirTerceroSeleccionado
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TerceroGrid from "@/views/tercero/TerceroGrid.vue";
import $ from "jquery";
import { ref, watch } from "vue";

export default {
  name: "TerceroBuscador",
  components: {
    TerceroGrid,
  },
  props: {
    codigoPropiedad: String,
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

    const recibirTerceroSeleccionado = function (c) {
      $("#modalTercero").modal("hide");
      codigo.value = c;
      perderFoco();
    };

    const perderFoco = function () {
      $("#modalTercero").modal("hide");
      context.emit("perderFoco", codigo.value);
    };

    return {
      codigo,
      nombre,
      recibirTerceroSeleccionado,
      perderFoco,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
