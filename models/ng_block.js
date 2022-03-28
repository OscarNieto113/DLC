const db = require ('../util/database')

module.exports = class Ng_Block {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_no_empleado, nuevo_turno_ng_block, nuevo_descripcion_ng_block, nuevo_fecha_uso_ng_block, nuevo_estatus_ng_block) {
        this.no_empleado = nuevo_no_empleado;
        this.turno_ng_block = nuevo_turno_ng_block;
        this.descripcion_ng_block = nuevo_descripcion_ng_block;
        this.fecha_uso_ng_block = nuevo_fecha_uso_ng_block;
        this.estatus_ng_block = nuevo_estatus_ng_block;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO ng_block (no_empleado, turno_ng_block, descripcion_ng_block, fecha_uso_ng_block, estatus_ng_block) VALUES (?, ?, ?, ?, ?)',
          [this.no_empleado, this.turno_ng_block, this.descripcion_ng_block, this.fecha_uso_ng_block, this.estatus_ng_block]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(
          'SELECT * FROM ng_block');
    }

    static fetchSome(no_empleado) {
        return db.execute(
          'SELECT turno_ng_block, descripcion_ng_block, fecha_uso_ng_block, estatus_ng_block, ng.no_empleado ' +
          'FROM empleado e, ng_block ng ' +
          'WHERE e.no_empleado = ng.no_empleado AND ng.no_empleado=?', [no_empleado]);
    }


    static fetchOne(id_ng_block) {
        return db.execute('SELECT * FROM ng_block WHERE id=?', [id_ng_block]);
    }

}
