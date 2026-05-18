import facturaModel from '../models/factura.model.js';
import { resumenFacturasFecha } from '../services/facturas.services.js';


/**
 * 
 * @param {import('express').Request} req 
 * @param {*} res 
 */
export async function mostrarFormulario(req, res, next) {
    try {
        const { buscarDominio } = req.query;
        if (!buscarDominio) {
            res.render('facturacion', { titulo: 'Facturación' });
        }
        else {
            const asegurado = await facturaModel.findOne({ dominio: buscarDominio }).sort({ proxVencimiento: -1 }).lean()
            if (asegurado != null) {
                res.render('facturacion', {
                    titulo: "facturación",
                    asegurado
                })
            }

        }
    } catch (error) {
        next(error)
    }
};

export async function mostrarReporteDiario(req, res, next) {
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