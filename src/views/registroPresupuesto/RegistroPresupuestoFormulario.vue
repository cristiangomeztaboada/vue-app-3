<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <div class="card shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card-header">
          <barra-botones
            v-on:guardar="guardar"
            v-on:eliminar="eliminar"
            v-on:irAtras="irAtras"
            v-on:nuevo="nuevo"
            v-on:imprimir="imprimir"
            v-bind:ocultarBotonGuardar="!esNuevo"
            v-bind:mostrarBotonEliminar="true"
            v-bind:mostrarBotonAdjuntar="!esNuevo"
            v-bind:mostrarBotonImprimir="!esNuevo"
            v-bind:tipo="5"
            v-bind:id="id"
          />
        </div>
        <div class="card-body">
          <h5 v-if="esNuevo" class="card-title">
            Insertar Registro Presupuesto
          </h5>
          <h5 v-if="!esNuevo" class="card-title">Registro Presupuesto</h5>
          <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Institución Educativa</label>
              <input
                v-model="institucionEducativaNombre"
                class="form-control"
                type="text"
                readonly
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Consecutivo</label>
              <registro-presupuesto-buscador
                v-on:perderFoco="consultarRegistroPresupuesto"
                v-bind:codigoPropiedad="consecutivo"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Fecha</label>
              <input
                class="form-control"
                v-model="fecha"
                type="date"
                id="fecha"
                readonly
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Estado</label>
              <input
                v-model="estado"
                class="form-control"
                type="text"
                readonly
              />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Objeto</label>
              <input v-model="objeto" class="form-control" type="text" />
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Observación</label>
              <input v-model="observacion" class="form-control" type="text" />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label>Tercero</label>
              <tercero-buscador
                v-on:perderFoco="consultarTercero"
                v-bind:codigoPropiedad="terceroCodigo"
                v-bind:mostrarCampoNombre="true"
                v-bind:nombrePropiedad="terceroNombre"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Tipo Contrato</label>
              <DxSelectBox
                :items="listaTipoContrato"
                display-expr="nombre"
                value-expr="codigo"
                v-model="tipoContratoCodigo"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Fecha Inicio Contrato</label>
              <input
                class="form-control"
                v-model="fechaInicioContrato"
                type="date"
                id="fechaInicioContrato"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Fecha Fin Contrato</label>
              <input
                class="form-control"
                v-model="fechaFinContrato"
                type="date"
                id="fechaFinContrato"
              />
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label>Número Contrato</label>
              <input
                v-model="contratoNumero"
                class="form-control"
                type="text"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Certificado Presupuesto</label>
              <certificado-presupuesto-buscador
                v-on:perderFoco="consultarCertificadoPresupuesto"
                v-bind:codigoPropiedad="certificadoPresupuestoConsecutivo"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Saldo</label>
              <DxNumberBox
                v-model="certificadoPresupuestoSaldo"
                format="$ #,##0.##"
                :read-only="true"
              />
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <label>Valor</label>
              <DxNumberBox v-model="valor" format="$ #,##0.##" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-show="imprimiendo" id="pdf" class="card-body">
    <div align="center">
      <img src="@/assets/logo2.png" />
    </div>
    <br /><br />
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <input
          v-model="institucionEducativaNombre"
          class="form-control"
          type="text"
          style="text-align: center; border: 0; font-weight: bold"
        />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <h5 class="card-title" style="text-align: center">
          Registro Presupuesto
        </h5>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Consecutivo:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="consecutivo" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Estado:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="estado" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Fecha:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="fecha" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Objeto:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <textarea v-model="objeto" class="form-control" type="text" rows="2" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Observación:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <textarea
          v-model="observacion"
          class="form-control"
          type="text"
          rows="2"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Tercero:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="terceroNombre" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Contrato:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <DxSelectBox
                :items="listaTipoContrato"
                display-expr="nombre"
                value-expr="codigo"
                v-model="tipoContratoCodigo"
              />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Inicio:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="fechaInicioContrato" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Fin:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="fechaFinContrato" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Número:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="contratoNumero" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>CDP:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <input v-model="certificadoPresupuestoConsecutivo" class="form-control" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <b>Valor:</b>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <DxNumberBox v-model="valor" format="$ #,##0.##" />
      </div>
    </div>
    <br />
    <br />
    <br />
    <div class="row">
      <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <hr />
        <b><center>Elaborado por</center></b>
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <hr />
        <b><center>Aprobado por</center></b>
      </div>
    </div>
  </div>
</template>

