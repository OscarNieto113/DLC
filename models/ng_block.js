const db = require ('../util/database')
const bcrypt = require('bcryptjs');

module.exports = class Ng_Block {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_no_empleado, nuevo_turno_ng_block, nuevo_descripcion_ng_block, nuevo_fecha_uso_ng_block, nuevo_estatus_ng_block) {
        this.no_empleado = nuevo_no_empleado;
        this.turno_ng_block = nuevo_turno_ng_block;
        this.descripcion_ng_block = nuevo_descripcion_ng_block;
        this.fecha_uso_ng_block = nuevo_fecha_uso_ng_block;
        //this.estatus_ng_block = nuevo_estatus_ng_block;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO ng_block (no_empleado, turno_ng_block, descripcion_ng_block, fecha_uso_ng_block) VALUES (?, ?, ?, ?)',
          [this.no_empleado, this.turno_ng_block, this.descripcion_ng_block, this.fecha_uso_ng_block]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(
          'SELECT * FROM ng_block');
    }

    static updateEstatus(estatus_ng_block, id_ng_block) {
        return db.execute(
          'UPDATE ng_block ' +
          'SET estatus_ng_block = ? ' +
          'WHERE id_ng_block = ? ', [estatus_ng_block, id_ng_block]);
    }

    static fetchSome(no_empleado) {
        return db.execute(
          `SELECT turno_ng_block, descripcion_ng_block, date_format(fecha_uso_ng_block, '%d/%m/%Y') as fecha_uso_ng_block, estatus_ng_block, ng.no_empleado, id_ng_block, date_format(fecha_solicitud_ng_block, '%d/%m/%Y') as fecha_solicitud_ng_block ` +
          'FROM empleado e, ng_block ng ' +
          'WHERE e.no_empleado = ng.no_empleado AND ng.no_empleado=?', [no_empleado]);
    }
    static rejectNGBlock(estatus_ng_block, id_ng_block) {
        return db.execute(
          'UPDATE ng_block ' +
          'SET estatus_ng_block = ? ' +
          'WHERE id_ng_block = ? ', [estatus_ng_block, id_ng_block]);
    }

    static aproveeNGBlock(estatus_ng_block, id_ng_block, no_empleado) {
        return db.execute(
          'UPDATE ng_block, empleado ' +
          'SET ng_block.estatus_ng_block =  ?, ' +
            'empleado.ng_blocks_restantes = empleado.ng_blocks_restantes - 1 ' +
          'WHERE ' +
            'ng_block.id_ng_block = ? ' +
            'AND empleado.no_empleado = ? ', [estatus_ng_block, id_ng_block, no_empleado]);
    }

    static fetchOne(id_ng_block) {
        return db.execute('SELECT * FROM ng_block WHERE id=?', [id_ng_block]);
    }

    static giveNgBlocks(giveNgBlocks, no_empleado) {
        return db.execute(
          'UPDATE empleado ' +
            'SET ng_blocks_restantes = ng_blocks_restantes + ? ' +
          'WHERE ' +
            'no_empleado = ? ', [giveNgBlocks, no_empleado]);
    }

    static fetchPagination(num_solicitudes, num_offset) {
      return db.execute(
        `SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, n.estatus_ng_block, date_format(n.fecha_uso_ng_block, '%d/%m/%Y') as fecha_uso_ng_block, date_format(n.fecha_solicitud_ng_block, '%d/%m/%Y') as fecha_solicitud_ng_block, n.descripcion_ng_block, n.turno_ng_block, n.id_ng_block, n.no_empleado ` +
        'FROM empleado e, ng_block n, area a ' +
        'WHERE e.no_empleado = n.no_empleado AND a.id_area = e.id_area AND n.estatus_ng_block = "Pendiente" ' +
        'LIMIT ? OFFSET ? ', [num_solicitudes, num_offset]);
    }

    static fetchFiltro(num_solicitudes, num_offset, id_area) {
      return db.execute(
        `SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, n.estatus_ng_block, date_format(n.fecha_uso_ng_block, '%d/%m/%Y') as fecha_uso_ng_block, date_format(n.fecha_solicitud_ng_block, '%d/%m/%Y') as fecha_solicitud_ng_block, n.descripcion_ng_block, n.turno_ng_block, n.id_ng_block, n.no_empleado ` +
        'FROM empleado e, ng_block n, area a ' +
        'WHERE e.no_empleado = n.no_empleado AND a.id_area = e.id_area AND a.id_area = ? ' +
        //'ORDER BY v.fecha_solicitud DESC' +
        'LIMIT ? OFFSET ? ', [id_area, num_solicitudes, num_offset]);
    }

    static count2 (id_area) {
      return db.query(
        'SELECT COUNT(id_ng_block) as num ' +
        'FROM empleado e, ng_block n, area a ' +
        'WHERE e.no_empleado = n.no_empleado AND a.id_area = e.id_area AND a.id_area = ? ', [id_area]);
    }

    static count () {
      return db.query(
        'SELECT COUNT(id_ng_block) as num ' +
        'FROM empleado e, ng_block n, area a ' +
        'WHERE e.no_empleado = n.no_empleado AND a.id_area = e.id_area AND n.estatus_ng_block = "Pendiente"');
    }

    static fetchSearch(search) {
        return db.execute(
          `SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, n.estatus_ng_block, date_format(n.fecha_uso_ng_block, '%d/%m/%Y') as fecha_uso_ng_block, date_format(n.fecha_solicitud_ng_block, '%d/%m/%Y') as fecha_solicitud_ng_block, n.descripcion_ng_block, n.turno_ng_block, n.id_ng_block, n.no_empleado ` +
          'FROM empleado e, ng_block n, area a ' +
          'WHERE e.no_empleado = n.no_empleado AND a.id_area = e.id_area AND (n.estatus_ng_block LIKE ? OR n.id_ng_block LIKE ? OR n.turno_ng_block LIKE ? OR n.no_empleado LIKE ? OR e.nombres_empleados LIKE ?)', ['%'+search+'%', '%'+search+'%', '%'+search+'%', '%'+search+'%', '%'+search+'%', ]);
    }

    static deleteNgBlock(id_ng_block) {
        return db.execute(
          'DELETE FROM ng_block ' +
            'WHERE ' +
					'id_ng_block = ? ', [id_ng_block]);
    }

    static getEstatus(no_empleado, id_ng_block) {
        return db.execute(
          'SELECT n.estatus_ng_block ' +
          'FROM empleado e, ng_block n ' +
          'WHERE e.no_empleado = n.no_empleado AND n.no_empleado = ? AND n.id_ng_block = ?', [no_empleado, id_ng_block]);
    }

    static fetchPagination2(departamento, ciudad, num_solicitudes, num_offset) {
      return db.execute(
        `SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, n.estatus_ng_block, date_format(n.fecha_uso_ng_block, '%d/%m/%Y') as fecha_uso_ng_block, date_format(n.fecha_solicitud_ng_block, '%d/%m/%Y') as fecha_solicitud_ng_block, n.descripcion_ng_block, n.turno_ng_block, n.id_ng_block, n.no_empleado ` +
        'FROM empleado e, ng_block n, area a ' +
        'WHERE e.no_empleado = n.no_empleado AND a.id_area = e.id_area AND n.estatus_ng_block = "Pendiente"  AND a.id_area = ? AND e.id_ciudad = ? ' +
        'LIMIT ? OFFSET ? ', [departamento, ciudad, num_solicitudes, num_offset]);
    }

    static count3 (id_area, id_ciudad) {
      return db.query(
        'SELECT COUNT(id_ng_block) as num ' +
        'FROM empleado e, ng_block n, area a ' +
        'WHERE e.no_empleado = n.no_empleado AND a.id_area = e.id_area AND a.id_area = ? AND e.id_ciudad = ? ', [id_area, id_ciudad]);
    }

}
