const empleado = [
    {no_empleado: "A0178293", ng_blocks_restantes: "3", fecha_contratacion: "2018-12-30", fecha_nacimiento: "1977-11-04", correo_empresarial: "A01703067@natgas.com.mx", nombres_empleado: "Eros Giovanni", apellido_paterno: "Guillén", apellido_materno: "Velázquez", dias_vacaciones_restantes:"10", genero_empleado:"F"},
];

module.exports = class Empleado {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_no_empleado, nuevo_ng_blocks_restantes, nuevo_fecha_contratacion, nuevo_fecha_nacimiento, nuevo_correo_empresarial, nuevo_nombres_empleado, nuevo_apellido_paterno, nuevo_apellido_materno, nuevo_dias_vacaciones_restantes, nuevo_genero_empleado) {
        this.no_empleado = nuevo_no_empleado;
        this.ng_blocks_restantes = nuevo_ng_blocks_restantes;
        this.fecha_contratacion = nuevo_fecha_contratacion;
        this.fecha_nacimiento = nuevo_fecha_nacimiento;
        this.correo_empresarial = nuevo_correo_empresarial;
        this.nombres_empleado = nuevo_nombres_empleado;
        this.apellido_paterno = nuevo_apellido_paterno;
        this.apellido_materno = nuevo_apellido_materno;
        this.dias_vacaciones_restantes = nuevo_dias_vacaciones_restantes;
        this.genero_empleado = nuevo_genero_empleado;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      empleado.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return empleado;
    }
}
