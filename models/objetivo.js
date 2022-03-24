const db = require ('../util/database')

module.exports = class Objetivo {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_nombre_objetivo, nuevo_descripcion_objetivo) {
        this.nombre_objetivo = nuevo_nombre_objetivo;
        this.descripcion_objetivo = nuevo_descripcion_objetivo;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO objetivo (nombre_objetivo, descripcion_objetivo) VALUES (?, ?)',
          [this.nombre_objetivo, this.descripcion_objetivo]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM objetivo');
    }

}
