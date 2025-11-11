let trabajadores = [
  {
    id: 1,
    ci: '1111111',
    nombre: 'Juan Dilan',
    fecha_ingreso: '2021-05-16',
    area: 'Transformacion Digital',
    cargo: 'Desarrollador',
    is_admin: false,
  },
  {
    id: 2,
    ci: '2222222',
    nombre: 'Juan Admin',
    fecha_ingreso: '2018-11-18',
    area: 'RRHH',
    cargo: 'Jefe de RRHH',
    is_admin: true,
  },
];

let solicitudes = [];
let saldosVacaciones = [];

// --- Tabla PoliticaVacaciones ---
let politicasVacaciones = [
  {
    id: 1,
    min_anios: 0,
    max_anios: 4,
    dias_por_anio: 15, 
  },
  {
    id: 2,
    min_anios: 5,
    max_anios: 9,
    dias_por_anio: 20,
  },
  {
    id: 3,
    min_anios: 10,
    max_anios: null,
    dias_por_anio: 25, 
  },
];


module.exports = {
  trabajadores,
  solicitudes,
  saldosVacaciones,
  politicasVacaciones,
};