import { Schema, model } from "mongoose";

const facturaSchema = new Schema({
    fechaDePago: {
        type: Date,
        default: new Date()
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
    asegurado: {
        type: String,
        required: true,
        trim: true,
    },
    tipoDeVehiculo: {
        type: String,
        required: true,
        enum: ['moto', 'auto'],
    },
    cobertura: {
        type: String,
        required: true,
        trim: true,
    },
    dominio: {
        type: String,
        required: true,
        trim: true,
    },
    importe: {
        type: Number,
        required: true,
        min: 0,
    },
    proxVencimiento: {
        type: Date,
        required: true,
    },
    vehiculo: {
        type: String,
        required: true,
        trim: true,
    },
    otros: {
        type: String,
        required: true,
        trim: true,
    },
    // ACA IRIA EL DETALLE DE TIPO DE USO
    cuota: {
        type: Number,
        required: true,
        min: 0,
    },
    esTransferencia: {
        type: Boolean,
        default: false,
    },
    recargo: {
        type: Number,
        default: 0,
        min: 0,
    },
});

const facturaModel = model('factura', facturaSchema);

export default facturaModel;