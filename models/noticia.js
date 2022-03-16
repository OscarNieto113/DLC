const noticia = [
    {id_noticia: "0", url_imagen_noticia: "https://i.ibb.co/9yk4DH7/image.png"},
    {id_noticia: "1", url_imagen_noticia: "https://i.ibb.co/9yk4DH7/image.png"},
    {id_noticia: "2", url_imagen_noticia: "https://i.ibb.co/9yk4DH7/image.png"},
    {id_noticia: "3", url_imagen_noticia: "https://i.ibb.co/9yk4DH7/image.png"},
];

module.exports = class Noticia {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_id_noticia, nuevo_url_imagen_noticia) {
        this.id_noticia = nuevo_id_noticia;
        this.url_imagen_noticia = nuevo_url_imagen_noticia;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        noticia.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return noticia;
    }

}
