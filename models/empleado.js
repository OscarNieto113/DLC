const db = require ('../util/database')

module.exports = class Empleado {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_no_empleado, nuevo_ng_blocks_restantes, nuevo_fecha_contratacion, nuevo_fecha_nacimiento, nuevo_correo_empresarial, nuevo_nombres_empleado, nuevo_apellido_paterno, nuevo_apellido_materno, nuevo_dias_vacaciones_restantes, nuevo_genero_empleado, nuevo_id_area) {
        this.no_empleado = nuevo_no_empleado;
        this.ng_blocks_restantes = nuevo_ng_blocks_restantes;
        this.fecha_contratacion = nuevo_fecha_contratacion;
        this.fecha_nacimiento = nuevo_fecha_nacimiento;
        this.correo_empresarial = nuevo_correo_empresarial;
        this.nombres_empleado = nuevo_nombres_empleado;
        this.apellido_paterno = nuevo_apellido_paterno;
        this.apellido_materno = nuevo_apellido_materno;
        this.dias_vacaciones_restantes = nuevo_dias_vacaciones_restantes;
        this.genero_empleado = nuevo_genero_empleado;
        this.id_area = nuevo_id_area;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO empleado (no_empleado, ng_blocks_restantes, fecha_contratacion, fecha_nacimiento, correo_empresarial, nombres_empleado, apellido_paterno, apellido_materno, dias_vacaciones_restantes, genero_empleado, id_area) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
          [this.no_empleado, this.ng_blocks_restantes, this.fecha_contratacion, this.fecha_nacimiento, this.correo_empresarial, this.nombres_empleado, this.apellido_paterno, this.apellido_materno, this.dias_vacaciones_restantes, this.genero_empleado, this.id_area]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM empleado');
    }

    static fetchOne(no_empleado) {
        return db.execute('SELECT * FROM publicacion WHERE id=?', [no_empleado]);
    }
}
