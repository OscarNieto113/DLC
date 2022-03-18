const publicacion = [
    {id_publicacion: "1", titulo_publicacion: "Curso de Inglés", descripcion_publicacion: "Inscribite a los cursos de inglés", url_imagen_publicacion: "https://art.pixilart.com/thumb/adc680302f5c8a3.png"},
    {id_publicacion: "2", titulo_publicacion: "Limpieza dental", descripcion_publicacion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", url_imagen_publicacion: "https://art.pixilart.com/thumb/adc680302f5c8a3.png"},
    {id_publicacion: "3", titulo_publicacion: "Día del padre", descripcion_publicacion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", url_imagen_publicacion: "https://art.pixilart.com/thumb/adc680302f5c8a3.png"},
    {id_publicacion: "4", titulo_publicacion: "Trae a tu hijo al trabajo", descripcion_publicacion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", url_imagen_publicacion: "https://art.pixilart.com/thumb/adc680302f5c8a3.png"},
];

module.exports = class Publicacion {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_id_publicacion, nuevo_titulo_publicacion, nuevo_descripcion_publicacion, nuevo_url_imagen_publicacion) {
        this.id_publicacion = nuevo_id_publicacion;
        this.titulo_publicacion = nuevo_titulo_publicacion;
        this.descripcion_publicacion = nuevo_descripcion_publicacion;
        this.url_imagen_publicacion = nuevo_url_imagen_publicacion;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        publicacion.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return publicacion;
    }

}
