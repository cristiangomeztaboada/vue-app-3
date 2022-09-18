//const url = "http://localhost:3000"; //Express
const url = "http://127.0.0.1:8000"; //Django Rest Framework

const obtenerFechaActual = function () {
  let hoy = new Date();
  let fullFechaActual = `${hoy.getFullYear()}-${(hoy.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${hoy.getDate().toString().padStart(2, "0")}`;
  return fullFechaActual;
};

const manejarError = function (res) {
  if (!res.ok) {
    throw res.statusText;
  }
  return res;
};

const listarUsuario = function () {
  return fetch(`${url}/usuario`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarUsuario = function (codigo) {
  return fetch(`${url}/usuario/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarUsuario = function (usuario) {
  return fetch(`${url}/usuario/`, {
    method: "POST",
    body: JSON.stringify(usuario),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarUsuario = function (usuario) {
  return fetch(`${url}/usuario/${usuario.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(usuario),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarUsuario = function (codigo) {
  return fetch(`${url}/usuario/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarInstitucionEducativa = function () {
  return fetch(`${url}/institucioneducativa`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarInstitucionEducativa = function (codigo) {
  return fetch(`${url}/institucioneducativa/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarInstitucionEducativaPorUsuario = function (codigo) {
  return fetch(`${url}/institucioneducativa/usuario/${codigo}`, {
    method: "GET",
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarInstitucionEducativa = function (institucionEducativa) {
  return fetch(`${url}/institucioneducativa/`, {
    method: "POST",
    body: JSON.stringify(institucionEducativa),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarInstitucionEducativa = function (institucionEducativa) {
  return fetch(`${url}/institucioneducativa/${institucionEducativa.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(institucionEducativa),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarInstitucionEducativa = function (codigo) {
  return fetch(`${url}/institucioneducativa/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarTipoContrato = function () {
  return fetch(`${url}/tipocontrato`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarTipoContrato = function (codigo) {
  return fetch(`${url}/tipocontrato/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const consultarTipoContrato = function (codigo) {
  return fetch(`${url}/tipocontrato/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarTipoContrato = function (tipoContrato) {
  return fetch(`${url}/tipocontrato/`, {
    method: "POST",
    body: JSON.stringify(tipoContrato),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarTipoContrato = function (tipoContrato) {
  return fetch(`${url}/tipocontrato/${tipoContrato.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(tipoContrato),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarTipoRecaudo = function () {
  return fetch(`${url}/tiporecaudo`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarTipoRecaudo = function (tipoRecaudo) {
  return fetch(`${url}/tiporecaudo/`, {
    method: "POST",
    body: JSON.stringify(tipoRecaudo),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarTipoRecaudo = function (tipoRecaudo) {
  return fetch(`${url}/tiporecaudo/${tipoRecaudo.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(tipoRecaudo),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const consultarTipoRecaudo = function (codigo) {
  return fetch(`${url}/tiporecaudo/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarTipoRecaudo = function (codigo) {
  return fetch(`${url}/tiporecaudo/${codigo}/`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarPersonalPlanta = function (institucionEducativaCodigo) {
  return fetch(
    `${url}/personalplanta/institucioneducativa/${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarPersonalPlanta = function (codigo) {
  return fetch(`${url}/personalplanta/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarPersonalPlanta = function (personalPlanta) {
  return fetch(`${url}/personalplanta/`, {
    method: "POST",
    body: JSON.stringify(personalPlanta),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarPersonalPlanta = function (personalPlanta) {
  return fetch(`${url}/personalplanta/${personalPlanta.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(personalPlanta),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarPersonalPlanta = function (codigo) {
  return fetch(`${url}/personalplanta/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarFuenteRecurso = function () {
  return fetch(`${url}/fuenterecurso`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const listarFuenteRecursoProyeccion = function (institucionEducativaCodigo) {
  return fetch(
    `${url}/fuenterecurso/proyeccion/${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const listarFuenteRecursoDetalle = function () {
  return fetch(`${url}/fuenterecurso/detalle/final/`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarFuenteRecurso = function (codigo) {
  return fetch(`${url}/fuenterecurso/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarFuenteRecursoSaldo = function (
  institucionEducativaCodigo,
  fuenteRecursoCodigo
) {
  return fetch(
    `${url}/fuenterecurso/fuenterecursoporingreso/saldo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&codigofuenterecurso=${fuenteRecursoCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarFuenteRecursoSaldoRecaudo = function (
  institucionEducativaCodigo,
  fuenteRecursoCodigo
) {
  return fetch(
    `${url}/fuenterecurso/fuenterecursoporrecaudo/saldo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&codigofuenterecurso=${fuenteRecursoCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarFuenteRecurso = function (fuenteRecurso) {
  return fetch(`${url}/fuenterecurso/`, {
    method: "POST",
    body: JSON.stringify(fuenteRecurso),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarFuenteRecurso = function (fuenteRecurso) {
  return fetch(`${url}/fuenterecurso/${fuenteRecurso.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(fuenteRecurso),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarFuenteRecurso = function (codigo) {
  return fetch(`${url}/fuenterecurso/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarRubroPresupuesto = function () {
  return fetch(`${url}/rubropresupuestal`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const listarRubroPresupuestoDetalle = function () {
  return fetch(`${url}/rubropresupuestal/detalle/final/`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarRubroPresupuesto = function (codigo) {
  return fetch(`${url}/rubropresupuestal/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarRubroPresupuesto = function (rubroPresupuesto) {
  return fetch(`${url}/rubropresupuestal/`, {
    method: "POST",
    body: JSON.stringify(rubroPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarRubroPresupuesto = function (rubroPresupuesto) {
  return fetch(`${url}/rubropresupuestal/${rubroPresupuesto.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(rubroPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarRubroPresupuesto = function (codigo) {
  return fetch(`${url}/rubropresupuestal/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarTipoIdentificacion = function () {
  return fetch(`${url}/tipoidentificacion`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarTipoIdentificacion = function (codigo) {
  return fetch(`${url}/tipoidentificacion/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarTipoIdentificacion = function (codigo) {
  return fetch(`${url}/tipoidentificacion/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarTipoIdentificacion = function (tipoIdentificacion) {
  return fetch(`${url}/tipoidentificacion/`, {
    method: "POST",
    body: JSON.stringify(tipoIdentificacion),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarTipoIdentificacion = function (tipoIdentificacion) {
  return fetch(`${url}/tipoidentificacion/${tipoIdentificacion.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(tipoIdentificacion),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarTercero = function () {
  return fetch(`${url}/tercero`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarTercero = function (codigo) {
  return fetch(`${url}/tercero/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarTercero = function (tercero) {
  return fetch(`${url}/tercero/`, {
    method: "POST",
    body: JSON.stringify(tercero),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarTercero = function (tercero) {
  return fetch(`${url}/tercero/${tercero.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(tercero),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarTercero = function (codigo) {
  return fetch(`${url}/tercero/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarPeriodo = function () {
  return fetch(`${url}/periodo`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const listarPeriodoActivos = function () {
  return fetch(`${url}/periodo/listar/activos`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarPeriodo = function (codigo) {
  return fetch(`${url}/periodo/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarPeriodo = function (codigo) {
  return fetch(`${url}/periodo/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarPeriodo = function (periodo) {
  return fetch(`${url}/periodo/`, {
    method: "POST",
    body: JSON.stringify(periodo),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarPeriodo = function (periodo) {
  return fetch(`${url}/periodo/${periodo.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(periodo),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const consultarProyeccionPresupuesto = function (
  periodoCodigo,
  institucionEducativaCodigo
) {
  return fetch(
    `${url}/proyeccionpresupuestalcabecera/?codigoperiodo=${periodoCodigo}&codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarProyeccionPresupuesto = function (
  periodoCodigo,
  institucionEducativaCodigo
) {
  return fetch(
    `${url}/proyeccionpresupuestalcabecera/?codigoperiodo=${periodoCodigo}&codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const aprobarProyeccionPresupuesto = function (
  periodoCodigo,
  institucionEducativaCodigo
) {
  return fetch(
    `${url}/proyeccionpresupuestalcabecera/aprobar/?codigoperiodo=${periodoCodigo}&codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "PUT" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarProyeccionPresupuesto = function (proyeccionPresupuesto) {
  return fetch(`${url}/proyeccionpresupuestalcabecera/`, {
    method: "POST",
    body: JSON.stringify(proyeccionPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarProyeccionPresupuesto = function (proyeccionPresupuesto) {
  return fetch(
    `${url}/proyeccionpresupuestalcabecera/?codigoperiodo=${proyeccionPresupuesto.periodoid.codigo}&codigoinstitucioneducativa=${proyeccionPresupuesto.institucioneducativaid.codigo}`,
    {
      method: "PUT",
      body: JSON.stringify(proyeccionPresupuesto),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarProyeccionPresupuestoDetalle = function (
  proyeccionPresupuestoDetalle
) {
  return fetch(`${url}/proyeccionpresupuestaldetalle/`, {
    method: "POST",
    body: JSON.stringify(proyeccionPresupuestoDetalle),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarProyeccionPresupuestoDetalleMultiple = function (
  periodoCodigo,
  institucionEducativaCodigo,
  proyeccionPresupuestoDetalle
) {
  return fetch(`${url}/proyeccionpresupuestaldetalle/todos/`, {
    method: "POST",
    body: JSON.stringify(proyeccionPresupuestoDetalle),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarProyeccionPresupuestoDetalle = function (
  periodoCodigo,
  institucionEducativaCodigo,
  fuenteRecursoCodigo,
  rubroPresupuestoCodigo
) {
  return fetch(
    `${url}/proyeccionpresupuestaldetalle/?codigoperiodo=${periodoCodigo}&codigoinstitucioneducativa=${institucionEducativaCodigo}&codigofuenterecurso=${fuenteRecursoCodigo}&codigorubropresupuestal=${rubroPresupuestoCodigo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarProyeccionPresupuestoDetalleMultiple = function (
  periodoCodigo,
  institucionEducativaCodigo
) {
  return fetch(
    `${url}/proyeccionpresupuestaldetalle/todos/?codigoperiodo=${periodoCodigo}&codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarIngresoPresupuesto = function (
  institucionEducativaCodigo,
  periodoCodigo
) {
  return fetch(
    `${url}/ingresopresupuestal/?codigoperiodo=${periodoCodigo}&codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarIngresoPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/ingresopresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarIngresoPresupuestoSaldo = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/ingresopresupuestal/consecutivo/saldo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarIngresoPresupuesto = function (ingresoPresupuestoDetalle) {
  return fetch(`${url}/ingresopresupuestal/`, {
    method: "POST",
    body: JSON.stringify(ingresoPresupuestoDetalle),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const actualizarIngresoPresupuesto = function (ingresoPresupuesto) {
  return fetch(
    `${url}/ingresopresupuestal/consecutivo/?codigoinstitucioneducativa=${ingresoPresupuesto.institucioneducativaid.codigo}&consecutivo=${ingresoPresupuesto.consecutivo}`,
    {
      method: "PUT",
      body: JSON.stringify(ingresoPresupuesto),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarIngresoPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/ingresopresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarRecaudoPresupuesto = function (institucionEducativaCodigo) {
  return fetch(
    `${url}/recaudopresupuestal/?codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarRecaudoPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/recaudopresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarRecaudoPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/recaudopresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarRecaudoPresupuesto = function (recaudoPresupuestoDetalle) {
  return fetch(`${url}/recaudopresupuestal/`, {
    method: "POST",
    body: JSON.stringify(recaudoPresupuestoDetalle),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const actualizarRecaudoPresupuesto = function (recaudoPresupuesto) {
  return fetch(`${url}/recaudopresupuestal/consecutivo/?codigoinstitucioneducativa=${recaudoPresupuesto.institucioneducativaid.codigo}&consecutivo=${recaudoPresupuesto.consecutivo}`, {
    method: "PUT",
    body: JSON.stringify(recaudoPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const listarSolicitudPresupuesto = function (institucionEducativaCodigo) {
  return fetch(
    `${url}/solicitudpresupuestalcabecera/?codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarSolicitudPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/solicitudpresupuestalcabecera/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarSolicitudPresupuestoDetalle = function (
  institucionEducativaCodigo,
  consecutivo,
  id
) {
  return fetch(
    `${url}/solicitudpresupuestaldetalle/${id}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarSolicitudPresupuestoDetalle = function (
  solicitudPresupuestoDetalle
) {
  return fetch(`${url}/solicitudpresupuestaldetalle/`, {
    method: "POST",
    body: JSON.stringify(solicitudPresupuestoDetalle),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarSolicitudPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/solicitudpresupuestalcabecera/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarSolicitudPresupuesto = function (solicitudPresupuesto) {
  return fetch(`${url}/solicitudpresupuestalcabecera/`, {
    method: "POST",
    body: JSON.stringify(solicitudPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const actualizarSolicitudPresupuesto = function (solicitudPresupuesto) {
  return fetch(`${url}/solicitudpresupuestalcabecera/consecutivo/?codigoinstitucioneducativa=${solicitudPresupuesto.institucioneducativaid.codigo}&consecutivo=${solicitudPresupuesto.consecutivo}`, {
    method: "PUT",
    body: JSON.stringify(solicitudPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarRubroPresupuestoSaldo = function (
  institucionEducativaCodigo,
  rubroPresupuestoCodigo
) {
  return fetch(
    `${url}/rubropresupuestal/detalle/saldoporproyeccion/?codigoinstitucioneducativa=${institucionEducativaCodigo}&codigorubropresupuestal=${rubroPresupuestoCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const listarRubroPresupuestoProyeccion = function (institucionEducativaCodigo) {
  return fetch(
    `${url}/rubropresupuestal/detalle/proyectados/?codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    {
      method: "GET",
    }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const listarRubroPresupuestoSolicitud = function (institucionEducativaCodigo) {
  return fetch(
    `${url}/rubropresupuestal/detalle/solicitados/?codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    {
      method: "GET",
    }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const listarCertificadoPresupuesto = function (institucionEducativaCodigo) {
  return fetch(
    `${url}/certificadodisponibilidadpresupuestal/?codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarCertificadoPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/certificadodisponibilidadpresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarRubroPresupuestoSaldoSolicitud = function (
  institucionEducativaCodigo,
  rubroPresupuestoCodigo
) {
  return fetch(
    `${url}/rubropresupuestal/detalle/saldosolicitud/?codigoinstitucioneducativa=${institucionEducativaCodigo}&codigorubropresupuestal=${rubroPresupuestoCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarRubroPresupuestoSaldoRecaudo = function (
  institucionEducativaCodigo,
  rubroPresupuestoCodigo
) {
  return fetch(
    `${url}/rubropresupuestal/detalle/saldorecaudo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&codigorubropresupuestal=${rubroPresupuestoCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarCertificadoPresupuesto = function (certificadoPresupuesto) {
  return fetch(`${url}/certificadodisponibilidadpresupuestal/`, {
    method: "POST",
    body: JSON.stringify(certificadoPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const actualizarCertificadoPresupuesto = function (certificadoPresupuesto) {
  return fetch(`${url}/certificadodisponibilidadpresupuestal/`, {
    method: "PUT",
    body: JSON.stringify(certificadoPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarCertificadoPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/certificadodisponibilidadpresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarRegistroPresupuesto = function (institucionEducativaCodigo) {
  return fetch(
    `${url}/registropresupuestal/?codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarRegistroPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/registropresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarCertificadoPresupuestoSaldo = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/certificadodisponibilidadpresupuestal/consecutivo/saldo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarRegistroPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/registropresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarRegistroPresupuesto = function (registroPresupuesto) {
  return fetch(`${url}/registropresupuestal/`, {
    method: "POST",
    body: JSON.stringify(registroPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const listarObligacionPresupuesto = function (institucionEducativaCodigo) {
  return fetch(
    `${url}/obligacionpresupuestal/?codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarObligacionPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/obligacionpresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarRegistroPresupuestoSaldo = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/registropresupuestal/consecutivo/saldo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarObligacionPresupuesto = function (obligacionPresupuesto) {
  return fetch(`${url}/obligacionpresupuestal/`, {
    method: "POST",
    body: JSON.stringify(obligacionPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarObligacionPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/obligacionpresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarPagoPresupuesto = function (institucionEducativaCodigo) {
  return fetch(
    `${url}/pagopresupuestal/?codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarPagoPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/pagopresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarObligacionPresupuestoSaldo = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/obligacionpresupuestal/consecutivo/saldo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarPagoPresupuesto = function (pagoPresupuesto) {
  return fetch(`${url}/pagopresupuestal/`, {
    method: "POST",
    body: JSON.stringify(pagoPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarPagoPresupuesto = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/pagopresupuestal/consecutivo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const consultarModificacionPresupuesto = function (
  periodoCodigo,
  institucionEducativaCodigo
) {
  return fetch(
    `${url}/modificacionproyeccionpresupuestalcabecera/?codigoperiodo=${periodoCodigo}&codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarModificacionPresupuesto = function (proyeccionPresupuesto) {
  return fetch(`${url}/modificacionproyeccionpresupuestalcabecera/`, {
    method: "POST",
    body: JSON.stringify(proyeccionPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const actualizarModificacionPresupuesto = function (proyeccionPresupuesto) {
  return fetch(
    `${url}/modificacionproyeccionpresupuestalcabecera/?codigoperiodo=${proyeccionPresupuesto.periodoid.codigo}&codigoinstitucioneducativa=${proyeccionPresupuesto.institucioneducativaid.codigo}`,
    {
      method: "PUT",
      body: JSON.stringify(proyeccionPresupuesto),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarModificacionPresupuesto = function (
  periodoCodigo,
  institucionEducativaCodigo
) {
  return fetch(
    `${url}/modificacionproyeccionpresupuestalcabecera/?codigoperiodo=${periodoCodigo}&codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarModificacionPresupuestoDetalle = function (
  proyeccionPresupuestoDetalle
) {
  return fetch(`${url}/modificacionproyeccionpresupuestaldetalle/`, {
    method: "POST",
    body: JSON.stringify(proyeccionPresupuestoDetalle),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const eliminarModificacionPresupuestoDetalle = function (
  periodoCodigo,
  institucionEducativaCodigo,
  id,
) {
  return fetch(
    `${url}/modificacionproyeccionpresupuestaldetalle/${id}/?codigoperiodo=${periodoCodigo}&codigoinstitucioneducativa=${institucionEducativaCodigo}`,
    { method: "DELETE" }
  )
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const consultarSolicitudPresupuestoSaldo = function (
  institucionEducativaCodigo,
  consecutivo
) {
  return fetch(
    `${url}/solicitudpresupuestalcabecera/consecutivo/saldo/?codigoinstitucioneducativa=${institucionEducativaCodigo}&consecutivo=${consecutivo}`,
    { method: "GET" }
  )
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

export default {
  listarUsuario,
  consultarUsuario,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  listarInstitucionEducativa,
  insertarInstitucionEducativa,
  actualizarInstitucionEducativa,
  consultarInstitucionEducativa,
  consultarInstitucionEducativaPorUsuario,
  eliminarInstitucionEducativa,
  listarTipoContrato,
  eliminarTipoContrato,
  consultarTipoContrato,
  insertarTipoContrato,
  actualizarTipoContrato,
  listarTipoRecaudo,
  consultarTipoRecaudo,
  insertarTipoRecaudo,
  actualizarTipoRecaudo,
  eliminarTipoRecaudo,
  listarPersonalPlanta,
  consultarPersonalPlanta,
  insertarPersonalPlanta,
  actualizarPersonalPlanta,
  eliminarPersonalPlanta,
  listarFuenteRecurso,
  listarFuenteRecursoProyeccion,
  listarFuenteRecursoDetalle,
  consultarFuenteRecurso,
  consultarFuenteRecursoSaldo,
  consultarFuenteRecursoSaldoRecaudo,
  insertarFuenteRecurso,
  actualizarFuenteRecurso,
  eliminarFuenteRecurso,
  listarRubroPresupuesto,
  listarRubroPresupuestoDetalle,
  consultarRubroPresupuesto,
  insertarRubroPresupuesto,
  actualizarRubroPresupuesto,
  eliminarRubroPresupuesto,
  listarTipoIdentificacion,
  consultarTipoIdentificacion,
  eliminarTipoIdentificacion,
  insertarTipoIdentificacion,
  actualizarTipoIdentificacion,
  listarTercero,
  consultarTercero,
  insertarTercero,
  actualizarTercero,
  eliminarTercero,
  listarPeriodo,
  listarPeriodoActivos,
  consultarPeriodo,
  eliminarPeriodo,
  insertarPeriodo,
  actualizarPeriodo,
  consultarProyeccionPresupuesto,
  eliminarProyeccionPresupuesto,
  aprobarProyeccionPresupuesto,
  insertarProyeccionPresupuesto,
  actualizarProyeccionPresupuesto,
  insertarProyeccionPresupuestoDetalle,
  insertarProyeccionPresupuestoDetalleMultiple,
  eliminarProyeccionPresupuestoDetalle,
  eliminarProyeccionPresupuestoDetalleMultiple,
  listarIngresoPresupuesto,
  consultarIngresoPresupuesto,
  consultarIngresoPresupuestoSaldo,
  insertarIngresoPresupuesto,
  actualizarIngresoPresupuesto,
  eliminarIngresoPresupuesto,
  listarRecaudoPresupuesto,
  consultarRecaudoPresupuesto,
  eliminarRecaudoPresupuesto,
  insertarRecaudoPresupuesto,
  actualizarRecaudoPresupuesto,
  listarSolicitudPresupuesto,
  consultarSolicitudPresupuesto,
  eliminarSolicitudPresupuestoDetalle,
  insertarSolicitudPresupuestoDetalle,
  eliminarSolicitudPresupuesto,
  obtenerFechaActual,
  insertarSolicitudPresupuesto,
  actualizarSolicitudPresupuesto,
  consultarRubroPresupuestoSaldo,
  listarRubroPresupuestoProyeccion,
  listarRubroPresupuestoSolicitud,
  listarCertificadoPresupuesto,
  consultarCertificadoPresupuesto,
  consultarRubroPresupuestoSaldoSolicitud,
  consultarRubroPresupuestoSaldoRecaudo,
  insertarCertificadoPresupuesto,
  actualizarCertificadoPresupuesto,
  eliminarCertificadoPresupuesto,
  listarRegistroPresupuesto,
  consultarRegistroPresupuesto,
  consultarCertificadoPresupuestoSaldo,
  eliminarRegistroPresupuesto,
  insertarRegistroPresupuesto,
  listarObligacionPresupuesto,
  consultarObligacionPresupuesto,
  consultarRegistroPresupuestoSaldo,
  insertarObligacionPresupuesto,
  eliminarObligacionPresupuesto,
  listarPagoPresupuesto,
  consultarPagoPresupuesto,
  consultarObligacionPresupuestoSaldo,
  insertarPagoPresupuesto,
  eliminarPagoPresupuesto,
  consultarModificacionPresupuesto,
  insertarModificacionPresupuesto,
  actualizarModificacionPresupuesto,
  eliminarModificacionPresupuesto,
  insertarModificacionPresupuestoDetalle,
  eliminarModificacionPresupuestoDetalle,
  consultarSolicitudPresupuestoSaldo,
};
