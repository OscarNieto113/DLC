const referidos = [];

module.exports = class Referidos {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_url_referidos, nuevo_nombre_referidos, nuevo_url_imagen_referidos) {
        this.url_referidos = url_referidos;
        this.nombre_referidos = nombre_referidos;
        this.url_imagen_referidos = url_imagen_referidos;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        referidos.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return referidos;
    }

}
