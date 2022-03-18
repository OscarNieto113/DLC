
const nps = [
    {promotores: "1", pasivos: "12", detractores: "12"},
    {promotores: "2", pasivos: "13", detractores: "13"},
    {promotores: "3", pasivos: "15", detractores: "15"},
    {promotores: "4", pasivos: "17", detractores: "17"},
];

module.exports = class NPS {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_detractores, nuevo_promotores, nuevo_pasivos) {
        this.detractores = nuevo_detractores;
        this.promotores = nuevo_promotores;
        this.pasivos = nuevo_pasivos;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        NPS.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return NPS;
    }
}