<script>
import RegistroPresupuestoBuscador from "./RegistroPresupuestoBuscador.vue";
import TerceroBuscador from "@/views/tercero/TerceroBuscador.vue";
import CertificadoPresupuestoBuscador from "@/views/certificadoPresupuesto/CertificadoPresupuestoBuscador.vue";
import { ref } from "vue";
import BarraBotones from "@/components/ComponentesTransversales/BarraBotones.vue";
import api from "@/api.js";
import { useStore } from "vuex";
import DxNumberBox from "devextreme-vue/number-box";
import { useRoute, useRouter } from "vue-router";
import DxSelectBox from "devextreme-vue/select-box";
import html2pdf from "html2pdf.js";

export default {
  name: "RegistroPresupuestoFormulario",
  components: {
    RegistroPresupuestoBuscador,
    CertificadoPresupuestoBuscador,
    TerceroBuscador,
    BarraBotones,
    DxNumberBox,
    DxSelectBox,
  },
  setup() {
    const esNuevo = ref(true);
    const id = ref(0);
    const institucionEducativaCodigo = ref("");
    const institucionEducativaNombre = ref("");
    const consecutivo = ref(0);
    const estado = ref("");
    const fecha = ref("");
    const terceroCodigo = ref("");
    const terceroNombre = ref("");
    const objeto = ref("");
    const observacion = ref("");
    const certificadoPresupuestoConsecutivo = ref(0);
    const certificadoPresupuestoSaldo = ref(0);
    const valor = ref(0);
    const listaTipoContrato = ref([]);
    const tipoContratoCodigo = ref("");
    const fechaInicioContrato = ref("");
    const fechaFinContrato = ref("");
    const contratoNumero = ref("");
    const imprimiendo = ref(false);

    const store = useStore();
    const route = new useRoute();
    const router = useRouter();

    institucionEducativaCodigo.value = store.state.institucioneducativa;
    institucionEducativaNombre.value = store.state.institucioneducativanombre;

    const listarTipoContrato = function () {
      store.commit("ocultarAlerta");
      api
        .listarTipoContrato()
        .then((data) => {
          listaTipoContrato.value = data;
        })
        .catch(() => {});
    };

    listarTipoContrato();

    const consultarRegistroPresupuesto = function (c) {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      api
        .consultarRegistroPresupuesto(store.state.institucioneducativa, c)
        .then((data) => {
          if (data.consecutivo) {
            esNuevo.value = false;
          }

          id.value = data.id;
          consecutivo.value = data.consecutivo;
          fecha.value = data.fecha.substring(0, 10);
          estado.value=data.estado;
          terceroCodigo.value = data.terceroid.codigo;
          consultarTercero(terceroCodigo.value);
          objeto.value = data.objeto;
          observacion.value = data.observacion;

          tipoContratoCodigo.value=data.tipocontratoid.codigo;
          fechaInicioContrato.value=data.fechainiciocontrato;
          fechaFinContrato.value=data.fechafincontrato;
          contratoNumero.value=data.contratonumero;

          certificadoPresupuestoConsecutivo.value =
            data.certificadodisponibilidadpresupuestalid.consecutivo;

          consultarCertificadoPresupuesto(
            certificadoPresupuestoConsecutivo.value
          );

          valor.value = Number(data.valor);
        })
        .catch(() => {
          nuevo();
        });
    };

    consultarRegistroPresupuesto(route.params.codigo);

    const guardar = function () {
      store.commit("ocultarAlerta");

      const registroPresupuesto = {
        institucioneducativaid: {
          codigo: institucionEducativaCodigo.value,
        },
        consecutivo: consecutivo.value,
        fecha: fecha.value,
        terceroid: {
          codigo: terceroCodigo.value,
        },
        tipocontratoid: {
          codigo: tipoContratoCodigo.value,
        },
        fechainiciocontrato: fechaInicioContrato.value,
        fechafincontrato: fechaFinContrato.value,
        contratonumero: contratoNumero.value,
        objeto: objeto.value,
        observacion: observacion.value,
        certificadodisponibilidadpresupuestalid: {
          consecutivo: certificadoPresupuestoConsecutivo.value,
        },
        valor: Math.abs(valor.value),
      };

      api
        .insertarRegistroPresupuesto(registroPresupuesto)
        .then((data) => {
          consultarRegistroPresupuesto(data.consecutivo);
          store.commit("mostrarInformacion", "registro insertado con exito");
        })
        .catch(() => {
          store.commit(
            "mostrarError",
            "La fecha no pertenece al periodo activo"
          );

          store.commit(
            "mostrarError",
            "El valor ingresado supera el saldo del CDP"
          );

          if (!valor.value) {
            store.commit("mostrarError", "ingrese un valor válido");
          }

          if (!objeto.value) {
            store.commit("mostrarError", "Diligencie el campo objeto");
          }

          if (!certificadoPresupuestoConsecutivo.value) {
            store.commit("mostrarError", "ingrese un CDP válido");
          }

          if (!terceroCodigo.value) {
            store.commit("mostrarError", "ingrese un tercero válido");
          }

          let isValidDate = Date.parse(registroPresupuesto.fechainiciocontrato);
          if (isNaN(isValidDate)) {
            store.commit(
              "mostrarError",
              "ingrese una fecha inicio contrato válida"
            );
          }

          isValidDate = Date.parse(registroPresupuesto.fechafincontrato);
          if (isNaN(isValidDate)) {
            store.commit(
              "mostrarError",
              "ingrese una fecha fin contrato válida"
            );
          }

          if (!contratoNumero.value) {
            store.commit(
              "mostrarError",
              "ingrese un número de contrato válido"
            );
          }

          if (!tipoContratoCodigo.value) {
            store.commit(
              "mostrarError",
              "ingrese un tipo de contrato válido"
            );
          }
        });
    };

    const nuevo = function () {
      store.commit("ocultarAlerta");
      esNuevo.value = true;
      id.value = 0;
      consecutivo.value = 0;
      fecha.value = api.obtenerFechaActual();
      terceroCodigo.value = "";
      consultarTercero(terceroCodigo.value);
      observacion.value = "";
      certificadoPresupuestoConsecutivo.value = 0;
      consultarCertificadoPresupuesto(certificadoPresupuestoConsecutivo.value);
      valor.value = 0;
      estado.value="";
      objeto.value="";
      tipoContratoCodigo.value="";
      fechaInicioContrato.value="";
      fechaFinContrato.value="";
      contratoNumero.value="";
    };

    const eliminar = function () {
      store.commit("ocultarAlerta");
      if (window.confirm("Desea eliminar este registro?")) {
        api
          .eliminarRegistroPresupuesto(
            institucionEducativaCodigo.value,
            consecutivo.value
          )
          .then(() => {
            router.push({
              name: "registropresupuesto",
            })
          })
          .catch(() => {
            store.commit(
              "mostrarError",
              "Imposible eliminar, existen documentos de oblicación presupuestal relacionados"
            );

            if (estado.value == "Anulado") {
              store.commit(
                "mostrarError",
                "El documento ya se encuentra anulado"
              );
            }
          });
      }
    };

    const irAtras = function () {
      store.commit("ocultarAlerta");
      router.push({
        name: "registropresupuesto",
      });
    };

    const consultarCertificadoPresupuestoSaldo = function (e) {
      api
        .consultarRubroPresupuestoSaldoSolicitud(
          institucionEducativaCodigo.value,
          e.value
        )
        .then((data) => {
          consultarCertificadoPresupuestoSaldo.value = data;
        })
        .catch(() => {});

      api
        .consultarRubroPresupuestoSaldoRecaudo(
          institucionEducativaCodigo.value,
          e.value
        )
        .then((data) => {
          consultarCertificadoPresupuestoSaldo.value = data;
        })
        .catch(() => {});
    };

    const consultarTercero = function (c) {
      store.commit("ocultarAlerta");
      api
        .consultarTercero(c)
        .then((data) => {
          terceroCodigo.value = data.codigo;
          terceroNombre.value = data.nombre;
        })
        .catch(() => {
          terceroCodigo.value = "";
          terceroNombre.value = "";
        });
    };

    const consultarCertificadoPresupuesto = function (c) {
      store.commit("ocultarAlerta");

      api
        .consultarCertificadoPresupuesto(institucionEducativaCodigo.value, c)
        .then((data) => {
          certificadoPresupuestoConsecutivo.value = data.consecutivo;

          api
            .consultarCertificadoPresupuestoSaldo(
              institucionEducativaCodigo.value,
              c
            )
            .then((data) => {
              certificadoPresupuestoSaldo.value = data;
            })
            .catch(() => {
              certificadoPresupuestoSaldo.value = 0;
            });
        })
        .catch(() => {
          certificadoPresupuestoSaldo.value = 0;
        });
    };

    const imprimir = function () {
      try {
        imprimiendo.value = true;
        store.commit("ocultarAlerta");
        const element = document.getElementById("pdf");
        html2pdf().from(element).save();
        setTimeout(() => {
          imprimiendo.value = false;
        }, 0);
      } catch (e) {
        imprimiendo.value = false;
      }
    };

    return {
      esNuevo,
      id,
      institucionEducativaCodigo,
      institucionEducativaNombre,
      consecutivo,
      estado,
      fecha,
      terceroCodigo,
      terceroNombre,
      objeto,
      observacion,
      certificadoPresupuestoConsecutivo,
      certificadoPresupuestoSaldo,
      valor,
      listaTipoContrato,
      tipoContratoCodigo,
      fechaInicioContrato,
      fechaFinContrato,
      contratoNumero,
      imprimiendo,

      guardar,
      eliminar,
      nuevo,
      irAtras,
      consultarRegistroPresupuesto,
      consultarCertificadoPresupuestoSaldo,
      consultarTercero,
      consultarCertificadoPresupuesto,
      imprimir,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
