import facturaModel from '../models/factura.model.js';
import { resumenFacturasFecha } from '../services/facturas.services.js';

export function mostrarFormulario(req, res) {
    res.render('facturacion', { titulo: 'Facturación' });
};

export async function mostrarReporteDiario(req, res) {
    const { fecha } = req.query;

    const { facturas, efectivo, totalTransacciones, transferencia, entradaTotal } = await resumenFacturasFecha(fecha);

    res.render('reportediario', {
        titulo: 'Reporte Diario',
        facturas,
        fecha,
        efectivo,
        entradaTotal,
        transferencia,
        totalTransacciones
    });
};