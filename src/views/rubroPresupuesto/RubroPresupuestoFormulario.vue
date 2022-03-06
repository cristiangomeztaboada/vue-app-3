<template>
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
          <h5 class="card-title">Rubro Prespuesto</h5>
          <label>Código</label>
          <rubro-presupuesto-buscador
            v-on:perderFoco="consultarRubroPresupuesto"
            v-bind:codigoPropiedad="codigo"
          />
          <label>Nombre</label>
          <input
            class="form-control"
            v-model="nombre"
            type="text"
            id="nombre"
          />
          <label>Rubro Presupuesto Padre</label>
          <rubro-presupuesto-padre-buscador
            v-on:perderFocoPadre="consultarRubroPresupuestoPadre"
            v-bind:codigoPropiedad="rubroPresupuestoCodigoPadre"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RubroPresupuestoBuscador from "./RubroPresupuestoBuscador.vue";
import RubroPresupuestoPadreBuscador from "./RubroPresupuestoPadreBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "RubroPresupuestoFormulario",
  components: {
    RubroPresupuestoBuscador,
    RubroPresupuestoPadreBuscador,
    BarraBotones,
  },
  setup() {
    const codigo = ref("");
    const nombre = ref("");
    const rubroPresupuestoCodigoPadre = ref("");
    const route = new useRoute();
    const router = useRouter();
    const store = useStore();

    const consultarRubroPresupuesto = function (c) {
      api
        .consultarRubroPresupuesto(c)
        .then((data) => {
          codigo.value = data.codigo;
          nombre.value = data.nombre;
          rubroPresupuestoCodigoPadre.value = data.rubroPresupuestoCodigoPadre;
        })
        .catch(function () {
          nuevo();
          codigo.value = c;
        });
    };

    consultarRubroPresupuesto(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");
      const rubroPresupuesto = {
        codigo: codigo.value,
        nombre: nombre.value,
        rubroPresupuestoCodigoPadre: rubroPresupuestoCodigoPadre.value,
      };
console.log(rubroPresupuesto);
      api
        .insertarRubroPresupuesto(rubroPresupuesto)
        .then(store.commit("mostrarInformacion", "registro insertado con exito"))
        .catch(function (e) {
          store.commit("mostrarError", e);
        });
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "rubropresupuesto",
      });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      codigo.value = "";
      nombre.value = "";
      rubroPresupuestoCodigoPadre.value = "";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarRubroPresupuesto(codigo.value)
          .then(() =>
            router.push({
              name: "rubropresupuesto",
            })
          )
          .catch(function (e) {
            store.commit("mostrarError", e);
          });
      }
    };

    const consultarRubroPresupuestoPadre = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarRubroPresupuesto(c)
        .then((data) => {
          console.log(data);
          rubroPresupuestoCodigoPadre.value = data.codigo;
        })
        .catch(function () {
          rubroPresupuestoCodigoPadre.value = "";
        });
    };

    return {
      codigo,
      nombre,
      rubroPresupuestoCodigoPadre,
      guardar,
      irAtras,
      nuevo,
      eliminar,
      consultarRubroPresupuesto,
      consultarRubroPresupuestoPadre,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
