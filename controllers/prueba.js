
exports.get_informacion_empleado = (request, response, next) => {
    console.log('Ruta /dlc');
    console.log(request.params.no_empleado);
    //console.log(request.get('Cookie').split('=')[1]);
    console.log(request.cookies);
    console.log('Ruta /dlc');
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    Empleado.fetchEmpleadoAll(request.params.no_empleado)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('datos_empleado', {
                empleado: rows,
                correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
                ultimo_empleado: request.cookies.ultimo_empleado ? request.cookies.ultimo_empleado : '',
                info: info //El primer info es la variable del template, el segundo la constante creada arriba
            });
        })
        .catch(err => {
            console.log(err);
        });
}
