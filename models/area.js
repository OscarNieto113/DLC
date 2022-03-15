const area = [
    {id_area: "1", nombre_area: "Marketing operaciones"},
    {id_area: "2", nombre_area: "Marketing Comercial"},
    {id_area: "3", nombre_area: "Infraestructura"},
    {id_area: "4", nombre_area: "Optimización e Inteligencia"},
];

module.exports = class Area {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_id_area, nuevo_nombre_area) {
        this.id_area = nuevo_id_area;
        this.nombre_area = nuevo_nombre_area;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        area.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return area;
    }

}
