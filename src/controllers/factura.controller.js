import { createSheet } from '../excel/crearExcel.js';
import facturaModel from '../models/factura.model.js';
import { root } from '../utils.js';

export async function crearFactura(req, res, next) {
  try {

    const factura = await facturaModel.create(req.body)
    createSheet(factura)
      .then(async () => {
        // const aseguradoExiste = await facturaModel.findOne({ dominio: factura.dominio });
        // if (aseguradoExiste == null) {
        //   await facturaModel.create({
        //     nombre: factura.asegurado,
        //     dominio: factura.dominio,
        //     próximoImporte: factura.importe,
        //     proximoVencimiento: factura.proxVencimiento,
        //     recargo: factura.recargo,
        //     vigente: true
        //   })
        //   res.redirect("/asegurados" + "?dominio=" + factura.dominio)

        // }
        res.download(root + "/excel/factura.xlsx")
      })
  } catch (error) {
    next(error)
  }
};

export async function mostrarReporteDiario(req, res, next) {
  const { fecha } = req.query;
  const fechaConsulta = fecha ? new Date(fecha) : new Date();

  const facturas = await facturaModel.find({
    fechaDePago: {
      $gte: new Date(fechaConsulta.setHours(0, 0, 0, 0)),
      $lte: new Date(fechaConsulta.setHours(23, 59, 59, 999)),
    },
  }).sort({ createdAt: -1 });

  res.render('reportediario', {
    titulo: 'Reporte Diario',
    facturas,
    fecha: fecha || '',
  });
};
