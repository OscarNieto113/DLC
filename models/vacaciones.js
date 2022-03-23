const db = require ('../util/database')

module.exports = class Vacaciones {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_folio, nuevo_no_empleado, nuevo_responsable_ausencia, nuevo_observaciones, nuevo_reanudacion_labores, nuevo_fecha_primer_dia, nuevo_fecha_ultimo_dia, nuevo_fecha_solicitud, nuevo_dias_solicitados, nuevo_estatus_vacaciones) {
        this.folio = nuevo_folio;
        this.no_empleado = nuevo_no_empleado;
        this.responsable_ausencia = nuevo_responsable_ausencia;
        this.observaciones = nuevo_observaciones;
        this.reanudacion_labores = nuevo_reanudacion_labores;
        this.fecha_primer_dia = nuevo_fecha_primer_dia;
        this.fecha_ultimo_dia = nuevo_ultimo_dia;
        this.fecha_solicitud = nuevo_fecha_solicitud;
        this.dias_solicitados = nuevo_dias_solicitados;
        this.estatus_vacaciones = nuevo_estatus_vacaciones;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO vacaciones (no_empleado, responsable_ausencia, observaciones, reanudacion_labores, primer_dia, ultimo_dia, fecha_solicitud, dias_solicitados, estatus_vacaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [this.no_empleado, this.responsable_ausencia, this.observaciones, this.reanudacion_labores, this.fecha_primer_dia, this.fecha_ultimo_dia, this.fecha_solicitud, this.dias_solicitados, this.estatus_vacaciones]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM vacaciones');
    }

    static fetchOne(folio) {
        return db.execute('SELECT * FROM vacaciones WHERE id=?', [folio]);
    }

}
