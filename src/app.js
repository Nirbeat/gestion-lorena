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
  },
}));
app.set('view engine', 'hbs');
app.set('views', root + '/views');

// Middleware
app.use(express.static(root + '/public'));

// Helper local para año en el footer
app.use((req, res, next) => {
  // DEBERIA HACER UN OBJETO GLOBAL CON LA FECHA?????
  res.locals.year = new Date().getFullYear();
  next();
});

// Rutas
app.use('/', viewsRouter);
app.use('/api/facturas', facturaRouter);


// Conectar DB e iniciar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
