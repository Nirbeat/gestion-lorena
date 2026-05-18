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
        uppercase: true
    },
    asegurado: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    tipoDeVehiculo: {
        type: String,
        default: "---",
        enum: ['moto', 'auto', "---"]
    },
    cobertura: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    dominio: {
        type: String,
        trim: true,
        default: "---",
        uppercase: true
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
        trim: true,
        default: "---",
        uppercase: true
    },
    otros: {
        type: String,
        trim: true,
        default: "---",
        uppercase: true
    },
    // ACA IRIA EL DETALLE DE TIPO DE USO
    cuota: {
        type: String,
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