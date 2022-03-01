/**
 * Arquivo: Printer.js
 * Descrição: classe que constrói um objeto Impressora e faz as requisições CRUD junto à API
 * Data: 28/02/2022
 * Autor: Israel Amaral
 */

const url = "http://localhost:3000/api/printers";

class Printer {
    constructor(serialNumber, manufacturer, model) {
        this.serialNumber = serialNumber;
        this.manufacturer = manufacturer;
        this.model = model;
    }

    // --- CRUD ---

    static create(printer) {
        axios.post(url, printer)
            .then(response => {
                console.log(JSON.stringify(response.data));
            })
            .catch(error => console.log(error));
    };

    static async read() {
        const response = await axios.get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(error));

        return response;
    }

    static update(updatedPrinter, id) {
        axios.put(`${url}/${id}`, updatedPrinter)
            .then(response => {
                console.log(JSON.stringify(response.data));
            })
            .catch(error => console.log(error));
    };

    static async delete(serialNumber) {
        const printers = await Printer.read();
        let id;

        printers.forEach((printer) => {
            if (printer.serial_number === serialNumber) {
                id = printer.id;
            }
        });

        axios.delete(`${url}/${id}`)
            .then(response => {
                console.log(JSON.stringify(response.data));
            })
            .catch(error => console.log(error));
    };
};

export { Printer }