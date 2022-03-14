-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-03-2022 a las 02:27:28
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `natgas`
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
  `no_empleado` int(11) NOT NULL,
  `ng_blocks_restantes` int(6) DEFAULT NULL,
  `fecha_contratacion` date DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `correo_empresarial` varchar(130) NOT NULL,
  `nombres_empleados` varchar(200) DEFAULT NULL,
  `apellido_paterno` varchar(130) DEFAULT NULL,
  `apellido_materno` varchar(130) DEFAULT NULL,
  `dias_vacaciones_restantes` int(23) DEFAULT NULL,
  `genero_empleado` varchar(130) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`no_empleado`, `ng_blocks_restantes`, `fecha_contratacion`, `fecha_nacimiento`, `correo_empresarial`, `nombres_empleados`, `apellido_paterno`, `apellido_materno`, `dias_vacaciones_restantes`, `genero_empleado`) VALUES
(1, 5, '2010-08-09', '2001-03-02', 'a01705001@natgas.com.mx', 'Óscar Eduardo', 'Nieto', 'Espitia', 6, 'M'),
(2, 4, '2012-02-26', '1945-05-28', 'a01705002@natgas.com.mx', 'Dalila', 'Azcona', 'Garrido', 9, 'F'),
(3, 3, '2012-07-10', '1946-12-15', 'a01705003@natgas.com.mx', 'Perlita', 'Calzada', 'Lladó', 12, 'F'),
(4, 2, '2013-07-11', '1950-05-02', 'a01705004@natgas.com.mx', 'América', 'Paz', 'Álvarez', 12, 'F'),
(5, 1, '2013-09-15', '1951-09-29', 'a01705005@natgas.com.mx', 'Trinidad', 'Vazquez', 'Mate', 12, 'F'),
(6, 0, '2014-02-10', '1958-03-12', 'a01705006@natgas.com.mx', 'Crescencia', 'Botella', 'Sola', 23, 'F'),
(7, 5, '2014-04-06', '1958-07-31', 'a01705007@natgas.com.mx', 'Antonia', 'Torrijos', 'Robles', 14, 'F'),
(8, 5, '2014-08-25', '1960-06-05', 'a01705008@natgas.com.mx', 'Natanael', 'Morillo', 'Ramos', 12, 'M'),
(9, 3, '2015-04-09', '1964-03-20', 'a01705009@natgas.com.mx', 'Fulgencio', 'Rocha', 'Ribera', 13, 'M'),
(10, 4, '2015-07-21', '1967-07-18', 'a01705011@natgas.com.mx', 'Adelina', 'Llanos', 'Sanmartín', 23, 'F'),
(11, 4, '2015-11-24', '1968-12-05', 'a01705012@natgas.com.mx', 'Ciríaco', 'Tejero', 'Gimeno', 1, 'M'),
(12, 2, '2016-06-29', '1971-12-24', 'a01705013@natgas.com.mx', 'Iris', 'Gomis', 'Batlle', 0, 'F'),
(13, 2, '2016-08-01', '1975-11-26', 'a01705014@natgas.com.mx', 'Rita', 'Corral', 'Pallarès', 2, 'F'),
(14, 1, '2016-11-23', '1980-03-20', 'a01705015@natgas.com.mx', 'Amando', 'Roselló', 'Ballester', 5, 'M'),
(15, 1, '2017-03-12', '1982-05-09', 'a01705016@natgas.com.mx', 'Mayte', 'Canals', 'Carbonell', 9, 'M'),
(16, 3, '2017-04-22', '1982-09-27', 'a01705017@natgas.com.mx', 'Chelo', 'Coca', 'Mascaró', 18, 'M'),
(17, 3, '2018-01-31', '2021-03-02', 'a01705018@natgas.com.mx', 'Teresita', 'Castañeda', 'Barba', 12, 'F'),
(18, 3, '2018-07-15', '1985-06-11', 'a01705019@natgas.com.mx', 'Pascuala', 'Collado', 'Royo', 18, 'F'),
(19, 5, '2018-09-28', '1993-03-17', 'a01705020@natgas.com.mx', 'Zoraida', 'Criado', 'Zabala', 14, 'F'),
(20, 4, '2019-08-24', '1996-05-01', 'a01705021@natgas.com.mx', 'Benita', 'Martin', 'Zabala', 9, 'F'),
(21, 3, '2019-12-03', '1996-05-11', 'a01705022@natgas.com.mx', 'Yolanda', 'Urrutia', 'Bas', 3, 'F'),
(22, 2, '2020-05-04', '1998-10-31', 'a01705023@natgas.com.mx', 'Dorita', 'Lastra', 'Rosales', 21, 'F'),
(23, 2, '2020-08-15', '1999-11-16', 'a01705024@natgas.com.mx', 'Perla', 'Alcaraz', 'Sotelo', 3, 'F'),
(24, 5, '2021-01-10', '2001-02-20', 'a01705025@natgas.com.mx', 'Fidel', 'Girón', 'Román', 5, 'M'),
(25, 0, '2010-07-05', '2001-03-09', 'a01705026@natgas.com.mx', 'Ligia', 'Alcázar', 'Arribas', 7, 'F'),
(26, 0, '2010-11-29', '2001-04-30', 'a01705027@natgas.com.mx', 'Ulises', 'Villa', 'Castell', 18, 'M'),
(27, 0, '2011-04-10', '2003-03-09', 'a01705028@natgas.com.mx', 'Sara', 'Muñoz', 'Amaya', 19, 'F'),
(28, 1, '2011-04-16', '1943-12-11', 'a01705029@natgas.com.mx', 'Trinidad', 'Calleja', 'Jaén', 2, 'F'),
(29, 2, '2011-12-31', '1946-04-07', 'a01705030@natgas.com.mx', 'Gervasio', 'Bermúdez', 'Aguiló', 1, 'M'),
(30, 3, '2021-03-02', '1947-03-10', 'a01705031@natgas.com.mx', 'Salomé', 'Madrid', 'Vega', 22, 'M'),
(31, 4, '2012-11-22', '1947-05-10', 'a01705032@natgas.com.mx', 'Angelina', 'Romeu', 'Jiménez', 21, 'F'),
(32, 5, '2012-12-02', '1949-01-18', 'a01705033@natgas.com.mx', 'Yaiza', 'Saldaña', 'Salom', 20, 'F'),
(33, 0, '2013-06-17', '1951-03-31', 'a01705034@natgas.com.mx', 'Fortunato', 'Arellano', 'Menéndez', 19, 'M'),
(34, 0, '2013-07-25', '1953-09-19', 'a01705035@natgas.com.mx', 'Alma', 'Marcela', 'Gozo', 18, 'F'),
(35, 0, '2013-10-25', '1958-06-14', 'a01705036@natgas.com.mx', 'Rosa', 'Melan', 'Ortiz', 17, 'F'),
(36, 1, '2014-11-13', '1962-09-20', 'a01705037@natgas.com.mx', 'Florinda', 'Blazquez', 'Torrijos', 16, 'F'),
(37, 5, '2014-12-01', '1964-01-19', 'a01705038@natgas.com.mx', 'Octavia', 'Robledo', 'Caro', 15, 'F'),
(38, 5, '2015-01-10', '1966-05-28', 'a01705039@natgas.com.mx', 'Luis Ángel', 'Bayón', 'Posada', 14, 'M'),
(39, 5, '2015-05-03', '1970-07-13', 'a01704040@natgas.com.mx', 'Nazaret', 'Pino', 'Palma', 13, 'M'),
(40, 3, '2015-09-03', '1973-03-16', 'a01703041@natgas.com.mx', 'Julio', 'Alberto', 'Gil', 12, 'M'),
(41, 3, '2017-03-06', '1974-04-04', 'a01700089@natgas.com.mx', 'Mónica', 'Hoz', 'Guillén', 11, 'F'),
(42, 2, '2018-12-30', '1977-11-04', 'a01700090@natgas.com.mx', 'Eros Giovanni', 'Guillén', 'Velazquez', 10, 'F'),
(43, 1, '2019-08-08', '1977-11-07', 'a01700091@natgas.com.mx', 'Margarita', 'Segovia', 'Solano', 9, 'M'),
(44, 2, '2019-11-02', '1978-05-12', 'a01700092@natgas.com.mx', 'Ariadna', 'Amores', 'Perelló', 8, 'F'),
(45, 4, '2019-11-08', '1982-11-20', 'a01700093@natgas.com.mx', 'Eugenio', 'Iglesia', 'Cadenas', 7, 'M'),
(46, 3, '2019-11-25', '1988-02-29', 'a01700094@natgas.com.mx', 'Macarena', 'Larrea', 'Jimenez', 6, 'F'),
(47, 1, '2021-03-01', '1993-10-25', 'a01700097@natgas.com.mx', 'Simón Jacobo', 'Cuevas', 'Coronado', 5, 'M'),
(48, 2, '2020-10-08', '1989-08-07', 'a01700095@natgas.com.mx', 'Dulce', 'Hidalgo', 'Cañizares', 4, 'F'),
(49, 5, '2021-02-14', '1991-03-01', 'a01700096@natgas.com.mx', 'Yaiza Agustina', 'Suarez', 'Segarra', 3, 'F'),
(50, 2, '2021-03-02', '1996-02-16', 'a01700098@natgas.com.mx', 'José Ernesto', 'Mora', 'Anguita', 2, 'M');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_area`
--

CREATE TABLE `empleado_area` (
  `fecha_union` date NOT NULL,
  `puesto` varchar(130) DEFAULT NULL,
  `no_empleado` int(11) NOT NULL,
  `id_area` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleado_area`
