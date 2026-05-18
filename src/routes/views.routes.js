import { Router } from 'express';
import { mostrarFormulario, mostrarReporteDiario } from '../controllers/views.controller.js';
import { definirFechaConsulta } from '../middlewares/fecha.middleware.js';
const router = Router();

router.get('/facturacion', mostrarFormulario);
router.get('/reportediario', definirFechaConsulta,
  mostrarReporteDiario
);
router.get("/asegurados", async (req, res) => {
  // const { dominio } = req.query;
  // let asegurado = null;
  // let error = null;

  // if (dominio) {
  //   const cleanDominio = dominio.trim();
  //   try {
  //     // Intentar coincidencia exacta
  //     let doc = await aseguradoModel.findOne({ dominio: cleanDominio }).lean();

  //     // Intentar coincidencia insensible a mayúsculas/minúsculas si no se encuentra
  //     if (!doc) {
  //       doc = await aseguradoModel.findOne({
  //         dominio: { $regex: new RegExp(`^${cleanDominio}$`, 'i') }
  //       }).lean();
  //     }

  //     if (doc) {
  //       asegurado = doc;
  //       if (asegurado.proximoVencimiento) {
  //         // ESTO HABRIA QUE EXTRAERLO A FUNCION
  //         const dateVal = new Date(asegurado.proximoVencimiento);
  //         const year = dateVal.getUTCFullYear();
  //         const month = String(dateVal.getUTCMonth() + 1).padStart(2, '0');
  //         const day = String(dateVal.getUTCDate()).padStart(2, '0');
  //         asegurado.proximoVencimientoFormated = `${year}-${month}-${day}`;
  //       }
  //     } else {
  //       error = `No se encontró ningún asegurado con el dominio "${cleanDominio}"`;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     error = "Ocurrió un error al buscar al asegurado";
  //   }
  // }

  // res.render("asegurados", {
  //   titulo: "Asegurados",
  //   asegurado,
  //   dominio,
  //   error
  // });
});
router.use(async (error, req, res, next) => {
  res.send("ocurrio un error inesperado")
})
export default router;
