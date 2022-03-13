$(function() {
    $('#datepicker').datepicker({
      format: 'yyyy-mm-dd'
    });
});

function formatoFecha(fecha, formato) {
    const map = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(-2),
        yyyy: fecha.getFullYear()
    }

    return formato.replace(/yyyy-mm-dd/gi, matched => map[matched])
}
