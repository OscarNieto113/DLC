const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_correo_usuario, nuevo_contrasenia, nuevo_no_empleado) {
        this.correo_usuario = nuevo_correo_usuario;
        this.contrasenia = nuevo_contrasenia;
        this.no_empleado = nuevo_no_empleado;
    }


    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        return bcrypt.hash(this.contrasenia, 12)
            .then((password_cifrado)=>{
                return db.execute(
                    'INSERT INTO usuario (correo_usuario, contrasenia, no_empleado) VALUES(?,?,?)',
                    [this.correo_usuario, password_cifrado, this.no_empleado]);
            }).catch((error)=>{
                console.log(error);
            });
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static findOne(correo_usuario) {
        return db.execute('SELECT * FROM usuario WHERE correo_usuario=?',
            [correo_usuario]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM usuario ORDER BY nombre ASC');
    }

}
