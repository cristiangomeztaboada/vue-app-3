<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div class="input-group mb-3">
        <input
          min="2022"
          max="9999"
          class="form-control"
          v-model="codigo"
          type="number"
          id="codigo"
          v-on:blur="perderFoco"
        />
        <div class="input-group-append">
          <button
            type="button"
            class="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#modalPeriodo"
          >
            🔎
          </button>
        </div>
      </div>
    </div>
    <div class="modal" id="modalPeriodo" tabindex="-1">
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
            <periodo-grid
              v-bind:mostrarColumnaBotones="false"
              v-on:seleccionarPeriodo="recibirPeriodoSeleccionado"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PeriodoGrid from "@/views/periodo/PeriodoGrid.vue";
import $ from "jquery";
import { ref, watch } from "vue";

export default {
  name: "PeriodoBuscador",
  components: {
    PeriodoGrid,
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

    const recibirPeriodoSeleccionado = function (c) {
      $("#modalPeriodo").modal("hide");
      codigo.value = c;
      perderFoco();
    };

    const perderFoco = function () {
      $("#modalPeriodo").modal("hide");
      context.emit("perderFoco", codigo.value);
    };

    return {
      codigo,
      recibirPeriodoSeleccionado,
      perderFoco,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
