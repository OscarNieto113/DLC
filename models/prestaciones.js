const db = require ('../util/database')

module.exports = class Prestaciones {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_max_prestaciones, nuevo_min_prestaciones, nuevo_dias_prestaciones) {
        this.min_prestaciones = nuevo_min_prestaciones;
        this.max_prestaciones = nuevo_max_prestaciones;
        this.dias_prestaciones = nuevo_dias_prestaciones;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO prestaciones (min_prestaciones, max_prestaciones, dias_prestaciones) VALUES (?, ?, ?)',
          [this.min_prestaciones, this.max_prestaciones, this.dias_prestaciones]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
      return db.execute(
        'SELECT id_prestaciones, max_prestaciones, min_prestaciones, dias_prestaciones ' +
        'FROM prestaciones ');
    }

    static updatePrestaciones(max_prestaciones, min_prestaciones, dias_prestaciones, id_prestaciones) {
        return db.execute(
          'UPDATE prestaciones ' +
          'SET max_prestaciones =  ?, ' +
						'min_prestaciones = ?, ' +
            'dias_prestaciones = ? ' +
					'WHERE id_prestaciones = ? ', [max_prestaciones, min_prestaciones, dias_prestaciones, id_prestaciones]);
    }

    static deletePrestaciones(id_prestaciones) {
        return db.execute(
          'DELETE FROM prestaciones ' +
            'WHERE ' +
					'id_prestaciones = ? ', [id_prestaciones]);
    }


}
