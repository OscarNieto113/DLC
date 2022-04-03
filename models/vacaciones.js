const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Vacaciones {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_no_empleado, nuevo_responsable_ausencia, nuevo_observaciones, nuevo_fecha_primer_dia, nuevo_fecha_ultimo_dia, nuevo_dias_solicitados, nuevo_estatus_vacaciones) {
        this.no_empleado = nuevo_no_empleado;
        this.responsable_ausencia = nuevo_responsable_ausencia;
        this.observaciones = nuevo_observaciones;
        this.fecha_primer_dia = nuevo_fecha_primer_dia;
        this.fecha_ultimo_dia = nuevo_fecha_ultimo_dia;
        this.dias_solicitados = nuevo_dias_solicitados;
        this.estatus_vacaciones = nuevo_estatus_vacaciones;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO vacaciones (no_empleado, responsable_ausencia, observaciones, fecha_primer_dia, fecha_ultimo_dia, dias_solicitados, estatus_vacaciones) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [this.no_empleado, this.responsable_ausencia, this.observaciones, this.fecha_primer_dia, this.fecha_ultimo_dia, this.dias_solicitados, this.estatus_vacaciones]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
      return db.execute(
        'SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, v.dias_solicitados, v.estatus_vacaciones, v.folio, v.responsable_ausencia, v.observaciones, v.fecha_primer_dia, v.fecha_ultimo_dia, v.fecha_solicitud ' +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area ' );
    }

    static fetchPagination(num_solicitudes, num_offset) {
      return db.execute(
        'SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, v.dias_solicitados, v.estatus_vacaciones, v.folio, v.responsable_ausencia, v.observaciones, v.fecha_primer_dia, v.fecha_ultimo_dia, v.fecha_solicitud, v.no_empleado ' +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND v.estatus_vacaciones = "Pendiente" ' +
        'LIMIT ? OFFSET ? ', [num_solicitudes, num_offset]);
    }

    static count () {
      return db.query(
        'SELECT COUNT(folio) as num ' +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND v.estatus_vacaciones = "Pendiente"');
    }

    static fetchSome(no_empleado) {
        return db.execute(
          'SELECT fecha_solicitud, fecha_primer_dia, fecha_ultimo_dia, dias_solicitados, responsable_ausencia, observaciones, estatus_vacaciones, folio ' +
          'FROM empleado e, vacaciones v ' +
          'WHERE e.no_empleado = v.no_empleado AND v.no_empleado=?', [no_empleado]);
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

    static fetchSearch(search) {
        return db.execute(
          'SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, v.dias_solicitados, v.estatus_vacaciones, v.folio, v.responsable_ausencia, v.observaciones, v.fecha_primer_dia, v.fecha_ultimo_dia, v.fecha_solicitud ' +
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
            'SET dias_vacaciones_restantes = dias_vacaciones_restantes + ? ' +
					'WHERE ' +
            'no_empleado = ? ', [giveVacations, no_empleado]);
    }

    static deleteVacations(folio) {
        return db.execute(
          'DELETE FROM vacaciones ' +
            'WHERE ' +
					'folio = ? ', [folio]);
    }

}
