const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Vacaciones {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_no_empleado, nuevo_responsable_ausencia, nuevo_fecha_primer_dia, nuevo_fecha_ultimo_dia, nuevo_dias_solicitados) {
        this.no_empleado = nuevo_no_empleado;
        this.responsable_ausencia = nuevo_responsable_ausencia;
        //this.observaciones = nuevo_observaciones;
        this.fecha_primer_dia = nuevo_fecha_primer_dia;
        this.fecha_ultimo_dia = nuevo_fecha_ultimo_dia;
        this.dias_solicitados = nuevo_dias_solicitados;
        //this.estatus_vacaciones = nuevo_estatus_vacaciones;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO vacaciones (no_empleado, responsable_ausencia, fecha_primer_dia, fecha_ultimo_dia, dias_solicitados, fecha_solicitud) VALUES (?, ?, ?, ?, ?, curdate())',
          [this.no_empleado, this.responsable_ausencia, this.fecha_primer_dia, this.fecha_ultimo_dia, this.dias_solicitados]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
      return db.execute(
        'SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, v.dias_solicitados, v.estatus_vacaciones, v.folio, v.responsable_ausencia, v.observaciones, v.fecha_primer_dia, v.fecha_ultimo_dia, v.fecha_solicitud ' +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area ' );
    }

    static fetchPagination(no_empleado, num_solicitudes, num_offset) {
      return db.execute(
        `SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, v.dias_solicitados, v.estatus_vacaciones, v.folio, v.responsable_ausencia, v.observaciones, date_format(v.fecha_primer_dia, '%d/%m/%Y') as fecha_primer_dia, date_format(v.fecha_ultimo_dia, '%d/%m/%Y') as fecha_ultimo_dia, date_format(v.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud, v.no_empleado ` +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND v.estatus_vacaciones = "Pendiente" AND e.no_empleado != ? ' +
        //'ORDER BY v.fecha_solicitud DESC' +
        'LIMIT ? OFFSET ? ', [no_empleado, num_solicitudes, num_offset]);
    }

    static fetchFiltro(num_solicitudes, num_offset, id_area) {
      return db.execute(
        `SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, v.dias_solicitados, v.estatus_vacaciones, v.folio, v.responsable_ausencia, v.observaciones, date_format(v.fecha_primer_dia, '%d/%m/%Y') as fecha_primer_dia, date_format(v.fecha_ultimo_dia, '%d/%m/%Y') as fecha_ultimo_dia, date_format(v.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud, v.no_empleado ` +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND a.id_area = ? ' +
        //'ORDER BY v.fecha_solicitud DESC' +
        'LIMIT ? OFFSET ? ', [id_area, num_solicitudes, num_offset]);
    }

    static count2 (id_area) {
      return db.query(
        'SELECT COUNT(folio) as num ' +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND a.id_area = ? ', [id_area]);
    }

    static count (no_empleado) {
      return db.query(
        'SELECT COUNT(folio) as num ' +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND v.estatus_vacaciones = "Pendiente" AND e.no_empleado != ? ', [no_empleado]);
    }

    static fetchSome(no_empleado, num_solicitudes, num_offset) {
        return db.execute(
          `SELECT date_format(fecha_solicitud, '%d/%m/%Y') as fecha_solicitud, date_format(fecha_primer_dia, '%d/%m/%Y') as fecha_primer_dia, date_format(fecha_ultimo_dia, '%d/%m/%Y') as fecha_ultimo_dia, dias_solicitados, responsable_ausencia, observaciones, estatus_vacaciones, folio ` +
          'FROM empleado e, vacaciones v ' +
          'WHERE e.no_empleado = v.no_empleado AND v.no_empleado=? ' +
          'ORDER BY fecha_solicitud DESC ' +
          'LIMIT ? OFFSET ?', [no_empleado, num_solicitudes, num_offset]);
    }

    static rejectVacations(estatus_vacaciones, folio) {
        return db.execute(
          'UPDATE vacaciones ' +
          'SET estatus_vacaciones = ? ' +
          'WHERE folio = ? ', [estatus_vacaciones, folio]);
    }

		static aproveeVacations(estatus_vacaciones, dias_solicitados, folio, no_empleado) {
        return db.execute(
          'UPDATE vacaciones, empleado ' +
          'SET vacaciones.estatus_vacaciones =  ?, ' +
						'empleado.dias_vacaciones_restantes = empleado.dias_vacaciones_restantes - ? ' +
					'WHERE ' +
						'vacaciones.folio = ? ' +
						'AND empleado.no_empleado = ? ', [estatus_vacaciones, dias_solicitados, folio, no_empleado]);
    }

    static aproveeVacationsSpecial(estatus_vacaciones, dias_vacaciones_restantes, dias_vacaciones_especiales, folio, no_empleado) {
        return db.execute(
          'UPDATE vacaciones, empleado ' +
          'SET vacaciones.estatus_vacaciones =  ?, ' +
						'empleado.dias_vacaciones_restantes = ?, ' +
            'empleado.dias_vacaciones_especiales = ? ' +
					'WHERE ' +
						'vacaciones.folio = ? ' +
						'AND empleado.no_empleado = ? ', [estatus_vacaciones, dias_vacaciones_restantes, dias_vacaciones_especiales, folio, no_empleado]);
    }

    static fetchSearch(search) {
        return db.execute(
          `SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, v.dias_solicitados, v.estatus_vacaciones, v.folio, v.responsable_ausencia, v.observaciones, date_format(v.fecha_primer_dia, '%d/%m/%Y') as fecha_primer_dia, date_format(v.fecha_ultimo_dia, '%d/%m/%Y') as fecha_ultimo_dia, date_format(v.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud, v.no_empleado ` +
          'FROM empleado e, vacaciones v, area a ' +
          'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND (v.estatus_vacaciones LIKE ? OR v.folio LIKE ? OR v.responsable_ausencia LIKE ? OR v.no_empleado LIKE ? OR e.nombres_empleados LIKE ?)', ['%'+search+'%', '%'+search+'%', '%'+search+'%', '%'+search+'%', '%'+search+'%', ]);
    }

		static getEstatus(no_empleado, folio) {
        return db.execute(
          'SELECT v.estatus_vacaciones ' +
          'FROM empleado e, vacaciones v ' +
          'WHERE e.no_empleado = v.no_empleado AND v.no_empleado = ? AND v.folio = ?', [no_empleado, folio]);
    }

    static fetchOne(folio) {
        return db.execute('SELECT * FROM vacaciones WHERE id=?', [folio]);
    }

    static giveVacations(giveVacations, no_empleado) {
        return db.execute(
          'UPDATE empleado ' +
            'SET dias_vacaciones_especiales = dias_vacaciones_especiales + ? ' +
					'WHERE ' +
            'no_empleado = ? ', [giveVacations, no_empleado]);
    }

    static deleteVacations(folio) {
        return db.execute(
          'DELETE FROM vacaciones ' +
            'WHERE ' +
					'folio = ? ', [folio]);
    }

    static fetchPagination2(departamento, ciudad, no_empleado, num_solicitudes, num_offset) {
      return db.execute(
        `SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, v.dias_solicitados, v.estatus_vacaciones, v.folio, v.responsable_ausencia, v.observaciones, date_format(v.fecha_primer_dia, '%d/%m/%Y') as fecha_primer_dia, date_format(v.fecha_ultimo_dia, '%d/%m/%Y') as fecha_ultimo_dia, date_format(v.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud, v.no_empleado ` +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND v.estatus_vacaciones = "Pendiente" AND a.id_area = ? AND e.id_ciudad = ? AND e.no_empleado != ? ' +
        'LIMIT ? OFFSET ? ', [departamento, ciudad, no_empleado, num_solicitudes, num_offset]);
    }

    static count3 (id_area, id_ciudad, no_empleado) {
      return db.query(
        'SELECT COUNT(folio) as num ' +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND n.estatus_ng_block = "Pendiente" AND a.id_area = ? AND e.id_ciudad = ? AND e.no_empleado != ? ', [id_area, id_ciudad, no_empleado]);
    }

    static count4 (no_empleado) {
      return db.query(
        'SELECT COUNT(folio) as num ' +
        'FROM vacaciones v ' +
        'WHERE v.no_empleado = ? ', [no_empleado]);
    }

    static downloadVacations(fecha) {
        return db.execute(
            'SELECT e.no_empleado, e.nombres_empleados, e.apellido_paterno, e.apellido_materno, e.dias_vacaciones_restantes, a.nombre_area, c.nombre_ciudad, v.folio, v.responsable_ausencia, v.fecha_primer_dia, v.fecha_ultimo_dia, v.fecha_solicitud, v.dias_solicitados, v.estatus_vacaciones ' +
            'FROM empleado e, vacaciones v, area a, ciudad c ' +
            'WHERE e.no_empleado = v.no_empleado AND e.id_area = a.id_area AND e.id_ciudad = c.id_ciudad AND ' +
            '(v.fecha_solicitud LIKE ? )', [fecha+'%']);
    }
}
