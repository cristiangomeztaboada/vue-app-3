<template>
  <ul class="nav nav-pills card-header-pills">
    <li v-if="ocultarBotonAtras ? false : true" class="nav-item">
      <button type="button" class="btn btn-danger" v-on:click="irAtras">
        <span>⬅️</span>IR ATRAS
      </button>
    </li>
    <li v-if="mostrarBotonImprimir ? true : false" class="nav-item">
      <button type="button" class="btn btn-warning" v-on:click="imprimir">
        <span>🖨️</span>IMPRIMIR
      </button>
    </li>
    <li v-if="ocultarBotonGuardar ? false : true" class="nav-item">
      <button type="button" class="btn btn-success" v-on:click="guardar">
        <span>💾</span>GUARDAR
      </button>
    </li>
    <li v-if="mostrarBotonImportar ? true : false" class="nav-item">
      <button type="button" class="btn btn-danger" v-on:click="importar">
        <span>📥</span>IMPORTAR
      </button>
    </li>
    <li v-if="mostrarBotonAprobar ? true : false" class="nav-item">
      <button type="button" class="btn btn-warning" v-on:click="aprobar">
        <span>✅</span>APROBAR
      </button>
    </li>
    <li v-if="ocultarBotonNuevo ? false : true" class="nav-item">
      <button type="button" class="btn btn-warning" v-on:click="nuevo">
        <span>➕</span>NUEVO
      </button>
    </li>
    <li v-if="mostrarBotonEliminar ? true : false" class="nav-item">
      <button type="button" class="btn btn-danger" v-on:click="eliminar">
        <span>&#10008;</span>ELIMINAR
      </button>
    </li>
    <li v-if="mostrarBotonAdjuntar ? true : false" class="nav-item">
      <button
        type="button"
        class="btn btn-success"
        v-on:click="abrirModalAdjuntar"
      >
        <span>🖇️</span>DOCUMENTOS
      </button>
    </li>
  </ul>

  <div class="modal" id="modalAdjuntar" tabindex="-1">
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
          <componente-adjuntar
            v-bind:tipo="tipo"
            v-bind:id="id_"
          ></componente-adjuntar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import ComponenteAdjuntar from "./ComponenteAdjuntar.vue";
import { ref,watch } from "vue";
export default {
  name: "BarraBotones",
  components: { ComponenteAdjuntar },
  props: {
    ocultarBotonAtras: Boolean,
    ocultarBotonNuevo: Boolean,
    ocultarBotonGuardar: Boolean,
    mostrarBotonImprimir: Boolean,
    mostrarBotonAprobar: Boolean,
    mostrarBotonImportar: Boolean,
    mostrarBotonEliminar: Boolean,
    mostrarBotonAdjuntar: Boolean,
    tipo: Number,
    id: Number,
  },
  setup(props, context) {
    const id_ = ref(0);
    
    watch(
      () => props.id,
      (newId) => {
        id_.value = newId;
      }
    );

    const guardar = function () {
      context.emit("guardar");
    };

    const irAtras = function () {
      context.emit("irAtras");
    };

    const nuevo = function () {
      context.emit("nuevo");
    };

    const eliminar = function () {
      context.emit("eliminar");
    };

    const imprimir = function () {
      context.emit("imprimir");
    };

    const aprobar = function () {
      context.emit("aprobar");
    };

    const importar = function () {
      context.emit("importar");
    };

    const abrirModalAdjuntar = function () {
      $("#modalAdjuntar").modal("show");
    };

    return {
      id_,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      imprimir,
      aprobar,
      importar,
      abrirModalAdjuntar,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
