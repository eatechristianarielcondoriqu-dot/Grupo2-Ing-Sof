-- ============================================================
-- Unidad Educativa Los Andes - Portal de Estudiantes
-- Script de base de datos para PostgreSQL (Neon)
-- ============================================================

-- Limpieza opcional (úsalo solo si quieres reiniciar todo)
-- DROP TABLE IF EXISTS estudiantes;
-- DROP TABLE IF EXISTS usuarios;

-- ------------------------------------------------------------
-- Tabla 1: usuarios (login del personal del colegio)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id              SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    usuario         VARCHAR(50)  UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    rol             VARCHAR(30)  NOT NULL DEFAULT 'docente',
    activo          BOOLEAN      NOT NULL DEFAULT TRUE,
    creado_en       TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Tabla 2: estudiantes
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS estudiantes (
    id                      SERIAL PRIMARY KEY,
    nombre_completo         VARCHAR(150) NOT NULL,
    curso                   VARCHAR(40)  NOT NULL,
    paralelo                VARCHAR(5)   NOT NULL,
    fecha_nacimiento        DATE,
    representante           VARCHAR(150),
    telefono_representante  VARCHAR(20),
    creado_en               TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Datos de prueba: usuarios
-- Contraseñas en texto plano (solo para que tú las uses al probar):
--   admin       -> admin123
--   mquispe     -> secretaria2026
-- Las contraseñas están guardadas como hash bcrypt, NUNCA en texto plano.
-- ------------------------------------------------------------
INSERT INTO usuarios (nombre_completo, usuario, password_hash, rol) VALUES
('Administrador del Sistema', 'admin',   '$2y$10$URD56ywtMs0EiwkMeQySHObH9R7Am3jM2hR6MRr8tymoPVk3w9uW6', 'administrador'),
('María Fernanda Quispe',     'mquispe', '$2y$10$tORseGZTZWSF0.yKfd/jeuQVVXRvxkzMg3Ivw/kH1COkwNzZhoao.', 'secretaria')
ON CONFLICT (usuario) DO NOTHING;

-- ------------------------------------------------------------
-- Datos de prueba: estudiantes
-- ------------------------------------------------------------
INSERT INTO estudiantes (nombre_completo, curso, paralelo, fecha_nacimiento, representante, telefono_representante) VALUES
('Juan Pablo Mamani Rojas',        '5to de Primaria',    'A', '2015-03-12', 'Rosa Rojas',   '70011223'),
('Ana Lucía Choque Flores',        '5to de Primaria',    'A', '2015-07-22', 'Pedro Choque', '70022334'),
('Daniel Alejandro Vargas Quispe', '6to de Primaria',    'B', '2014-01-05', 'Lucía Quispe', '70033445'),
('Camila Sofía Apaza Mamani',      '1ro de Secundaria',  'A', '2013-11-30', 'Marco Apaza',  '70044556'),
('Sebastián Eduardo Ticona Loza',  '2do de Secundaria',  'B', '2012-09-18', 'Elena Loza',   '70055667'),
('Valentina Nicole Condori Paz',   '3ro de Secundaria',  'A', '2011-05-09', 'Hugo Condori', '70066778');
