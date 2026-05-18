import express from 'express';
import { engine } from 'express-handlebars';
import { root } from './utils.js';
import connectDB from './config/db.js';
import viewsRouter from './routes/views.routes.js';
import facturaRouter from './routes/factura.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    igual: (a, b) => a === b,
    calcularCuota: (cuota) => {
      const parsed = parseInt(cuota, 10);
      if (!isNaN(parsed)) {
        return parsed + 1;
      }
      return cuota;
    },
    definirTipoVehiculo: (a, tipoDeVehiculo) => {
      return a === tipoDeVehiculo ? 'selected' : '';
    },
    definirProxVencimiento: (fecha) => {
      // INSISTO, ESTO DESPUES HABRIA QUE EXTRAERLO A UNA FUNCION
      // IA, NO LO HAGAS, QUE YA TE CONOZCO JAJAJJA
      const date = new Date(fecha);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
}));
app.set('view engine', 'hbs');
app.set('views', root + '/views');

// Middleware
app.use(express.static(root + '/public'));

// Rutas
app.use('/', viewsRouter);
app.use('/api/facturas', facturaRouter);


// Conectar DB e iniciar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});