const db = require ('../util/database')

module.exports = class Ciudad {
  constructor(nuevo_nombre_ciudad) {
      this.nombre_ciudad = nuevo_nombre_ciudad;
  }

  //Este método servirá para guardar de manera persistente el nuevo objeto.
  save() {
    return db.execute('INSERT INTO ciudad (nombre_ciudad) VALUES (?)',
        [this.nombre_ciudad]);
  }

  //Este método servirá para devolver los objetos del almacenamiento persistente.
  static fetchAll() {
      return db.execute('SELECT * FROM ciudad');
  }
  
}
