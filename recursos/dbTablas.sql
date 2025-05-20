use master
go

create database DBFAP
go

use DBFAP
go

create table paciente(
    id_paciente int PRIMARY KEY IDENTITY(1,1),
    tipo_documento varchar(10), /* DNI, CE, PASS */
    numero_documento varchar(20),
    nombre varchar(100),
    apellido varchar(100),
    correo varchar(100),
    telefono varchar(20),
    direccion varchar(200),
    fecha_nacimiento date,
    genero char(1) /* F, M */
)
go

create table usuario(
    id_usuario int PRIMARY KEY IDENTITY(1,1),
    id_paciente int,
    clave_hash varchar(200),
    fecha_ultimo_acceso datetime,
    activo bit,
    CONSTRAINT fkUsuPac FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente)
)
go

create table especialidad_medica(
    id_especialidad int PRIMARY KEY IDENTITY(1,1),
    nombre varchar(50),
    descripcion varchar(200)
)
go

create table medico(
    id_medico int PRIMARY KEY IDENTITY(1,1),
    id_especialidad int,
    nombre varchar(100),
    apellido varchar(100),
    telefono_contacto varchar(20),
    CONSTRAINT fkMedEsp FOREIGN KEY (id_especialidad) REFERENCES especialidad_medica(id_especialidad)
)
go

create table cita_medica(
    id_cita int PRIMARY KEY IDENTITY(1,1),
    id_paciente int,
    id_medico int,
    tipo varchar(10), /* PRESENCIAL, VIRTUAL */
    fecha date,
    hora varchar(10),
    estado varchar(20), /* RESERVADO, CONFIRMADO, CANCELADO, PRESENTE, AUSENTE */
    motivo_consulta varchar(200),
    CONSTRAINT fkCitaPac FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
    CONSTRAINT fkCitaMed FOREIGN KEY (id_medico) REFERENCES medico(id_medico)
)
go

create table notificacion(
    id_notificacion int PRIMARY KEY IDENTITY(1,1),
    id_cita int,
    fecha_envio datetime,
    tipo varchar(10), /* SMS, CORREO */
    motivo varchar(20), /* CITA, REPROGRAMACION */
    estado_envio varchar(20), /* PENDIENTE, ENVIADO, FALLIDO */
    mensaje varchar(200),
    CONSTRAINT fkNotCita FOREIGN KEY (id_cita) REFERENCES cita_medica(id_cita)
)
go

create table reprogramacion(
    id_reprogramacion int PRIMARY KEY IDENTITY(1,1),
    id_cita_original int,
    id_cita_nueva int,
    fecha_solicitud datetime,
    motivo_reprogramacion varchar(200),
    CONSTRAINT fkRepCitaOri FOREIGN KEY (id_cita_original) REFERENCES cita_medica(id_cita),
    CONSTRAINT fkRepCitaNue FOREIGN KEY (id_cita_nueva) REFERENCES cita_medica(id_cita)
)
go

create table medico_disponibilidad(
    id_disponibilidad int PRIMARY KEY IDENTITY(1,1),
    id_medico int,
    fecha date,
    hora varchar(10),
    activo bit,
    CONSTRAINT fkDisMed FOREIGN KEY (id_medico) REFERENCES medico(id_medico)
)
go

select * from sys.tables
go