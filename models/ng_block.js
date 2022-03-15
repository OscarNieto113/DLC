const ng_block = [
    {id_ng_block: "1", turno_ng_block: "Matutino", descripcion_ng_block: "Tengo que ir al médico", fecha_uso_ng_block: "2022-02-10", fecha_solicitud_ng_block: "2022-02-09", estatus_ng_block: "'Pendiente'", no_empleado: "5",},
    {id_ng_block: "2", turno_ng_block: "Matutino", descripcion_ng_block: "Problemas personales", fecha_uso_ng_block: "2022-02-15", fecha_solicitud_ng_block: "2022-01-09", estatus_ng_block: "'Aprobado'", no_empleado: "49",},
    {id_ng_block: "3", turno_ng_block: "Matutino", descripcion_ng_block: "Emergencia familiar", fecha_uso_ng_block: "2022-03-22", fecha_solicitud_ng_block: "2022-02-12", estatus_ng_block: "'Pendiente'", no_empleado: "49",},
    {id_ng_block: "4", turno_ng_block: "Vespertino", descripcion_ng_block: "Tengo que recoger a mis hijos.", fecha_uso_ng_block: "2022-04-22", fecha_solicitud_ng_block: "2022-03-11", estatus_ng_block: "'Aprobado'", no_empleado: "47",},
    {id_ng_block: "5", turno_ng_block: "Vespertino", descripcion_ng_block: "Un familiar ha fallecido.", fecha_uso_ng_block: "2022-06-07", fecha_solicitud_ng_block: "2022-05-05", estatus_ng_block: "'Pendiente'", no_empleado: "46",},

];

module.exports = class Ng_Block {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_id_ng_block, nuevo_turno_ng_block, nuevo_descripcion_ng_block, nuevo_fecha_uso_ng_block, nuevo_fecha_solicitud_ng_block, nuevo_estatus_ng_block, nuevo_no_empleado) {
        this.id_ng_block = nuevo_id_ng_block;
        this.turno_ng_block = nuevo_turno_ng_block;
        this.descripcion_ng_block = nuevo_descripcion_ng_block;
        this.fecha_uso_ng_block = nuevo_fecha_uso_ng_block;
        this.fecha_solicitud_ng_block = nuevo_fecha_solicitud_ng_block;
        this.estatus_ng_block = nuevo_estatus_ng_block;
        this.no_empleado = nuevo_no_empleado;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        ng_block.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return ng_block;
    }

}