--

INSERT INTO `empleado_area` (`fecha_union`, `puesto`, `no_empleado`, `id_area`) VALUES
('2015-06-02', 'Ingeniero de Software', 1, 10),
('2015-06-07', 'Licenciado en comunicaciones', 19, 9),
('2015-06-16', 'Administrador', 2, 9),
('2015-12-03', 'Agente de Bienes raíces', 3, 5),
('2016-07-18', 'Agente de Seguros', 4, 4),
('2016-11-01', 'Analista de Credito y Cobro', 5, 3),
('2016-11-28', 'Arquitecto', 6, 1),
('2017-05-30', 'Auditor', 7, 2),
('2018-09-18', 'Auxiliar en Contabilidad', 8, 5),
('2018-10-12', 'Asesor Legal', 9, 6),
('2019-08-22', 'Auxiliar de Inventario', 10, 7),
('2019-11-14', 'Ingeniero biotecnólogo', 11, 8),
('2019-12-13', 'Junior Software Engineer', 12, 10),
('2019-12-18', 'Licenciado en comunicación', 13, 1),
('2020-02-04', 'Gerente de Inventario', 14, 3),
('2020-06-12', 'Capacitador', 15, 5),
('2020-08-20', 'Chofer', 16, 2),
('2020-12-29', 'Contador', 17, 6),
('2020-12-31', 'Senior Software Engineer', 18, 10),
('2022-06-02', 'Diseñador Gráfico', 20, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ng_block`
--

CREATE TABLE `ng_block` (
  `id_ng_block` int(11) NOT NULL,
  `turno_ng_block` varchar(130) DEFAULT NULL,
  `descripcion_ng_block` varchar(130) DEFAULT NULL,
  `fecha_uso_ng_block` date DEFAULT NULL,
  `fecha_solicitud_ng_block` date DEFAULT NULL,
  `estatus_ng_block` varchar(20) DEFAULT NULL,
  `no_empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ng_block`
--

INSERT INTO `ng_block` (`id_ng_block`, `turno_ng_block`, `descripcion_ng_block`, `fecha_uso_ng_block`, `fecha_solicitud_ng_block`, `estatus_ng_block`, `no_empleado`) VALUES
(1, 'Matutino', 'Tengo que ir al médico', '2022-02-10', '2022-02-09', 'Pendiente', 5),
(2, 'Matutino', 'Problemas personales.', '2022-02-15', '2022-01-09', 'Aprobado', 49),
(3, 'Matutino', 'Emergencia familiar.', '2022-03-22', '2022-02-12', 'Aprobado', 48),
(4, 'Matutino', 'Tengo que recoger a mis hijos.', '2022-04-22', '2022-03-11', 'Aprobado', 47),
(5, 'Matutino', 'Un familiar ha fallecido.', '2022-06-07', '2022-05-05', 'Aprobado', 46),
(6, 'Matutino', 'Mi mascota está enferma.', '2022-06-15', '2022-05-12', 'Pendiente', 45),
(7, 'Matutino', 'Mi coche se averió.', '2022-06-27', '2022-05-21', 'Aprobado', 44),
(8, 'Matutino', 'Estoy enfermo.', '2022-06-29', '2022-05-12', 'Pendiente', 43),
(9, 'Matutino', 'Tengo una cita con el doctor', '2022-07-08', '2022-06-29', 'Aprobado', 42),
(10, 'Matutino', 'Tengo la menstruación.', '2022-07-19', '2022-06-26', 'Rechazado', 41),
(11, 'Vespertino', 'Mi pareja tuvo un accidente', '2022-08-09', '2022-07-12', 'Aprobado', 31),
(12, 'Vespertino', 'Un pariente está de visita', '2022-08-15', '2022-07-05', 'Pendiente', 22),
(13, 'Vespertino', 'Tuve un incendio en mi apartamento', '2022-02-10', '2022-02-09', 'Aprobado', 13),
(14, 'Vespertino', 'Voy al partido de los gallos vs atlas', '2022-08-22', '2022-07-22', 'Rechazado', 14),
(15, 'Vespertino', 'Tengo que ir a una boda', '2022-09-02', '2022-08-29', 'Aprobado', 15),
(16, 'Vespertino', 'Me asaltaron en la calle en Tamaulipas.', '2022-09-09', '2022-09-08', 'Rechazado', 2),
(17, 'Vespertino', 'Me quedé encerrado en casa', '2022-09-23', '2022-09-22', 'Pendiente', 9),
(18, 'Vespertino', 'Es el cumpleaños de mi hijo', '2022-09-29', '2022-09-18', 'Aprobado', 7),
(19, 'Vespertino', 'Tengo sintomas de covid”', '2022-10-06', '2022-09-09', 'Rechazado', 21),
(20, 'Vespertino', 'Tengo que ir al recital de mi hija', '2022-10-18', '2022-10-09', 'Rechazado', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticia`
--

CREATE TABLE `noticia` (
  `id_noticia` int(11) NOT NULL,
  `url_imagen_noticia` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `noticia`
--

INSERT INTO `noticia` (`id_noticia`, `url_imagen_noticia`) VALUES
(1, 'https://acortar.link/TJmy9M'),
(2, 'https://acortar.link/TJmy9M'),
(3, 'https://acortar.link/TJmy9M'),
(4, 'https://acortar.link/TJmy9M'),
(5, 'https://acortar.link/TJmy9M'),
(6, 'https://acortar.link/TJmy9M'),
(7, 'https://acortar.link/TJmy9M'),
(8, 'https://acortar.link/TJmy9M'),
(9, 'https://acortar.link/TJmy9M'),
(10, 'https://acortar.link/TJmy9M'),
(11, 'https://acortar.link/TJmy9M'),
(12, 'https://acortar.link/TJmy9M'),
(13, 'https://acortar.link/TJmy9M'),
(14, 'https://acortar.link/TJmy9M'),
(15, 'https://acortar.link/TJmy9M'),
(16, 'https://acortar.link/TJmy9M'),
(17, 'https://acortar.link/TJmy9M'),
(18, 'https://acortar.link/TJmy9M'),
(19, 'https://acortar.link/TJmy9M'),
(20, 'https://acortar.link/TJmy9M');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetivo`
--

CREATE TABLE `objetivo` (
  `id_objetivo` int(11) NOT NULL,
  `nombre_objetivo` varchar(130) DEFAULT NULL,
  `descripcion_objetivo` varchar(130) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `objetivo`
--

INSERT INTO `objetivo` (`id_objetivo`, `nombre_objetivo`, `descripcion_objetivo`) VALUES
(1, 'Litros vendidos Enero 2020', 'El objetivo de este mes es vender 200,000 litros en Querétaro'),
(2, 'Litros vendidos Febrero 2020', 'El objetivo de este mes es vender 220,000 litros en Querétaro'),
(3, 'Litros vendidos Marzo 2020', 'El objetivo de este mes es vender 240,000 litros en Querétaro'),
(4, 'Litros vendidos Abril 2020', 'El objetivo de este mes es vender 250,000 litros en Querétaro'),
(5, 'Litros vendidos Mayo 2020 ', 'El objetivo de este mes es vender 260,000 litros en Querétaro'),
(6, 'Litros vendidos Junio 2020', 'El objetivo de este mes es vender 280,000 litros en Querétaro'),
(7, 'Litros vendidos Julio 2020', 'El objetivo de este mes es vender 300,000 litros en Querétaro'),
(8, 'Litros vendidos Agosto 2020', 'El objetivo de este mes es vender 310,000 litros en Querétaro'),
(9, 'Litros vendidos Septiembre 2020', 'El objetivo de este mes es vender 320,000 litros en Querétaro'),
(10, 'Litros vendidos Octubre 2020', 'El objetivo de este mes es vender 300,000 litros en Querétaro'),
(11, 'Litros vendidos Noviembre 2020', 'El objetivo de este mes es vender 320,000 litros en Querétaro'),
(12, 'Litros vendidos Deciembre 2020', 'El objetivo de este mes es vender 340,000 litros en Querétaro'),
(13, 'Litros vendidos Enero 2021', 'El objetivo de este mes es vender 300,000 litros en Querétaro'),
(14, 'Litros vendidos Febrero 2021', 'El objetivo de este mes es vender 320,000 litros en Querétaro'),
(15, 'Litros vendidos Marzo 2021', 'El objetivo de este mes es vender 340,000 litros en Querétaro'),
(16, 'Litros vendidos Abril 2021', 'El objetivo de este mes es vender 350,000 litros en Querétaro'),
(17, 'Litros vendidos Mayo 2021', 'El objetivo de este mes es vender 320,000 litros en Querétaro'),
(18, 'Litros vendidos Junio 2021', 'El objetivo de este mes es vender 340,000 litros en Querétaro'),
(19, 'Litros vendidos Julio 2021', 'El objetivo de este mes es vender 350,000 litros en Querétaro'),
(20, 'Litros vendidos Agosto 2021', 'El objetivo de este mes es vender 320,000 litros en Querétaro');

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
  `url_imagen_publicacion` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `publicacion`
--

INSERT INTO `publicacion` (`id_publicacion`, `titulo_publicacion`, `descripcion_publicacion`, `url_imagen_publicacion`) VALUES
(1, 'Curso de Inglés', 'Inscribite a los cursos de inglés', 'https://rb.gy/0e86zu'),
(2, 'Limpieza dental', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(3, 'Día del padre', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(4, 'Trae a tu hijo al trabajo', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(5, 'Seguro de carros', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(6, 'Adopta un perrito', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(7, 'Felíz Año 2021', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(8, 'Seguros médicos', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(9, 'Fiesta de Halloween', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(10, 'Posada', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(11, 'Curso de primeros auxilios', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(12, 'Carrera 10k natgas', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(13, 'Curso de Inglés II', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(14, 'Fiesta Mexicana', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(15, 'Curso de Inglés III', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(16, 'Asueto 2 de Noviembre', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(17, 'Felices Fiestas', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(18, 'Dia del trabajo', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(19, 'Curso de finanzas', 'Lorem Ipsum', 'https://rb.gy/0e86zu'),
(20, 'Asueto Día del Trabajo', 'Lorem Ipsum', 'https://rb.gy/0e86zu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacaciones`
--

CREATE TABLE `vacaciones` (
  `folio` int(11) NOT NULL,
  `responsable_ausencia` varchar(130) DEFAULT NULL,
  `observaciones` varchar(800) DEFAULT NULL,
  `reanudacion_labores` date DEFAULT NULL,
  `fecha_primer_dia` date DEFAULT NULL,
  `fecha_ultimo_dia` date DEFAULT NULL,
  `fecha_solicitud` date DEFAULT NULL,
  `dias_solicitados` int(23) DEFAULT NULL,
  `estatus_vacaciones` varchar(20) DEFAULT NULL,
  `no_empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `vacaciones`
--

INSERT INTO `vacaciones` (`folio`, `responsable_ausencia`, `observaciones`, `reanudacion_labores`, `fecha_primer_dia`, `fecha_ultimo_dia`, `fecha_solicitud`, `dias_solicitados`, `estatus_vacaciones`, `no_empleado`) VALUES
(1, 'Óscar Eduardo Nieto Espitia', '  ', '2022-04-11', '2022-04-05', '2022-04-08', '2022-03-09', 5, 'Pendiente', 20),
(2, 'Dalila Azcona Garrido', '  ', '2022-01-27', '2022-01-17', '2022-01-26', '2022-01-09', 8, 'Pendiente', 19),
(3, 'Perlita Calzada Lladó', '  ', '2022-03-01', '2022-02-17', '2022-02-28', '2022-01-17', 8, 'Pendiente', 18),
(4, 'América Paz Álvarez', '  ', '2022-04-11', '2022-04-08', '2022-03-05', '2022-02-09', 10, 'Pendiente', 17),
(5, 'Trinidad Vazquez Mate', '  ', '2022-04-15', '2022-04-01', '2022-04-14', '2022-03-01', 6, 'Pendiente', 16),
(6, 'Crescencia Botella Sola', '  ', '2022-06-01', '2022-05-02', '2022-05-30', '2022-04-09', 21, 'Pendiente', 15),
(7, 'Antonia Torrijos Robles', '  ', '2022-06-22', '2022-06-08', '2022-06-21', '2022-05-09', 10, 'Pendiente', 14),
(8, 'Natanael Morillo Ramos', '  ', '2022-07-08', '2022-07-05', '2022-07-07', '2022-06-09', 3, 'Pendiente', 13),
(9, 'Fulgencio Rocha Ribera', '  ', '2022-08-19', '2022-08-05', '2022-08-18', '2022-07-09', 10, 'Pendiente', 12),
(10, 'Adelina Llanos Sanmartín', '  ', '2022-09-30', '2022-09-05', '2022-09-29', '2022-03-02', 15, 'Pendiente', 11),
(11, 'Ciríaco Tejero Gimeno', '  ', '2022-09-06', '2022-09-05', '2022-09-05', '2022-08-10', 1, 'Pendiente', 10),
(12, 'Iris Gomis Batlle', '  ', '2022-08-12', '2022-08-08', '2022-08-11', '2022-06-25', 4, 'Pendiente', 9),
(13, 'Rita Corral Pallarès', '  ', '2022-08-03', '2022-08-01', '2022-08-02', '2022-02-23', 2, 'Pendiente', 8),
(14, 'Amando Roselló Ballester', '  ', '2022-03-17', '2022-03-16', '2022-03-16', '2022-03-09', 1, 'Pendiente', 7),
(15, 'Mayte Canals Carbonell', '  ', '2022-05-13', '2022-05-02', '2022-05-12', '2022-05-01', 9, 'Pendiente', 6),
(16, 'Chelo Coca Mascaró', '  ', '2022-06-29', '2022-06-20', '2022-06-28', '2022-05-19', 7, 'Pendiente', 5),
(17, 'Teresita Castañeda Barba', '  ', '2022-06-08', '2022-06-06', '2022-06-07', '2022-04-21', 2, 'Pendiente', 4),
(18, 'Pascuala Collado Royo', '  ', '2022-04-04', '2022-03-21', '2022-04-01', '2022-02-15', 10, 'Pendiente', 3),
(19, 'Zoraida Criado Zabala', '  ', '2022-04-25', '2022-04-18', '2022-04-22', '2022-04-09', 5, 'Pendiente', 2),
(20, 'Benita Martin Zabala', '  ', '2022-05-06', '2022-05-03', '2022-05-05', '2022-03-09', 3, 'Pendiente', 1);

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
  ADD PRIMARY KEY (`no_empleado`);

--
-- Indices de la tabla `empleado_area`
--
ALTER TABLE `empleado_area`
  ADD PRIMARY KEY (`fecha_union`),
  ADD KEY `fk_empleado` (`no_empleado`),
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
-- Indices de la tabla `objetivo`
--
ALTER TABLE `objetivo`
  ADD PRIMARY KEY (`id_objetivo`);

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
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `no_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `ng_block`
--
ALTER TABLE `ng_block`
  MODIFY `id_ng_block` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `vacaciones`
--
ALTER TABLE `vacaciones`
  MODIFY `folio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleado_area`
--
ALTER TABLE `empleado_area`
  ADD CONSTRAINT `empleado_area_ibfk_1` FOREIGN KEY (`no_empleado`) REFERENCES `empleado` (`no_empleado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `empleado_area_ibfk_2` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ng_block`
--
ALTER TABLE `ng_block`
  ADD CONSTRAINT `ng_block_ibfk_1` FOREIGN KEY (`no_empleado`) REFERENCES `empleado` (`no_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vacaciones`
--
ALTER TABLE `vacaciones`
  ADD CONSTRAINT `vacaciones_ibfk_1` FOREIGN KEY (`no_empleado`) REFERENCES `empleado` (`no_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
