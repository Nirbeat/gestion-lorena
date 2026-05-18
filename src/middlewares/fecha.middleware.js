export async function definirFechaConsulta(req, res, next) {
    if (!req.query.fecha) {
        const hoy = new Date(Date.now());

        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0');
        const day = String(hoy.getDate()).padStart(2, '0');

        req.query.fecha = `${year}-${month}-${day}`;
    }
    next();
}