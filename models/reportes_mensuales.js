const db = require ('../util/database')

module.exports = class Reportes_mensuales {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_titulo_reporte_mensual, nuevo_descripcion_reporte_mensual, nuevo_fecha_reporte_mensual, nuevo_imagen_reporte) {
        //this.id_reportes_mensuales = id_reportes_mensuales;
        this.titulo_reporte_mensual = nuevo_titulo_reporte_mensual;
        this.descripcion_reporte_mensual = nuevo_descripcion_reporte_mensual;
        this.fecha_reporte_mensual = nuevo_fecha_reporte_mensual;
        this.imagen_reporte = nuevo_imagen_reporte;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO reportes_mensuales (titulo_reporte_mensual, descripcion_reporte_mensual, fecha_reporte_mensual, imagen_reporte) VALUES (?, ?, ?, ?)',
          [this.titulo_reporte_mensual, this.descripcion_reporte_mensual, this.fecha_reporte_mensual, this.imagen_reporte]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM reportes_mensuales WHERE fecha_reporte_mensual BETWEEN (DATE_SUB(CURDATE(), INTERVAL 2 MONTH)) AND (CURDATE()) ');
    }

    static fetchSearch(search) {
        return db.execute(
          `SELECT id_reportes_mensuales, titulo_reporte_mensual, descripcion_reporte_mensual, imagen_reporte, date_format(fecha_reporte_mensual, '%d/%m/%Y') as fecha_reporte_mensual ` +
          'FROM reportes_mensuales ' +
          'WHERE fecha_reporte_mensual LIKE ? ', [search+'%']);
    }

    static deleteReportes(id_reportes_mensuales) {
        return db.execute(
          'DELETE FROM reportes_mensuales ' +
            'WHERE ' +
          'id_reportes_mensuales = ? ', [id_reportes_mensuales]);
    }

}
