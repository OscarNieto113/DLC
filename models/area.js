const db = require ('../util/database')

module.exports = class Area {
  constructor(nuevo_id_area, nuevo_nombre_area) {
      this.id_area = nuevo_id_area;
      this.nombre_area = nuevo_nombre_area;
  }

  //Este método servirá para guardar de manera persistente el nuevo objeto.
  save() {
    return db.execute('INSERT INTO ng_block (nombre_area) VALUES (?)',
        [this.nombre_area]);
  }

  //Este método servirá para devolver los objetos del almacenamiento persistente.
  static fetchAll() {
      return db.execute('SELECT * FROM area');
  }

}
