const vacaciones = [
    {folio: "1", no_empleado: "20", responsable_ausencia: "Oscar", observaciones: "NATDEV", reanudacion_labores: "2022-04-11"
    , primer_dia: "2022-04-05", ultimo_dia: "2022-04-08", fecha_solicitud: "2022-03-09", dias_solicitados: "5", estatus_vacaciones: "Pendiente"},
    {folio: "1", no_empleado: "20", responsable_ausencia: "Oscar", observaciones: "NATDEV", reanudacion_labores: "2022-04-11"
    , primer_dia: "2022-04-05", ultimo_dia: "2022-04-08", fecha_solicitud: "2022-03-09", dias_solicitados: "5", estatus_vacaciones: "Pendiente"},
    {folio: "1", no_empleado: "20", responsable_ausencia: "Oscar", observaciones: "NATDEV", reanudacion_labores: "2022-04-11"
    , primer_dia: "2022-04-05", ultimo_dia: "2022-04-08", fecha_solicitud: "2022-03-09", dias_solicitados: "5", estatus_vacaciones: "Pendiente"},
    {folio: "1", no_empleado: "20", responsable_ausencia: "Oscar", observaciones: "NATDEV", reanudacion_labores: "2022-04-11"
    , primer_dia: "2022-04-05", ultimo_dia: "2022-04-08", fecha_solicitud: "2022-03-09", dias_solicitados: "5", estatus_vacaciones: "Pendiente"},
];

module.exports = class Vacaciones {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_folio, nuevo_no_empleado, nuevo_responsable_ausencia, nuevo_observaciones, nuevo_reanudacion_labores, nuevo_primer_dia, nuevo_ultimo_dia, nuevo_fecha_solicitud, nuevo_dias_solicitados, nuevo_estatus_vacaciones) {
        this.folio = nuevo_folio;
        this.no_empleado = nuevo_no_empleado;
        this.responsable_ausencia = nuevo_responsable_ausencia;
        this.observaciones = nuevo_observaciones;
        this.reanudacion_labores = nuevo_reanudacion_labores;
        this.primer_dia = nuevo_primer_dia;
        this.ultimo_dia = nuevo_ultimo_dia;
        this.fecha_solicitud = nuevo_fecha_solicitud;
        this.dias_solicitados = nuevo_dias_solicitados;
        this.estatus_vacaciones = nuevo_estatus_vacaciones;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        vacaciones.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return vacaciones;
    }

}
