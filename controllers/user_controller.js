const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    response.render('login', {
        correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
        info: ''
    });
};

exports.login = (request, response, next) => {
    request.session.error = "";
    const email = request.body.correo_usuario;
    User.findOne(email)
        .then(([rows, fielData])=>{
            //Si no existe el usuario, redirige a la pantalla de login
            if (rows.length < 1) {
                request.session.error = "El usuario y/o contraseña no coinciden";
                return response.redirect('/users/login');
            }

            const user = new User(rows[0].correo_usuario, rows[0].contrasenia, rows[0].no_empleado);
            bcrypt.compare(request.body.contrasenia, user.contrasenia)
                .then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.user = user;
                        request.session.user_no_empleado = user.no_empleado;
                        return request.session.save(err => {
                            response.redirect('/dlc');
                        });
                    }
                    response.redirect('/users/login');
                }).catch(err => {
                    response.redirect('/users/login');
                });
        }).catch((error)=>{
            console.log(error)
        });

};

exports.get_signup = (request, response, next) => {
    response.render('signup', {
        correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
        info: ''
    });
};

exports.post_signup = (request, response, next) => {
    const user =
        new User(request.body.correo_usuario, request.body.contrasenia, request.body.no_empleado);
    user.save()
        .then(()=>{
            response.redirect('/users/login');
        }).catch((error)=>{
            console.log(error);
        });
};

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.root = (request, response, next) => {
    response.redirect('/users/login');
};
