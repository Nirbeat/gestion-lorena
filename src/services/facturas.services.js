import facturaModel from "../models/factura.model.js";

export async function resumenFacturasFecha(fecha) {

    const inicioDia = new Date(`${fecha}T00:00:00.000Z`);
    const finDia = new Date(`${fecha}T23:59:59.999Z`);
    const facturas = await facturaModel.find({
        fechaDePago: {
            $gte: inicioDia,
            $lte: finDia,
        },
    }).lean();

    let efectivo = 0;
    let transferencia = 0;
    let total = 0;
    let cantidadTransferencias = 0;
    let extras = 0;

    // ESTO QUIZAS SE PODRIA GESTIONAR CON UN HELPER DESDE LA VISTA?
    facturas.forEach(factura => {
        if (!factura.esTransferencia) {
            efectivo += factura.importe;
        } else {
            transferencia += factura.importe + factura.recargo
            cantidadTransferencias++;
            extras += factura.recargo;
        }
    });

    total = efectivo + transferencia;

    return {
        cantidadTransferencias, extras, facturas, total, efectivo, transferencia, totalPagos: facturas.length
    }
} 
