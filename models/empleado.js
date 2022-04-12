const db = require ('../util/database')

module.exports = class Empleado {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_no_empleado, nuevo_ng_blocks_restantes, nuevo_fecha_contratacion, nuevo_fecha_nacimiento, nuevo_correo_empresarial, nuevo_nombres_empleados, nuevo_apellido_paterno, nuevo_apellido_materno, nuevo_dias_vacaciones_restantes, nuevo_genero_empleado, nuevo_id_area, nuevo_id_rol) {
        this.no_empleado = nuevo_no_empleado;
        this.ng_blocks_restantes = nuevo_ng_blocks_restantes;
        this.fecha_contratacion = nuevo_fecha_contratacion;
        this.fecha_nacimiento = nuevo_fecha_nacimiento;
        this.correo_empresarial = nuevo_correo_empresarial;
        this.nombres_empleados = nuevo_nombres_empleados;
        this.apellido_paterno = nuevo_apellido_paterno;
        this.apellido_materno = nuevo_apellido_materno;
        this.dias_vacaciones_restantes = nuevo_dias_vacaciones_restantes;
        this.genero_empleado = nuevo_genero_empleado;
        this.id_area = nuevo_id_area;
        this.id_rol = nuevo_id_rol;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO empleado (no_empleado, ng_blocks_restantes, fecha_contratacion, fecha_nacimiento, correo_empresarial, nombres_empleados, apellido_paterno, apellido_materno, dias_vacaciones_restantes, genero_empleado, id_area, id_rol) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
          [this.no_empleado, this.ng_blocks_restantes, this.fecha_contratacion, this.fecha_nacimiento, this.correo_empresarial, this.nombres_empleados, this.apellido_paterno, this.apellido_materno, this.dias_vacaciones_restantes, this.genero_empleado, this.id_area, this.id_rol]);
    }

    static search() {
        return db.execute('SELECT a.nombre_area, e.no_empleado, e.nombres_empleados, e.apellido_paterno, e.apellido_materno, correo_empresarial ' +
        'FROM empleado e, area a ' +
        'WHERE a.id_area = e.id_area ' +
        'LIMIT 15 ' );
    }

    static fetchEmpleadoAll(no_empleado) {
        return db.execute(
            `SELECT e.no_empleado, ng_blocks_restantes, correo_empresarial, nombres_empleados, apellido_paterno, apellido_materno, dias_vacaciones_restantes, genero_empleado, nombre_area, date_format(fecha_contratacion, '%d/%m/%Y') as fecha_contratacion, date_format(fecha_nacimiento, '%d/%m/%Y') as fecha_nacimiento ` +
            'FROM empleado e, area a ' +
            'WHERE e.id_area = a.id_area AND e.no_empleado=?', [no_empleado]);
    }

    static fetchEmpleadoArea(id_area) {
      return db.execute(
        'SELECT a.id_area, e.nombres_empleados, e.apellido_paterno, e.apellido_materno ' +
        'FROM empleado e, area a ' +
        'WHERE a.id_area = e.id_area AND e.id_area = ? ' ,[id_area]);
    }

    static getAreaEmpleado(no_empleado) {
      return db.execute(
        'SELECT id_area ' +
        'FROM empleado e, usuario u ' +
        'WHERE e.no_empleado = u.no_empleado AND u.no_empleado = ? ' ,[no_empleado]);
    }

    static fetchOne(no_empleado) {
        return db.execute('SELECT * FROM publicacion WHERE id=?', [no_empleado]);
    }

    static fetchSearch(search) {
        return db.execute(
          'SELECT a.nombre_area, e.no_empleado, e.nombres_empleados, e.apellido_paterno, e.apellido_materno, correo_empresarial '+
          'FROM empleado e, area a ' +
          'WHERE a.id_area = e.id_area AND (a.nombre_area LIKE ? OR e.no_empleado LIKE ? OR e.nombres_empleados LIKE ?)', ['%'+search+'%', '%'+search+'%', '%'+search+'%', ]);
    }

    static getBlocksR(no_empleado) {
      return db.execute(
        'SELECT ng_blocks_restantes ' +
        'FROM empleado e ' +
        'WHERE e.no_empleado = ? ' ,[no_empleado]);
    }

    static getVacacionesR(no_empleado) {
      return db.execute(
        'SELECT dias_vacaciones_restantes ' +
        'FROM empleado e ' +
        'WHERE e.no_empleado = ? ' ,[no_empleado]);
    }

    static findOne(no_empleado) {
        return db.execute(
          'SELECT no_empleado ' +
          'FROM empleado ' +
          'WHERE no_empleado = ?', [no_empleado]);
    }

    static getRol(no_empleado) {
      return db.execute(
        'SELECT id_rol ' +
        'FROM empleado ' +
        'WHERE no_empleado = ? ' ,[no_empleado]);
    }
}
