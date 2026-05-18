import { Schema, Types, model } from "mongoose";

const aseguradoSchema = new Schema({
    asegurado: {
        type: String,
        required: true,
        trim: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    dominio: {
        type: String,
        trim: true,
        unique: true
    },
    nroPoliza: {
        type: String,
        required: true,
        trim: true,
    },
    compania: {
        type: String,
        required: true,
        trim: true,
    },
    tipoDeVehiculo: {
        type: String,
        enum: ['moto', 'auto'],
    },
    vehiculo: {
        type: String,
        required: true,
        trim: true,
    },
    cobertura: {
        type: String,
        required: true,
        trim: true,
    },
    importeCuotaActual: {
        type: Number,
        required: true,
        min: 0,
    },
    proxVencimiento: {
        type: Date,
        required: true,
    },
    otros: {
        type: String,
        trim: true,
    }
});

const facturaModel = model('asegurado', aseguradoSchema);

export default facturaModel;