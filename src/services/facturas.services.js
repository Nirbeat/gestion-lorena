import facturaModel from "../models/factura.model.js";

export async function resumenFacturasFecha(fecha) {

    const inicioDia = new Date(`${fecha}T00:00:00.000Z`);
    const finDia = new Date(`${fecha}T23:59:59.999Z`);
    const facturas = await facturaModel.find({
        fechaDePago: {
            $gte: inicioDia,
            $lte: finDia,
        },
    }).sort({ _id: -1 }).lean();

    let efectivo = 0;
    let transferencia = 0;
    let entradaTotal = 0;

    facturas.forEach(factura => {
        if (!factura.esTransferencia) {
            efectivo += factura.importe
        } else {
            transferencia += factura.importe + factura.recargo
        }
    });

    entradaTotal = efectivo + transferencia;

    return {
        facturas, entradaTotal, efectivo, transferencia, totalTransacciones: facturas.length
    }
} 
