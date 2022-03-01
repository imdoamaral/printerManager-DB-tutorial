/**
 * Arquivo: FormController.js
 * Descrição: arquivo responsável por controlar as operações de envio de formulário
 * Data: 28/02/2022
 * Autor: Israel Amaral
 */

import { Printer } from '../model/Printer.js';
import { UI } from './UIController.js';

class Form {
    static getValues() {
        return {
            serialNumber: document.querySelector('#serialNumber').value,
            manufacturer: document.querySelector('#manufacturer').value,
            model: document.querySelector('#model').value
        }
    };

    static validateFields() {
        const { serialNumber, manufacturer, model} = this.getValues();

        if (serialNumber === ''
            || manufacturer === ''
            || model === ''
        ) {
            UI.showAlert('Por favor, preencha os campos NÚMERO DE SÉRIE, FABRICANTE E MODELO.', 'danger');
            return false;
        }
        return true;
    };

    static clearFields() {
        document.querySelector('#serialNumber').value = '';
        document.querySelector('#manufacturer').value = '';
        document.querySelector('#model').value = '';
    };

    static submit(event) {
        // evita o envio automático de formulário
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if (isValid) {
                const { serialNumber, manufacturer, model} = this.getValues();

                const printer = new Printer(serialNumber, manufacturer, model);

                Printer.create(printer);
                UI.addPrinter(printer);
                UI.showAlert('Impressora adicionada', 'success');
                this.clearFields();
            }
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Form }