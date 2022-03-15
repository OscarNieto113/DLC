const cumpleanios_mes = [
    {id_area: "1", nombre_area: "Marketing operaciones"},
    {id_area: "2", nombre_area: "Marketing Comercial"},
    {id_area: "3", nombre_area: "Infraestructura"},
    {id_area: "4", nombre_area: "Optimización e Inteligencia"},
];

module.exports = class Cumpleanios_mes {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_fecha_union, nuevo_puesto, nuevo_no_empleado, nuevo_id_area) {
        this.fecha_union = nuevo_fecha_union;
        this.puesto = nuevo_puesto;
        this.no_empleado = nuevo_no_empleado;
        this.id_area = nuevo_id_area;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        cumpleanios_mes.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return cumpleanios_mes;
    }

}
