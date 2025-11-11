const express = require('express');
const app = express();
const PORT = 5000;

// Importar los datos en memoria
const {
  trabajadores,
  solicitudes,
  saldosVacaciones,
} = require('./data');

app.use(express.json());

// ENDPOINT DE PRUEBA EN LA RAÍZ
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API de Vacaciones funcionando' });
});

// Solicitud de Vacaciones
app.post('/solicitudes', (req, res) => {
  const {
    trabajador_id,
    fecha_inicio,
    fecha_fin,
    dias,
    horas,
    motivo,
  } = req.body;

  // Verificar que el trabajador exista
  const trabajador = trabajadores.find(t => t.id === trabajador_id);
  if (!trabajador) {
    return res.status(404).json({ error: 'El trabajador no se encuentra en nuestra base de datos' });
  }

  // Validar días/horas
  const diasVal = dias ?? 0;
  const horasVal = horas ?? 0;

  if (diasVal <= 0 && horasVal <= 0) {
    return res
      .status(400)
      .json({ error: 'La solicitud debe ser mínimamente de una hora' });
  }

  // Crear nueva solicitud
  const nuevaSolicitud = {
    id: solicitudes.length + 1,
    trabajador_id,
    fecha_solicitud: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
    fecha_decision: null,
    dias: diasVal,
    horas: horasVal,
    fecha_inicio,
    fecha_fin,
    estado: 'PENDIENTE',
    motivo: motivo || null,
    aprobador_id: null,
  };

  solicitudes.push(nuevaSolicitud);

  return res.status(201).json(nuevaSolicitud);
});



// APROBAR SOLICITUD
app.patch('/solicitudes/:id/aprobar', (req, res) => {
  const solicitudId = parseInt(req.params.id, 10);
  const { aprobador_id, comentario } = req.body;

  // Buscar solicitud
  const solicitud = solicitudes.find(s => s.id === solicitudId);
  if (!solicitud) {
    return res.status(404).json({ error: 'Solicitud no encontrada' });
  }

  if (solicitud.estado !== 'PENDIENTE') {
    return res
      .status(400)
      .json({ error: 'Solo se pueden aprobar solicitudes en estado PENDIENTE' });
  }

  // Verificar aprobador
  const aprobador = trabajadores.find(t => t.id === aprobador_id);
  if (!aprobador) {
    return res
      .status(403)
      .json({ error: 'No se encontró a su superior en la base de datos de trabajadores' });
  }

  // Actualizar estado
  solicitud.estado = 'APROBADA';
  solicitud.fecha_decision = new Date().toISOString().slice(0, 10);
  solicitud.aprobador_id = aprobador_id;

  return res.json(solicitud);
});

// RECHAZAR SOLICITUD
app.patch('/solicitudes/:id/rechazar', (req, res) => {
  const solicitudId = parseInt(req.params.id, 10);
  const { aprobador_id, comentario } = req.body;

  // Buscar solicitud
  const solicitud = solicitudes.find(s => s.id === solicitudId);
  if (!solicitud) {
    return res.status(404).json({ error: 'Solicitud no encontrada' });
  }

  if (solicitud.estado !== 'PENDIENTE') {
    return res
      .status(400)
      .json({ error: 'Solo se pueden rechazar solicitudes en estado PENDIENTE' });
  }

  // Verificar aprobador
  const aprobador = trabajadores.find(t => t.id === aprobador_id);
  if (!aprobador) {
    return res
      .status(403)
      .json({ error: 'No se encontró a su superior en la base de datos de trabajadores' });
  }

  // Actualizar estado
  solicitud.estado = 'RECHAZADA';
  solicitud.fecha_decision = new Date().toISOString().slice(0, 10);
  solicitud.aprobador_id = aprobador_id;

  return res.json(solicitud);
});

// HISTORIAL DE SOLICITUDES DE UN TRABAJADOR
app.get('/trabajadores/:id/solicitudes', (req, res) => {
  const trabajadorId = parseInt(req.params.id, 10);

  const trabajador = trabajadores.find(t => t.id === trabajadorId);
  if (!trabajador) {
    return res.status(404).json({ error: 'Trabajador no encontrado' });
  }

  const historial = solicitudes.filter(s => s.trabajador_id === trabajadorId);
  return res.json({
    trabajador,
    solicitudes: historial,
  });
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
