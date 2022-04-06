-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-04-2022 a las 02:57:08
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dlc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `nombre_area` varchar(130) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id_area`, `nombre_area`) VALUES
(1, 'Marketing operaciones'),
(2, 'Marketing Comercial'),
(3, 'Infraestructura'),
(4, 'Optimización e Inteligencia'),
(5, 'Impúlsate'),
(6, 'Dirección Regulatorios'),
(7, 'Asuntos Regulatorios'),
(8, 'Recursos Humanos'),
(9, 'Proyectos Estratégicos'),
(10, 'NatDev');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `no_empleado` varchar(130) NOT NULL,
  `ng_blocks_restantes` int(6) DEFAULT NULL,
  `fecha_contratacion` date DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `correo_empresarial` varchar(130) NOT NULL,
  `nombres_empleados` varchar(200) DEFAULT NULL,
  `apellido_paterno` varchar(130) DEFAULT NULL,
  `apellido_materno` varchar(130) DEFAULT NULL,
  `dias_vacaciones_restantes` int(23) DEFAULT NULL,
  `genero_empleado` varchar(130) DEFAULT NULL,
  `id_area` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`no_empleado`, `ng_blocks_restantes`, `fecha_contratacion`, `fecha_nacimiento`, `correo_empresarial`, `nombres_empleados`, `apellido_paterno`, `apellido_materno`, `dias_vacaciones_restantes`, `genero_empleado`, `id_area`) VALUES
('A1', 5, '2010-08-09', '2021-03-02', 'a01705001@natgas.com.mx', 'Óscar Eduardo', 'Nieto', 'Espitia', 11, 'M', 1),
('A10', 4, '2015-07-21', '1967-07-18', 'a01705011@natgas.com.mx', 'Adelina', 'Llanos', 'Sanmartín', 23, 'F', 10),
('A11', 4, '2015-11-24', '1968-12-05', 'a01705012@natgas.com.mx', 'Ciríaco', 'Tejero', 'Gimeno', 1, 'M', 1),
('A12', 2, '2016-06-29', '1971-12-24', 'a01705013@natgas.com.mx', 'Iris', 'Gomis', 'Batlle', 0, 'F', 2),
('A13', 2, '2016-08-01', '1975-11-26', 'a01705014@natgas.com.mx', 'Rita', 'Corral', 'Pallarès', 2, 'F', 3),
('A14', 1, '2016-11-23', '1980-03-20', 'a01705015@natgas.com.mx', 'Amando', 'Roselló', 'Ballester', 5, 'M', 4),
('A15', 1, '2017-03-12', '1982-05-09', 'a01705016@natgas.com.mx', 'Mayte', 'Canals', 'Carbonell', 9, 'M', 5),
('A16', 3, '2017-04-22', '1982-09-27', 'a01705017@natgas.com.mx', 'Chelo', 'Coca', 'Mascaró', 18, 'M', 6),
('A17', 3, '2018-01-31', '2021-03-02', 'a01705018@natgas.com.mx', 'Teresita', 'Castañeda', 'Barba', 12, 'F', 7),
('A18', 3, '2018-07-15', '1985-06-11', 'a01705019@natgas.com.mx', 'Pascuala', 'Collado', 'Royo', 18, 'F', 8),
('A19', 5, '2018-09-28', '1993-03-17', 'a01705020@natgas.com.mx', 'Zoraida', 'Criado', 'Zabala', 6, 'F', 9),
('A2', 4, '2012-02-26', '1945-05-28', 'a01705002@natgas.com.mx', 'Dalila', 'Azcona', 'Garrido', 9, 'F', 2),
('A20', 4, '2019-08-24', '1996-05-01', 'a01705021@natgas.com.mx', 'Benita', 'Martin', 'Zabala', 4, 'F', 10),
('A21', 3, '2019-12-03', '1996-05-11', 'a01705022@natgas.com.mx', 'Yolanda', 'Urrutia', 'Bas', 3, 'F', 1),
('A22', 2, '2020-05-04', '1998-10-31', 'a01705023@natgas.com.mx', 'Dorita', 'Lastra', 'Rosales', 21, 'F', 2),
('A23', 2, '2020-08-15', '1999-11-16', 'a01705024@natgas.com.mx', 'Perla', 'Alcaraz', 'Sotelo', 3, 'F', 3),
('A24', 5, '2021-01-10', '2001-02-20', 'a01705025@natgas.com.mx', 'Fidel', 'Girón', 'Román', 5, 'M', 4),
('A25', 0, '2010-07-05', '2001-03-09', 'a01705026@natgas.com.mx', 'Ligia', 'Alcázar', 'Arribas', 7, 'F', 5),
('A26', 0, '2010-11-29', '2001-04-30', 'a01705027@natgas.com.mx', 'Ulises', 'Villa', 'Castell', 18, 'M', 6),
('A27', 0, '2011-04-10', '2003-03-09', 'a01705028@natgas.com.mx', 'Sara', 'Muñoz', 'Amaya', 19, 'F', 7),
('A28', 1, '2011-04-16', '1943-12-11', 'a01705029@natgas.com.mx', 'Trinidad', 'Calleja', 'Jaén', 2, 'F', 8),
('A29', 2, '2011-12-31', '1946-04-07', 'a01705030@natgas.com.mx', 'Gervasio', 'Bermúdez', 'Aguiló', 1, 'M', 9),
('A3', 3, '2012-07-10', '1946-12-15', 'a01705003@natgas.com.mx', 'Perlita', 'Calzada', 'Lladó', 12, 'F', 3),
('A30', 3, '2021-03-02', '1947-03-10', 'a01705031@natgas.com.mx', 'Salomé', 'Madrid', 'Vega', 22, 'M', 10),
('A31', 4, '2012-11-22', '1947-05-10', 'a01705032@natgas.com.mx', 'Angelina', 'Romeu', 'Jiménez', 21, 'F', 1),
('A32', 5, '2012-12-02', '1949-01-18', 'a01705033@natgas.com.mx', 'Yaiza', 'Saldaña', 'Salom', 20, 'F', 2),
('A33', 0, '2013-06-17', '1951-03-31', 'a01705034@natgas.com.mx', 'Fortunato', 'Arellano', 'Menéndez', 19, 'M', 3),
('A34', 0, '2013-07-25', '1953-09-19', 'a01705035@natgas.com.mx', 'Alma', 'Marcela', 'Gozo', 18, 'F', 4),
('A35', 0, '2013-10-25', '1958-06-14', 'a01705036@natgas.com.mx', 'Rosa', 'Melan', 'Ortiz', 17, 'F', 5),
('A36', 1, '2014-11-13', '1962-09-20', 'a01705037@natgas.com.mx', 'Florinda', 'Blazquez', 'Torrijos', 16, 'F', 6),
('A37', 5, '2014-12-01', '1964-01-19', 'a01705038@natgas.com.mx', 'Octavia', 'Robledo', 'Caro', 15, 'F', 7),
('A38', 5, '2015-01-10', '1966-05-28', 'a01705039@natgas.com.mx', 'Luis Ángel', 'Bayón', 'Posada', 14, 'M', 8),
('A39', 5, '2015-05-03', '1970-07-13', 'a01704040@natgas.com.mx', 'Nazaret', 'Pino', 'Palma', 13, 'M', 9),
('A4', 2, '2013-07-11', '1950-05-02', 'a01705004@natgas.com.mx', 'América', 'Paz', 'Álvarez', 12, 'F', 4),
('A40', 3, '2015-09-03', '1973-03-16', 'a01703041@natgas.com.mx', 'Julio', 'Alberto', 'Gil', 12, 'M', 10),
('A41', 3, '2017-03-06', '1974-04-04', 'a01700089@natgas.com.mx', 'Mónica', 'Hoz', 'Guillén', 11, 'F', 1),
('A42', 2, '2018-12-30', '1977-11-04', 'a01700090@natgas.com.mx', 'Eros Giovanni', 'Guillén', 'Velazquez', 10, 'F', 2),
('A43', 1, '2019-08-08', '1977-11-07', 'a01700091@natgas.com.mx', 'Margarita', 'Segovia', 'Solano', 9, 'M', 3),
('A44', 2, '2019-11-02', '1978-05-12', 'a01700092@natgas.com.mx', 'Ariadna', 'Amores', 'Perelló', 8, 'F', 4),
('A45', 4, '2019-11-08', '1982-11-20', 'a01700093@natgas.com.mx', 'Eugenio', 'Iglesia', 'Cadenas', 7, 'M', 5),
('A46', 3, '2019-11-25', '1988-02-29', 'a01700094@natgas.com.mx', 'Macarena', 'Larrea', 'Jimenez', 6, 'F', 6),
('A47', 1, '2021-03-01', '1993-10-25', 'a01700097@natgas.com.mx', 'Simón Jacobo', 'Cuevas', 'Coronado', 5, 'M', 7),
('A48', 2, '2020-10-08', '1989-08-07', 'a01700095@natgas.com.mx', 'Dulce', 'Hidalgo', 'Cañizares', 4, 'F', 8),
('A49', 5, '2021-02-14', '1991-03-01', 'a01700096@natgas.com.mx', 'Yaiza Agustina', 'Suarez', 'Segarra', 3, 'F', 9),
('A5', 1, '2013-09-15', '1951-09-29', 'a01705005@natgas.com.mx', 'Trinidad', 'Vazquez', 'Mate', 12, 'F', 5),
('A50', 2, '2021-03-02', '1996-02-16', 'a01700098@natgas.com.mx', 'José Ernesto', 'Mora', 'Anguita', 2, 'M', 10),
('A6', 0, '2014-02-10', '1958-03-12', 'a01705006@natgas.com.mx', 'Crescencia', 'Botella', 'Sola', 23, 'F', 6),
('A7', 5, '2014-04-06', '1958-07-31', 'a01705007@natgas.com.mx', 'Antonia', 'Torrijos', 'Robles', 14, 'F', 7),
('A8', 5, '2014-08-25', '1960-06-05', 'a01705008@natgas.com.mx', 'Natanael', 'Morillo', 'Ramos', 12, 'M', 8),
('A9', 3, '2015-04-09', '1964-03-20', 'a01705009@natgas.com.mx', 'Fulgencio', 'Rocha', 'Ribera', 13, 'M', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ng_block`
--

