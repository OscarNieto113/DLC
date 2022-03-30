const db = require ('../util/database')

module.exports = class Publicacion {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_titulo_publicacion, nuevo_descripcion_publicacion, nuevo_imagen_publicacion) {
        this.titulo_publicacion = nuevo_titulo_publicacion;
        this.descripcion_publicacion = nuevo_descripcion_publicacion;
        this.imagen_publicacion = nuevo_imagen_publicacion;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO publicacion (titulo_publicacion, descripcion_publicacion, imagen_publicacion) VALUES (?, ?, ?)',
          [this.titulo_publicacion, this.descripcion_publicacion, this.imagen_publicacion]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM publicacion');
    }

    static fetchOne(id_publicacion) {
        return db.execute('SELECT imagen_publicacion FROM publicacion WHERE id=?', [id_publicacion]);
    }

}
