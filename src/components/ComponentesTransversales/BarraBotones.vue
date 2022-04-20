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
    <li v-if="ocultarBotonGuardar ? false : true" class="nav-item">
      <button
        type="button"
        class="btn btn-outline-primary"
        v-on:click="guardar"
      >
        💾
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

    return {
      guardar,
      irAtras,
      nuevo,
      eliminar,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
