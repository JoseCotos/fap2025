use DBFAP
go

SELECT * FROM paciente;
DELETE FROM paciente;

-- Tabla: paciente
SET IDENTITY_INSERT paciente ON;
INSERT INTO paciente (id_paciente, tipo_documento, numero_documento, nombre, apellido, correo, telefono, direccion, fecha_nacimiento, genero) VALUES
(1, 'DNI', '45678901', 'Ana', 'Torres', 'ana.torres@gmail.com', '987654321', 'Av. Perú 123', '1990-06-15', 'F'),
(2, 'DNI', '12345678', 'Juan', 'Pérez', 'juan.perez@hotmail.com', '923456789', 'Jr. Los Pinos 450', '1985-11-22', 'M');
SET IDENTITY_INSERT paciente OFF;
GO

-- Tabla: usuario
SET IDENTITY_INSERT usuario ON;
INSERT INTO usuario (id_usuario, id_paciente, clave_hash, fecha_ultimo_acceso, activo) VALUES
(1, 1, 'hash123ana', '2025-05-13',1),
(2, 2, 'hash456juan', '2025-05-14',1);
SET IDENTITY_INSERT usuario OFF;
GO

-- Tabla: especialidad_medica
SET IDENTITY_INSERT especialidad_medica ON;
INSERT INTO especialidad_medica (id_especialidad, nombre, descripcion) VALUES
(1, 'Pediatría', 'Atención médica para niños'),
(2, 'Cardiología', 'Especialista en el corazón');
SET IDENTITY_INSERT especialidad_medica OFF;
GO

-- Tabla: medico
SET IDENTITY_INSERT medico ON;
INSERT INTO medico (id_medico, id_especialidad, nombre, apellido, telefono_contacto) VALUES
(1, 1, 'Laura', 'Silva', '987321654'),
(2, 2, 'Marcos', 'Díaz', '912345678');
SET IDENTITY_INSERT medico OFF;
GO

-- Tabla: medico_disponibilidad
SET IDENTITY_INSERT medico_disponibilidad ON;
INSERT INTO medico_disponibilidad (id_disponibilidad, id_medico, fecha, hora, activo) VALUES
(1, 1, '2025-05-16', '09:00', 1),
(2, 1, '2025-05-16', '10:00', 1),
(3, 2, '2025-05-17', '08:30', 1),
(4, 1, '2025-05-16', '09:00', 0),
(5, 1, '2025-05-18', '10:00', 0),
(6, 2, '2025-05-17', '08:30', 0);
SET IDENTITY_INSERT medico_disponibilidad OFF;
GO

-- Tabla: cita_medica
SET IDENTITY_INSERT cita_medica ON;
INSERT INTO cita_medica (id_cita, id_paciente, id_medico, tipo, fecha, hora, estado, motivo_consulta) VALUES
(1, 1, 1, 'PRESENCIAL', '2025-05-16', '09:00', 'CONFIRMADO', 'Dolor de estómago'),
(2, 2, 2, 'VIRTUAL', '2025-05-17', '08:30', 'RESERVADO', 'Control de presión arterial'),
(3, 1, 1, 'PRESENCIAL', '2025-05-18', '10:00', 'RESERVADO', 'Reprogramación');
SET IDENTITY_INSERT cita_medica OFF;
GO

-- Tabla: notificacion
SET IDENTITY_INSERT notificacion ON;
INSERT INTO notificacion (id_notificacion, id_cita, fecha_envio, tipo, motivo, estado_envio, mensaje) VALUES
(1, 1, '2025-05-15', 'CORREO', 'CITA', 'ENVIADO', 'Recordatorio de cita médica'),
(2, 2, '2025-05-16', 'SMS', 'CITA', 'PENDIENTE', 'Su cita está pendiente de confirmación');
SET IDENTITY_INSERT notificacion OFF;
GO

select * from paciente;
go

select * from usuario;
go

select * from especialidad_medica;
go

select * from medico;
go

select * from cita_medica;
go

select * from notificacion;
go

select * from reprogramacion;
go

select * from medico_disponibilidad;
go
