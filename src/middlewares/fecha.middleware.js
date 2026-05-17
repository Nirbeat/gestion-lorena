export async function definirFechaConsulta(req, res, next) {
    if (!req.query.fecha) {
        const hoy = new Date();

        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');

        req.query.fecha = `${anio}-${mes}-${dia}`;
    }
    next();
}