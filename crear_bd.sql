-- Crear base de datos (si no existe) y usarla
CREATE DATABASE IF NOT EXISTS vacaciones_db;
USE vacaciones_db;

-- TABLA Trabajador
CREATE TABLE Trabajador (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  ci            VARCHAR(20) NOT NULL UNIQUE,
  nombre        VARCHAR(100) NOT NULL,
  fecha_ingreso DATE NOT NULL,
  area          VARCHAR(100) NOT NULL,
  cargo         VARCHAR(100) NOT NULL,
  is_admin      BOOLEAN NOT NULL DEFAULT 0
);

-- TABLA PoliticaVacaciones
CREATE TABLE PoliticaVacaciones (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  min_anios     INT NOT NULL,
  max_anios     INT NULL,
  dias_por_anio INT NOT NULL
);

-- TABLA SaldoVacaciones
CREATE TABLE SaldoVacaciones (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  trabajador_id    INT NOT NULL,
  anio             INT NOT NULL,
  dias_acumulados  INT NOT NULL DEFAULT 0,
  dias_usados      INT NOT NULL DEFAULT 0,
  dias_disponibles INT NOT NULL DEFAULT 0,
  UNIQUE (trabajador_id, anio),
  FOREIGN KEY (trabajador_id) REFERENCES Trabajador(id)
);

-- TABLA Solicitud
CREATE TABLE Solicitud (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  trabajador_id    INT NOT NULL,
  fecha_solicitud  DATE NOT NULL,
  fecha_decision   DATE NULL,
  dias             INT NOT NULL DEFAULT 0,
  horas            INT NOT NULL DEFAULT 0,
  fecha_inicio     DATE NOT NULL,
  fecha_fin        DATE NOT NULL,
  estado           ENUM('PENDIENTE', 'APROBADA', 'RECHAZADA') NOT NULL DEFAULT 'PENDIENTE',
  motivo           VARCHAR(255) NULL,
  aprobador_id     INT NULL,
  comentario_admin VARCHAR(255) NULL,
  FOREIGN KEY (trabajador_id) REFERENCES Trabajador(id),
  FOREIGN KEY (aprobador_id) REFERENCES Trabajador(id)
);
