
const nps = [
    {id_reporte_mensual: "1", fecha_reporte_mensual: "24/03/2022", titulo_reporte_mensual: "Net Promoted Score Marzo", descripcion_reporte_mensual: "El NPS general disminuye 6 puntos, principalmente por una apreciación de exceso de costo en el GNV", detractores: "4", promotores: "75", pasivos: "21"},
    {id_reporte_mensual: "2", fecha_reporte_mensual: "24/04/2022", titulo_reporte_mensual: "Net Promoted Score Abril", descripcion_reporte_mensual: "El NPS general disminuye 6 puntos, principalmente por una apreciación de exceso de costo en el GNV", detractores: "3", promotores: "76", pasivos: "21"},
    {id_reporte_mensual: "3", fecha_reporte_mensual: "24/05/2022", titulo_reporte_mensual: "Net Promoted Score Mayo", descripcion_reporte_mensual: "El NPS general disminuye 6 puntos, principalmente por una apreciación de exceso de costo en el GNV", detractores: "2", promotores: "77", pasivos: "21"}
];

module.exports = class NPS {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_id_reporte_mensual, nuevo_fecha_reporte_mensual, nuevo_titulo_reporte_mensual, nuevo_descripcion_reporte_mensual, nuevo_detractores, nuevo_promotores, nuevo_pasivos) {
        this.id_reporte_mensual = nuevo_id_reporte_mensual;
        this.fecha_reporte_mensual = nuevo_fecha_reporte_mensual;
        this.titulo_reporte_mensual = nuevo_titulo_reporte_mensual;
        this.descripcion_reporte_mensual = nuevo_descripcion_reporte_mensual;
        this.detractores = nuevo_detractores;
        this.promotores = nuevo_promotores;
        this.pasivos = nuevo_pasivos;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        nps.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return nps;
    }
}
