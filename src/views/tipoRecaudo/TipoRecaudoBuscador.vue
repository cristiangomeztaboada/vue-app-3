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
            data-bs-target="#modalTipoRecaudo"
          >
            🔎
          </button>
        </div>
      </div>
    </div>
    <div class="modal" id="modalTipoRecaudo" tabindex="-1">
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
            <tipo-recaudo-grid
              v-bind:mostrarColumnaBotones="false"
              v-on:seleccionarTipoRecaudo="
                recibirTipoRecaudoSeleccionado
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TipoRecaudoGrid from "@/views/tipoRecaudo/TipoRecaudoGrid.vue";
import $ from "jquery";
import { ref, watch } from "vue";

export default {
  name: "TipoRecaudoBuscador",
  components: {
    TipoRecaudoGrid,
  },
  props: {
    codigoPropiedad: String,
  },
  setup(props, context) {
    const codigo = ref("");

    watch(
      () => props.codigoPropiedad,
      (newCodigoPropiedad) => {
        codigo.value = newCodigoPropiedad;
      }
    );

    const recibirTipoRecaudoSeleccionado = function (c) {
      $("#modalTipoRecaudo").modal("hide");
      codigo.value = c;
      perderFoco();
    };

    const perderFoco = function () {
      $("#modalTipoRecaudo").modal("hide");
      context.emit("perderFoco", codigo.value);
    };

    return {
      codigo,
      recibirTipoRecaudoSeleccionado,
      perderFoco,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
