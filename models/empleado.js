const db = require('../util/database');

module.exports = class Empleado {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_no_empleado, nuevo_ng_blocks_restantes, nuevo_fecha_contratacion, nuevo_fecha_nacimiento, nuevo_correo_empresarial, nuevo_nombres_empleados, nuevo_apellido_paterno, nuevo_apellido_materno, nuevo_dias_vacaciones_restantes, nuevo_genero_empleado) {
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
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        return db.execute('INSERT INTO area (nombre_area) VALUES (?)',
            [this.nombre_area]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM area');
    }
}


const db = require('../util/database');

module.exports = class Capybara {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_nombre, nueva_descripcion, nueva_imagen) {
        this.nombre = nuevo_nombre;
        this.descripcion = nueva_descripcion;
        this.imagen = nueva_imagen;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        return db.execute('INSERT INTO capybaras (nombre, descripcion, imagen) VALUES (?, ?, ?)',
            [this.nombre, this.descripcion, this.imagen]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM capybaras');
    }

    static fetchOne(capybara_id) {
        return db.execute('SELECT * FROM capybaras WHERE id=?', [capybara_id]);
    }

}
