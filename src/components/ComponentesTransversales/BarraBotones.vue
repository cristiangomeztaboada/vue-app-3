<template>
  <ul class="nav nav-pills card-header-pills">
    <li v-if="ocultarBotonAtras ? false : true" li class="nav-item">
      <button
        type="button"
        class="btn btn-outline-primary"
        v-on:click="irAtras"
      >
        ⬅️
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
        class="btn btn-outline-primary"
        v-on:click="guardar"
      >
        💾
      </button>
    </li>
    <li v-if="mostrarBotonImportar ? true : false" class="nav-item">
      <button
        type="button"
        class="btn btn-outline-primary"
        v-on:click="importar"
      >
        📥
      </button>
    </li>
    <li v-if="mostrarBotonAprobar ? true : false" class="nav-item">
      <button
        type="button"
        class="btn btn-outline-primary"
        v-on:click="aprobar"
      >
        ✅
      </button>
    </li>
    <li v-if="ocultarBotonNuevo ? false : true" class="nav-item">
      <button type="button" class="btn btn-outline-primary" v-on:click="nuevo">
        ➕
      </button>
    </li>
    <li class="nav-item">
      <button
        type="button"
        class="btn btn-outline-primary"
        v-on:click="eliminar"
      >
        🗑️
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
