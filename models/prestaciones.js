const db = require ('../util/database')

module.exports = class Prestaciones {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(id_prestaciones, max_prestaciones, min_prestaciones, dias_prestaciones) {
        this.id_prestaciones = id_prestaciones;
        this.max_prestaciones = max_prestaciones;
        this.min_prestaciones = min_prestaciones;
        this.dias_prestaciones = dias_prestaciones;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        prestaciones.push(this);
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


}
