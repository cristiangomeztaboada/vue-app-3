<template>
  <ul class="nav nav-pills card-header-pills">
    <li v-if="ocultarBotonAtras ? false : true" li class="nav-item">
      <button
        type="button"
        class="btn btn-danger"
        v-on:click="irAtras"
      >
        <span>⬅️</span>IR ATRAS
      </button>
    </li>
    <li v-if="mostrarBotonImprimir ? true : false" class="nav-item">
      <button
        type="button"
        class="btn btn-outline-primary"
        v-on:click="imprimir"
      >
        🖨️
      </button>
    </li>
    <li v-if="ocultarBotonGuardar ? false : true" class="nav-item">
      <button
        type="button"
        class="btn btn-success"
        v-on:click="guardar"
      >
        <span>💾</span>GUARDAR
      </button>
    </li>
    <li v-if="mostrarBotonImportar ? true : false" class="nav-item">
      <button
        type="button"
        class="btn btn-danger"
        v-on:click="importar"
      >
        <span>📥</span>IMPRIMIR
      </button>
    </li>
    <li v-if="mostrarBotonAprobar ? true : false" class="nav-item">
      <button
        type="button"
        class="btn btn-warning"
        v-on:click="aprobar"
      >
        <span>✅</span>APROBAR
      </button>
    </li>
    <li v-if="ocultarBotonNuevo ? false : true" class="nav-item">
      <button type="button" class="btn btn-warning" v-on:click="nuevo">
        <span>➕</span>NUEVO
      </button>
    </li>
    <li v-if="mostrarBotonEliminar ? true : false" class="nav-item">
      <button
        type="button"
        class="btn btn-danger"
        v-on:click="eliminar"
      >
        <span>&#10008;</span>ELIMINAR
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BarraBotones",
  components: {},
  props: {
    ocultarBotonAtras: Boolean,
    ocultarBotonNuevo: Boolean,
    ocultarBotonGuardar: Boolean,
    mostrarBotonImprimir: Boolean,
    mostrarBotonAprobar: Boolean,
    mostrarBotonImportar: Boolean,
    mostrarBotonEliminar: Boolean,
  },
  setup(props, context) {
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

    return {
      guardar,
      irAtras,
      nuevo,
      eliminar,
      imprimir,
      aprobar,
      importar,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
