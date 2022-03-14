const objetivo = [
    {id_objetivo: "1", nombre_objetivo: "Litros vendidos Enero 2020", descripcion_objetivo: "El objetivo de este mes es vender 200,000 litros en Querétaro"},
    {id_objetivo: "2", nombre_objetivo: "Litros vendidos Febrero 2020", descripcion_objetivo: "El objetivo de este mes es vender 220,000 litros en Querétaro"},
    {id_objetivo: "3", nombre_objetivo: "Litros vendidos Marzo 2020", descripcion_objetivo: "El objetivo de este mes es vender 240,000 litros en Querétaro"},
    {id_objetivo: "4", nombre_objetivo: "Litros vendidos Abril 2020", descripcion_objetivo: "El objetivo de este mes es vender 250,000 litros en Querétaro"},
];

module.exports = class Objetivo {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_id_objetivo, nuevo_nombre_objetivo, nuevo_descripcion_objetivo) {
        this.id_objetivo = nuevo_id_objetivo;
        this.nombre_objetivo = nuevo_nombre_objetivo;
        this.descripcion_objetivo = nuevo_descripcion_objetivo;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        objetivo.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return objetivo;
    }

}
