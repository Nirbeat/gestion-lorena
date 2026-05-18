import ExcelJS from 'exceljs';
import { root } from '../utils.js';

const workbook = new ExcelJS.Workbook();
const filePath = root + "/excel/factura.xlsx"
export async function createSheet(data) {

    const file = await workbook.xlsx.readFile(filePath);
    const sheet = file.getWorksheet("Hoja1");

    sheet.getCell("D2").value = `Fecha de pago:         ${new Date(Date.now()).toLocaleDateString("es-AR", { timeZone: "UTC" })}`;
    sheet.getCell("D22").value = `Fecha de pago:         ${new Date(Date.now()).toLocaleDateString("es-AR", { timeZone: "UTC" })}`;

    sheet.getCell("D4").value = `Número de Cuota:   ${data.cuota}`;
    sheet.getCell("D24").value = `Número de Cuota:   ${data.cuota}`;

    sheet.getCell("D6").value = `${data.compania}`;
    sheet.getCell("D26").value = `${data.compania}`;

    sheet.getCell("D7").value = `${data.asegurado}`;
    sheet.getCell("D27").value = `${data.asegurado}`;

    sheet.getCell("D9").value = `${data.nroPoliza}`;
    sheet.getCell("D29").value = `${data.nroPoliza}`;

    if (data.tipoDeVehiculo == "auto") {
        sheet.getCell("C10").value = "X";
        sheet.getCell("C30").value = "X";
    }

    if (data.tipoDeVehiculo == "moto") {
        sheet.getCell("C11").value = "X";
        sheet.getCell("C31").value = "X";
    }

    sheet.getCell("D12").value = `${data.vehiculo}`;
    sheet.getCell("D32").value = `${data.vehiculo}`;

    sheet.getCell("D13").value = `${data.dominio}`;
    sheet.getCell("D33").value = `${data.dominio}`;

    sheet.getCell("D14").value = `${data.cobertura}`;
    sheet.getCell("D34").value = `${data.cobertura}`;

    sheet.getCell("D15").value = `${data.otros}`;
    sheet.getCell("D35").value = `${data.otros}`;

    sheet.getCell("D16").value = `IMPORTE: $  ${data.importe}`;
    sheet.getCell("D36").value = `IMPORTE: $  ${data.importe}`;

    sheet.getCell("D17").value = `PRÓXIMO VENCIMIENTO: ${new Date(data.proxVencimiento).toLocaleDateString("es-AR", { timeZone: "UTC" })}`;
    sheet.getCell("D37").value = `PRÓXIMO VENCIMIENTO: ${new Date(data.proxVencimiento).toLocaleDateString("es-AR", { timeZone: "UTC" })}`;

    sheet.getCell("C38").value = `${data.recargo ?? ""}`;
    sheet.getCell("C18").value = `${data.recargo ?? ""}`;

    await workbook.xlsx.writeFile(filePath);
}
