const db = require ('../util/database')

module.exports = class Noticia {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_imagen_noticia) {
        this.imagen_noticia = nuevo_imagen_noticia;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO noticia (imagen_noticia) VALUES (?)',
          [this.imagen_noticia]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM noticia');
    }

    static fetchOne(id_noticia) {
        return db.execute('SELECT imagen_noticia FROM noticia WHERE id=?', [id_noticia]);
    }

}
