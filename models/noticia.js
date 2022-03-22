const db = require ('../util/database')

module.exports = class Noticia {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_id_noticia, nuevo_url_imagen_noticia) {
        this.id_noticia = nuevo_id_noticia;
        this.url_imagen_noticia = nuevo_url_imagen_noticia;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO noticia (url_imagen_noticia) VALUES (?)',
          [this.url_imagen_noticia]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM noticia');
    }

    static fetchOne(id_noticia) {
        return db.execute('SELECT * FROM noticia WHERE id=?', [id_noticia]);
    }

}
