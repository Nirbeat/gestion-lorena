import facturaModel from '../models/factura.model.js';

export function mostrarFormulario(req, res) {
    res.render('facturacion', { titulo: 'Facturación' });
};

export async function mostrarReporteDiario(req, res) {
    const { fecha } = req.query;

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

    res.render('reportediario', {
        titulo: 'Reporte Diario',
        facturas,
        fecha,
        efectivo,
        entradaTotal,
        transferencia,
        totalTransacciones: facturas.length
    });
};