CREATE TABLE `ng_block` (
  `id_ng_block` int(11) NOT NULL,
  `turno_ng_block` varchar(130) DEFAULT NULL,
  `descripcion_ng_block` varchar(130) DEFAULT NULL,
  `fecha_uso_ng_block` date DEFAULT NULL,
  `fecha_solicitud_ng_block` date DEFAULT current_timestamp(),
  `estatus_ng_block` varchar(20) DEFAULT 'Pendiente',
  `no_empleado` varchar(130) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ng_block`
--

INSERT INTO `ng_block` (`id_ng_block`, `turno_ng_block`, `descripcion_ng_block`, `fecha_uso_ng_block`, `fecha_solicitud_ng_block`, `estatus_ng_block`, `no_empleado`) VALUES
(1, 'Matutino', 'Tengo que ir al médico', '2022-02-10', '2022-04-01', 'Pendiente', 'A5'),
(2, 'Matutino', 'Problemas personales.', '2022-02-15', '2022-04-01', 'Aprobado', 'A49'),
(3, 'Matutino', 'Emergencia familiar.', '2022-03-22', '2022-04-01', 'Aprobado', 'A48'),
(4, 'Matutino', 'Tengo que recoger a mis hijos.', '2022-04-22', '2022-04-01', 'Aprobado', 'A47'),
(5, 'Matutino', 'Un familiar ha fallecido.', '2022-06-07', '2022-04-01', 'Aprobado', 'A46'),
(6, 'Matutino', 'Mi mascota está enferma.', '2022-06-15', '2022-04-01', 'Pendiente', 'A45'),
(7, 'Matutino', 'Mi coche se averió.', '2022-06-27', '2022-04-01', 'Aprobado', 'A44'),
(8, 'Matutino', 'Estoy enfermo.', '2022-06-29', '2022-04-01', 'Pendiente', 'A43'),
(9, 'Matutino', 'Tengo una cita con el doctor', '2022-07-08', '2022-04-01', 'Aprobado', 'A42'),
(10, 'Matutino', 'Tengo la menstruación.', '2022-07-19', '2022-04-01', 'Rechazado', 'A41'),
(11, 'Vespertino', 'Mi pareja tuvo un accidente', '2022-08-09', '2022-04-01', 'Aprobado', 'A31'),
(12, 'Vespertino', 'Un pariente está de visita', '2022-08-15', '2022-04-01', 'Pendiente', 'A22'),
(13, 'Vespertino', 'Tuve un incendio en mi apartamento', '2022-02-10', '2022-04-01', 'Aprobado', 'A13'),
(14, 'Vespertino', 'Voy al partido de los gallos vs atlas', '2022-08-22', '2022-04-01', 'Rechazado', 'A14'),
(15, 'Vespertino', 'Tengo que ir a una boda', '2022-09-02', '2022-04-01', 'Aprobado', 'A15'),
(16, 'Vespertino', 'Me asaltaron en la calle en Tamaulipas.', '2022-09-09', '2022-04-01', 'Rechazado', 'A2'),
(17, 'Vespertino', 'Me quedé encerrado en casa', '2022-09-23', '2022-04-01', 'Pendiente', 'A9'),
(18, 'Vespertino', 'Es el cumpleaños de mi hijo', '2022-09-29', '2022-04-01', 'Aprobado', 'A7'),
(19, 'Vespertino', 'Tengo sintomas de covid”', '2022-10-06', '2022-04-01', 'Rechazado', 'A21'),
(20, 'Vespertino', 'Tengo que ir al recital de mi hija', '2022-10-18', '2022-04-01', 'Rechazado', 'A20'),
(21, 'Vespertino', 'adadas', '2022-04-05', '2022-04-04', 'Pendiente', 'A4'),
(22, 'Matutino', 'adadsa', '2022-04-05', '2022-04-04', 'Pendiente', 'A4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticia`
--

CREATE TABLE `noticia` (
  `id_noticia` int(11) NOT NULL,
  `imagen_noticia` varchar(300) DEFAULT NULL,
  `fecha_noticia` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `noticia`
--

INSERT INTO `noticia` (`id_noticia`, `imagen_noticia`, `fecha_noticia`) VALUES
(1, 'https://i.ibb.co/9yk4DH7/image.png', '2022-03-16'),
(2, 'https://i.ibb.co/9yk4DH7/image.png', '2022-03-17'),
(3, 'https://i.ibb.co/9yk4DH7/image.png', '2022-03-15'),
(4, 'https://i.ibb.co/9yk4DH7/image.png', '2022-03-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso_informal`
--

CREATE TABLE `permiso_informal` (
  `id_permiso_informal` int(11) NOT NULL,
  `min_permiso_informal` int(11) DEFAULT NULL,
  `permisos_anio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `permiso_informal`
--

INSERT INTO `permiso_informal` (`id_permiso_informal`, `min_permiso_informal`, `permisos_anio`) VALUES
(1, 0, 5),
(2, 0, 6),
(3, 0, 7),
(4, 0, 8),
(5, 0, 9),
(6, 0, 10),
(7, 0, 11),
(8, 0, 12),
(9, 0, 13),
(10, 0, 14),
(11, 0, 15),
(12, 0, 16),
(13, 0, 17),
(14, 0, 18),
(15, 0, 19),
(16, 0, 20),
(17, 0, 21),
(18, 0, 22),
(19, 0, 23),
(20, 0, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestaciones`
--

CREATE TABLE `prestaciones` (
  `id_prestaciones` int(11) NOT NULL,
  `min_prestaciones` int(11) DEFAULT NULL,
  `max_prestaciones` int(11) DEFAULT NULL,
  `dias_prestaciones` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `prestaciones`
--

INSERT INTO `prestaciones` (`id_prestaciones`, `min_prestaciones`, `max_prestaciones`, `dias_prestaciones`) VALUES
(1, 1, 1, 8),
(2, 2, 2, 10),
(3, 3, 3, 12),
(4, 4, 4, 14),
(5, 9, 5, 16),
(6, 14, 10, 18),
(7, 19, 15, 20),
(8, 24, 20, 22),
(9, 29, 25, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

CREATE TABLE `publicacion` (
  `id_publicacion` int(11) NOT NULL,
  `titulo_publicacion` varchar(50) DEFAULT NULL,
  `descripcion_publicacion` varchar(300) DEFAULT NULL,
  `imagen_publicacion` varchar(300) DEFAULT NULL,
  `fecha_publicacion` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `publicacion`
--

INSERT INTO `publicacion` (`id_publicacion`, `titulo_publicacion`, `descripcion_publicacion`, `imagen_publicacion`, `fecha_publicacion`) VALUES
(1, 'Curso de Inglés', 'Inscribite a los cursos de inglés', 'https://art.pixilart.com/thumb/adc680302f5c8a3.png', '2022-04-01'),
(2, 'Limpieza dental', 'Lorem Ipsum', 'https://art.pixilart.com/thumb/adc680302f5c8a3.png', '2022-04-01'),
(3, 'Día del padre', 'Lorem Ipsum', 'https://art.pixilart.com/thumb/adc680302f5c8a3.png', '2022-04-01'),
(4, 'Trae a tu hijo al trabajo', 'Lorem Ipsum', 'https://art.pixilart.com/thumb/adc680302f5c8a3.png', '2022-04-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes_mensuales`
--

CREATE TABLE `reportes_mensuales` (
  `id_reportes_mensuales` int(11) NOT NULL,
  `titulo_reporte_mensual` varchar(180) DEFAULT NULL,
  `descripcion_reporte_mensual` varchar(800) DEFAULT NULL,
  `imagen_reporte` varchar(300) DEFAULT NULL,
  `fecha_reporte_mensual` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `correo_usuario` varchar(130) NOT NULL,
  `contrasenia` varchar(130) DEFAULT NULL,
  `no_empleado` varchar(130) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`correo_usuario`, `contrasenia`, `no_empleado`) VALUES
('a01705001@natgas.com.mx', '1234', 'A1'),
('a01705002@natgas.com.mx', '5678', 'A2'),
('a01705003@natgas.com.mx', '9012', 'A3'),
('a01705004@natgas.com.mx', '$2a$12$znJE3hjcqcMWwsEQyteVe.d0Vpe0wCrQQ/DNKZGONoyP1Q9oJM/jK', 'A4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacaciones`
--

CREATE TABLE `vacaciones` (
  `folio` int(11) NOT NULL,
  `responsable_ausencia` varchar(130) DEFAULT NULL,
  `observaciones` varchar(800) DEFAULT 'Ninguna',
  `fecha_primer_dia` date DEFAULT NULL,
  `fecha_ultimo_dia` date DEFAULT NULL,
  `fecha_solicitud` date DEFAULT current_timestamp(),
  `dias_solicitados` int(23) DEFAULT NULL,
  `estatus_vacaciones` varchar(20) DEFAULT 'Pendiente',
  `no_empleado` varchar(130) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `vacaciones`
--

INSERT INTO `vacaciones` (`folio`, `responsable_ausencia`, `observaciones`, `fecha_primer_dia`, `fecha_ultimo_dia`, `fecha_solicitud`, `dias_solicitados`, `estatus_vacaciones`, `no_empleado`) VALUES
(1, 'Óscar Eduardo Nieto Espitia', '  ', '2022-04-05', '2022-04-08', '2022-04-01', 5, 'Aprobado', 'A20'),
(2, 'Dalila Azcona Garrido', '  ', '2022-01-17', '2022-01-26', '2022-04-01', 8, 'Aprobado', 'A19'),
(3, 'Perlita Calzada Lladó', '  ', '2022-02-17', '2022-02-28', '2022-04-01', 8, 'Pendiente', 'A18'),
(4, 'América Paz Álvarez', '  ', '2022-04-08', '2022-03-05', '2022-04-01', 10, 'Pendiente', 'A17'),
(5, 'Trinidad Vazquez Mate', '  ', '2022-04-01', '2022-04-14', '2022-04-01', 6, 'Pendiente', 'A16'),
(6, 'Crescencia Botella Sola', '  ', '2022-05-02', '2022-05-30', '2022-04-01', 21, 'Pendiente', 'A15'),
(7, 'Antonia Torrijos Robles', '  ', '2022-06-08', '2022-06-21', '2022-04-01', 10, 'Pendiente', 'A14'),
(8, 'Natanael Morillo Ramos', '  ', '2022-07-05', '2022-07-07', '2022-04-01', 3, 'Pendiente', 'A13'),
(9, 'Fulgencio Rocha Ribera', '  ', '2022-08-05', '2022-08-18', '2022-04-01', 10, 'Pendiente', 'A12'),
(10, 'Adelina Llanos Sanmartín', '  ', '2022-09-05', '2022-09-29', '2022-04-01', 15, 'Pendiente', 'A11'),
(11, 'Ciríaco Tejero Gimeno', '  ', '2022-09-05', '2022-09-05', '2022-04-01', 1, 'Pendiente', 'A10'),
(12, 'Iris Gomis Batlle', '  ', '2022-08-08', '2022-08-11', '2022-04-01', 4, 'Pendiente', 'A9'),
(13, 'Rita Corral Pallarès', '  ', '2022-08-01', '2022-08-02', '2022-04-01', 2, 'Pendiente', 'A8'),
(14, 'Amando Roselló Ballester', '  ', '2022-03-16', '2022-03-16', '2022-04-01', 1, 'Pendiente', 'A7'),
(15, 'Mayte Canals Carbonell', '  ', '2022-05-02', '2022-05-12', '2022-04-01', 9, 'Pendiente', 'A6'),
(16, 'Chelo Coca Mascaró', '  ', '2022-06-20', '2022-06-28', '2022-04-01', 7, 'Pendiente', 'A5'),
(17, 'Teresita Castañeda Barba', '  ', '2022-06-06', '2022-06-07', '2022-04-01', 2, 'Pendiente', 'A4'),
(18, 'Pascuala Collado Royo', '  ', '2022-03-21', '2022-04-01', '2022-04-01', 10, 'Pendiente', 'A3'),
(19, 'Zoraida Criado Zabala', '  ', '2022-04-18', '2022-04-22', '2022-04-01', 5, 'Pendiente', 'A2'),
(20, 'Benita Martín Zabala', '  ', '2022-05-03', '2022-05-05', '2022-04-01', 3, 'Pendiente', 'A1'),
(22, 'Yolanda Urrutia Bas', 'Ninguna', '2022-04-05', '2022-04-07', '2022-04-04', 3, 'Pendiente', 'A4');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`no_empleado`),
  ADD KEY `fk_area` (`id_area`);

--
-- Indices de la tabla `ng_block`
--
ALTER TABLE `ng_block`
  ADD PRIMARY KEY (`id_ng_block`),
  ADD KEY `fk_empleado` (`no_empleado`);

--
-- Indices de la tabla `noticia`
--
ALTER TABLE `noticia`
  ADD PRIMARY KEY (`id_noticia`);

--
-- Indices de la tabla `permiso_informal`
--
ALTER TABLE `permiso_informal`
  ADD PRIMARY KEY (`id_permiso_informal`);

--
-- Indices de la tabla `prestaciones`
--
ALTER TABLE `prestaciones`
  ADD PRIMARY KEY (`id_prestaciones`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`id_publicacion`);

--
-- Indices de la tabla `reportes_mensuales`
--
ALTER TABLE `reportes_mensuales`
  ADD PRIMARY KEY (`id_reportes_mensuales`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`correo_usuario`),
  ADD KEY `fk_empleado` (`no_empleado`);

--
-- Indices de la tabla `vacaciones`
--
ALTER TABLE `vacaciones`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `fk_empleado` (`no_empleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `ng_block`
--
ALTER TABLE `ng_block`
  MODIFY `id_ng_block` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `noticia`
--
ALTER TABLE `noticia`
  MODIFY `id_noticia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `permiso_informal`
--
ALTER TABLE `permiso_informal`
  MODIFY `id_permiso_informal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `prestaciones`
--
ALTER TABLE `prestaciones`
  MODIFY `id_prestaciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reportes_mensuales`
--
ALTER TABLE `reportes_mensuales`
  MODIFY `id_reportes_mensuales` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vacaciones`
--
ALTER TABLE `vacaciones`
  MODIFY `folio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ng_block`
--
ALTER TABLE `ng_block`
  ADD CONSTRAINT `ng_block_ibfk_1` FOREIGN KEY (`no_empleado`) REFERENCES `empleado` (`no_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`no_empleado`) REFERENCES `empleado` (`no_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vacaciones`
--
ALTER TABLE `vacaciones`
  ADD CONSTRAINT `vacaciones_ibfk_1` FOREIGN KEY (`no_empleado`) REFERENCES `empleado` (`no_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
