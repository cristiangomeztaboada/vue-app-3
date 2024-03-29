import { createRouter, createWebHashHistory } from "vue-router";
import VistaPrincipal from "@/views/VistaPrincipal.vue";
import VistaLogin from "@/views/VistaLogin.vue";
import VistaCambiarClave from "@/views/VistaCambiarClave.vue";
import UsuarioGrid from "@/views/usuario/UsuarioGrid.vue";
import UsuarioFormulario from "@/views/usuario/UsuarioFormulario.vue";
import InstitucionEducativaGrid from "@/views/institucionEducativa/InstitucionEducativaGrid.vue";
import InstitucionEducativaFormulario from "@/views/institucionEducativa/InstitucionEducativaFormulario.vue";
import TipoContratoGrid from "@/views/tipoContrato/TipoContratoGrid.vue";
import TipoContratoFormulario from "@/views/tipoContrato/TipoContratoFormulario.vue";
import TipoRecaudoGrid from "@/views/tipoRecaudo/TipoRecaudoGrid.vue";
import TipoRecaudoFormulario from "@/views/tipoRecaudo/TipoRecaudoFormulario.vue";
import PersonalPlantaGrid from "@/views/personalPlanta/PersonalPlantaGrid.vue";
import PersonalPlantaFormulario from "@/views/personalPlanta/PersonalPlantaFormulario.vue";
import FuenteRecursoGrid from "@/views/fuenteRecurso/FuenteRecursoGrid.vue";
import FuenteRecursoFormulario from "@/views/fuenteRecurso/FuenteRecursoFormulario.vue";
import RubroPresupuestoGrid from "@/views/rubroPresupuesto/RubroPresupuestoGrid.vue";
import RubroPresupuestoFormulario from "@/views/rubroPresupuesto/RubroPresupuestoFormulario.vue";
import TipoIdentificacionGrid from "@/views/tipoIdentificacion/TipoIdentificacionGrid.vue";
import TipoIdentificacionFormulario from "@/views/tipoIdentificacion/TipoIdentificacionFormulario.vue";
import TerceroGrid from "@/views/tercero/TerceroGrid.vue";
import TerceroFormulario from "@/views/tercero/TerceroFormulario.vue";
import PeriodoGrid from "@/views/periodo/PeriodoGrid.vue";
import PeriodoFormulario from "@/views/periodo/PeriodoFormulario.vue";
import ProyeccionPresupuestoFormulario from "@/views/proyeccionPresupuesto/ProyeccionPresupuestoFormulario.vue";
import IngresoPresupuestoGrid from "@/views/ingresoPresupuesto/IngresoPresupuestoGrid.vue";
import IngresoPresupuestoFormulario from "@/views/ingresoPresupuesto/IngresoPresupuestoFormulario.vue";
import RecaudoPresupuestoGrid from "@/views/recaudoPresupuesto/RecaudoPresupuestoGrid.vue";
import RecaudoPresupuestoFormulario from "@/views/recaudoPresupuesto/RecaudoPresupuestoFormulario.vue";
import SolicitudPresupuestoGrid from "@/views/solicitudPresupuesto/SolicitudPresupuestoGrid.vue";
import SolicitudPresupuestoFormulario from "@/views/solicitudPresupuesto/SolicitudPresupuestoFormulario.vue";
import CertificadoPresupuestoGrid from "@/views/certificadoPresupuesto/CertificadoPresupuestoGrid.vue";
import CertificadoPresupuestoFormulario from "@/views/certificadoPresupuesto/CertificadoPresupuestoFormulario.vue";
import RegistroPresupuestoGrid from "@/views/registroPresupuesto/RegistroPresupuestoGrid.vue";
import RegistroPresupuestoFormulario from "@/views/registroPresupuesto/RegistroPresupuestoFormulario.vue";
import ObligacionPresupuestoGrid from "@/views/obligacionPresupuesto/ObligacionPresupuestoGrid.vue";
import ObligacionPresupuestoFormulario from "@/views/obligacionPresupuesto/ObligacionPresupuestoFormulario.vue";
import PagoPresupuestoGrid from "@/views/pagoPresupuesto/PagoPresupuestoGrid.vue";
import PagoPresupuestoFormulario from "@/views/pagoPresupuesto/PagoPresupuestoFormulario.vue";
import ModificacionPresupuestoFormulario from "@/views/modificacionPresupuesto/ModificacionPresupuestoFormulario.vue";
import UsuarioAuditorFormulario from "@/views/usuarioAuditor/UsuarioAuditorFormulario.vue";
import ConsultaIntegralDocumentoFormulario from "@/views/consultaIntegralDocumento/ConsultaIntegralDocumentoFormulario.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: VistaLogin,
  },
  {
    path: "/principal",
    name: "principal",
    component: VistaPrincipal,
  },
  {
    path: "/cambiarclave",
    name: "cambiarclave",
    component: VistaCambiarClave,
  },
  {
    path: "/usuario",
    name: "usuario",
    component: UsuarioGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/usuarioformulario",
    name: "usuarioformulario",
    component: UsuarioFormulario,
  },
  {
    path: "/institucioneducativa",
    name: "institucioneducativa",
    component: InstitucionEducativaGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/institucioneducativaformulario",
    name: "institucioneducativaformulario",
    component: InstitucionEducativaFormulario,
  },
  {
    path: "/tipocontrato",
    name: "tipocontrato",
    component: TipoContratoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/tipocontratoformulario",
    name: "tipocontratoformulario",
    component: TipoContratoFormulario,
  },
  {
    path: "/tiporecaudo",
    name: "tiporecaudo",
    component: TipoRecaudoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/tiporecaudoformulario",
    name: "tiporecaudoformulario",
    component: TipoRecaudoFormulario,
  },
  {
    path: "/personalplanta",
    name: "personalplanta",
    component: PersonalPlantaGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/personalplantaformulario",
    name: "personalplantaformulario",
    component: PersonalPlantaFormulario,
  },
  {
    path: "/fuenterecurso",
    name: "fuenterecurso",
    component: FuenteRecursoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/fuenterecursoformulario",
    name: "fuenterecursoformulario",
    component: FuenteRecursoFormulario,
  },
  {
    path: "/rubropresupuesto",
    name: "rubropresupuesto",
    component: RubroPresupuestoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/rubropresupuestoformulario",
    name: "rubropresupuestoformulario",
    component: RubroPresupuestoFormulario,
  },
  {
    path: "/tipoidentificacion",
    name: "tipoidentificacion",
    component: TipoIdentificacionGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/tipoidentificacionformulario",
    name: "tipoidentificacionformulario",
    component: TipoIdentificacionFormulario,
  },
  {
    path: "/tercero",
    name: "tercero",
    component: TerceroGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/terceroformulario",
    name: "terceroformulario",
    component: TerceroFormulario,
  },
  {
    path: "/periodo",
    name: "periodo",
    component: PeriodoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/periodoformulario",
    name: "periodoformulario",
    component: PeriodoFormulario,
  },
  {
    path: "/proyeccionpresupuestoformulario",
    name: "proyeccionpresupuestoformulario",
    component: ProyeccionPresupuestoFormulario,
  },
  {
    path: "/ingresopresupuesto",
    name: "ingresopresupuesto",
    component: IngresoPresupuestoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/ingresopresupuestoformulario",
    name: "ingresopresupuestoformulario",
    component: IngresoPresupuestoFormulario,
  },
  {
    path: "/recaudopresupuesto",
    name: "recaudopresupuesto",
    component: RecaudoPresupuestoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/recaudopresupuestoformulario",
    name: "recaudopresupuestoformulario",
    component: RecaudoPresupuestoFormulario,
  },
  {
    path: "/solicitudpresupuesto",
    name: "solicitudpresupuesto",
    component: SolicitudPresupuestoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/solicitudpresupuestoformulario",
    name: "solicitudpresupuestoformulario",
    component: SolicitudPresupuestoFormulario,
  },
  {
    path: "/certificadopresupuesto",
    name: "certificadopresupuesto",
    component: CertificadoPresupuestoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/certificadopresupuestoformulario",
    name: "certificadopresupuestoformulario",
    component: CertificadoPresupuestoFormulario,
  },
  {
    path: "/registropresupuesto",
    name: "registropresupuesto",
    component: RegistroPresupuestoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/registropresupuestoformulario",
    name: "registropresupuestoformulario",
    component: RegistroPresupuestoFormulario,
  },
  {
    path: "/obligacionpresupuesto",
    name: "obligacionpresupuesto",
    component: ObligacionPresupuestoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/obligacionpresupuestoformulario",
    name: "obligacionpresupuestoformulario",
    component: ObligacionPresupuestoFormulario,
  },
  {
    path: "/pagopresupuesto",
    name: "pagopresupuesto",
    component: PagoPresupuestoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/pagopresupuestoformulario",
    name: "pagopresupuestoformulario",
    component: PagoPresupuestoFormulario,
  },
  {
    path: "/modificacionpresupuestoformulario",
    name: "modificacionpresupuestoformulario",
    component: ModificacionPresupuestoFormulario,
  },
  {
    path: "/usuarioauditorformulario",
    name: "usuarioauditorformulario",
    component: UsuarioAuditorFormulario,
  },
  {
    path: "/consultaintegraldocumentoformulario",
    name: "consultaintegraldocumentoformulario",
    component: ConsultaIntegralDocumentoFormulario,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to,from) => {  
  if(from.name=="login" && !sessionStorage.getItem("usuario")){
    return false;
  }
  else{
    return true;
  }
})

export default router;
