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
          <h5 class="card-title">Tercero</h5>
          <label>Tipo Identificacion</label>
          <tipo-identificacion-buscador
            v-on:perderFoco="consultarTipoIdentificacion"
            v-bind:codigoPropiedad="tipoIdentificacionCodigo"
          />
          <label>Código</label>
          <tercero-buscador
            v-on:perderFoco="consultarTercero"
            v-bind:codigoPropiedad="codigo"
          />
          <label>Nombre</label>
          <input
            class="form-control"
            v-model="nombre"
            type="text"
            id="nombre"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponenteAlerta from "@/components/ComponentesTransversales/ComponenteAlerta.vue";
import TerceroBuscador from "./TerceroBuscador.vue";
import TipoIdentificacionBuscador from "@/views/tipoIdentificacion/TipoIdentificacionBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "TerceroFormulario",
  components: {
    TerceroBuscador,
    BarraBotones,
    ComponenteAlerta,
    TipoIdentificacionBuscador,
  },
  setup() {
    const mensajeAlerta = ref("");
    const codigo = ref("");
    const nombre = ref("");
    const tipoIdentificacionCodigo = ref("");
    const route = new useRoute();
    const router = useRouter();

    const consultarTercero = function (c) {
      const ti = tipoIdentificacionCodigo.value;
      api
        .consultarTercero(c, tipoIdentificacionCodigo.value)
        .then((data) => {
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          tipoIdentificacionCodigo.value = data.tipoIdentificacionCodigo;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
          tipoIdentificacionCodigo.value = ti;
        });
    };

    const consultarTercero2 = function (c, ti) {
      api
        .consultarTercero(c, ti)
        .then((data) => {
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          tipoIdentificacionCodigo.value = data.tipoIdentificacionCodigo;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
          tipoIdentificacionCodigo.value = ti;
        });
    };

    consultarTercero2(route.params.codigo, route.params.tipoIdentificacionCodigo);

    const guardar = function () {
      const tercero = {
        codigo: codigo.value,
        nombre: nombre.value,
        tipoIdentificacionCodigo: tipoIdentificacionCodigo.value,
      };

      api
        .insertarTercero(tercero)
        .then((mensajeAlerta.value = "registro insertado con exito"))
        .catch(function (e) {
          mensajeAlerta.value = e;
        });
    };

    const irAtras = function () {
      router.push({
        name: "tercero",
      });
    };

    const nuevo = function () {
      codigo.value = "";
      nombre.value = "";
      tipoIdentificacionCodigo.value = "";
    };

    const eliminar = function () {
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarTercero(codigo.value, tipoIdentificacionCodigo.value)
          .then(() =>
            router.push({
              name: "tercero",
            })
          )
          .catch(function (e) {
            mensajeAlerta.value = e;
          });
      }
    };

    const consultarTipoIdentificacion = function (c) {
      api
        .consultarTipoIdentificacion(c)
        .then((data) => {
          tipoIdentificacionCodigo.value = data.codigo;
        })
        .catch(function () {
          tipoIdentificacionCodigo.value = "";
        });
    };

    return {
      mensajeAlerta,
      codigo,
      nombre,
      tipoIdentificacionCodigo,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarTercero,
      consultarTipoIdentificacion,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
