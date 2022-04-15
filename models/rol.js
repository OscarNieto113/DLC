const db = require ('../util/database')

module.exports = class rol {
  constructor(nuevo_nombre_rol) {
      this.nombre_rol = nuevo_nombre_rol;
  }

  //Este método servirá para guardar de manera persistente el nuevo objeto.
  save() {
    return db.execute('INSERT INTO rol (nombre_rol) VALUES (?)',
        [this.nombre_rol]);
  }

  //Este método servirá para devolver los objetos del almacenamiento persistente.
  static fetchAll() {
      return db.execute('SELECT * FROM rol');
  }

  static modifyRol(id_rol, no_empleado) {
      return db.execute(
        'UPDATE empleado ' +
          'SET id_rol =  ? ' +
        'WHERE ' +
          'no_empleado = ? ', [id_rol, no_empleado]);
  }
}
