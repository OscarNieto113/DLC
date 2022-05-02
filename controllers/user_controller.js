const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    response.render('login', {
      error: request.flash("error"),
    });
};

exports.login = (request, response, next) => {
    request.session.error = "";
    const email = request.body.correo_usuario;
    User.findOne(email)
    .then(([rows, fielData])=>{
        if (rows.length < 1) {
            request.flash('error', 'El usuario y/o contraseña no coinciden');
            return response.redirect('/users/login');
        }

        else {
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
                    request.session.error = "El usuario y/o contraseña son incorrectas";
                    response.redirect('/users/login');
                }).catch(err => {
                    request.session.error = "El usuario y/o contraseña son incorrectas";
                    response.redirect('/users/login');
                });
            }
        }).catch((error)=>{
            console.log(error)
        });

};

exports.get_signup = (request, response, next) => {
    response.render('signup', {
      success: request.flash("success"),
      error: request.flash("error"),
    });
};

exports.post_signup = (request, response, next) => {
  const correo_usuario = request.body.correo_usuario;
  const no_empleado = request.body.no_empleado;
  const contrasenia = request.body.contrasenia;
  const contrasenia2 = request.body.contrasenia2;
  const token = request.body.token;

  User.findOneEmpleado(no_empleado)
  .then(([rows2, fieldData]) => {
      User.findOne(correo_usuario)
      .then(([rows,fieldData]) => {
          User.getToken(no_empleado)
          .then(([rows3,fieldData]) => {
            console.log(token);
            console.log(rows3[0]);
            if (correo_usuario.length == 0 && no_empleado.length == 0 && contrasenia.length == 0 && contrasenia2.length == 0 && token.length == 0){
                request.flash('error','No se recibió ningún dato.');
                response.redirect('/users/signup');
            }

            else if (correo_usuario.length == 0 || no_empleado.length == 0 || contrasenia.length == 0 || contrasenia2.length == 0 || token.length == 0){
                request.flash('error','Te faltaron campos por llenar.');
                response.redirect('/users/signup');
            }

            else if (contrasenia != contrasenia2){
                request.flash('error','Las contraseñas no coinciden.');
                response.redirect('/users/signup');
            }

            else if(rows.length > 0){
                request.flash('error','El correo ya está en uso.');
                response.redirect('/users/signup');
            }

            else if(rows2[0] == undefined){
                request.flash('error','El número de empleado que ingresaste no existe.');
                response.redirect('/users/signup');
            }

            else{
                bcrypt.compare(token, rows3[0].token)
                .then(doMatch => {
                    if (doMatch) {
                        const nuevo_usuario =
                        new User(
                            correo_usuario,
                            contrasenia,
                            no_empleado
                        );
                        nuevo_usuario.save()
                        .then(() => {
                            console.log("Se guardo la solicitud");
                            //request.flash('success', 'Se registró el usuario con éxito');
                            response.redirect('/users/login');
                        }).catch(err => console.log(err));
                    }
                    request.flash('error', 'El token no coincide');
                    response.redirect('/users/signup');
                }).catch(err => {
                      request.flash('error', 'El token no coincide');
                      response.redirect('/users/signup');
                });
              }
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};




exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.root = (request, response, next) => {
    response.redirect('/users/login');
};
