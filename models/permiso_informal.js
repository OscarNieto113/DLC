module.exports = class Permiso_informal {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_id_permiso_informal, nuevo_min_permiso_informal, nuevo_permisos_anio) {
        this.id_permiso_informal = nuevo_id_permiso_informal;
        this.min_permiso_informal = nuevo_min_permiso_informal;
        this.permisos_anio = nuevo_permisos_anio;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        permiso_informal.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return permiso_informal;
    }

}
