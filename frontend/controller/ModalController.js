/**
 * Arquivo: ModalController.js
 * Descrição: arquivo responsável por controlar o Modal de atualização de dados
 * Data: 28/02/2022
 * Autor: Israel Amaral
 */

import { Printer } from '../model/Printer.js';

class Modal {
    static open() {
        document.querySelector('.modal').style.display = 'block';
    };

    static close() {
        document.querySelector('.modal').style.display = 'none';
    };

    static async fillFields(serialNumberUI) {
        const printers = await Printer.read();

        // preenche o modal com os valores da impressora
        printers.forEach((printer) => {
            if (printer.serial_number === serialNumberUI) {
                document.querySelector('#serialNumber_modal').value = printer.serial_number;
                document.querySelector('#manufacturer_modal').value = printer.manufacturer;
                document.querySelector('#model_modal').value = printer.model;
            }
        });
    };

    static getValues() {
        return {
            serialNumber: document.querySelector('#serialNumber_modal').value,
            manufacturer: document.querySelector('#manufacturer_modal').value,
            model: document.querySelector('#model_modal').value
        }
    };

    static validateFields() {
        const { serialNumber, manufacturer, model } = this.getValues();

        if (serialNumber === ''
            || manufacturer === ''
            || model === ''
        ) {
            UI.showAlert('Por favor, preencha todos os campos', 'danger');
            return false;
        }
        return true;
    };

    static clearFields() {
        document.querySelector('#serialNumber_modal').value = '';
        document.querySelector('#manufacturer_modal').value = '';
        document.querySelector('#model_modal').value = '';
    };

    static async submit(event) {
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if (isValid) {
                let { serialNumber, manufacturer, model } = this.getValues();

                const printers = await Printer.read();
                let id;

                printers.forEach((printer) => {
                    if (printer.serial_number === serialNumber) {
                        id = printer.id;
                    }
                });

                const updatedPrinter = {
                    id,
                    serialNumber,
                    manufacturer,
                    model
                }

                Printer.update(updatedPrinter, id);
                location.reload();
            }
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Modal }