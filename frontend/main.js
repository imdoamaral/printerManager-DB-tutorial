/**
 * Arquivo: main.js
 * Descrição: arquivo responsável por capturar os eventos de click e fazer a chamada inicial dos métodos das classes
 * Data: 26/02/2022
 * Autor: Israel Amaral
 */

import { Printer } from './model/Printer.js';
import { Modal } from './controller/ModalController.js';
import { UI } from './controller/UIController.js';
import { Form } from './controller/FormController.js';

// ----- EVENTOS -----

// Evento: Listar impressoras
document.addEventListener('DOMContentLoaded', UI.showPrinters);

// Evento: Adicionar uma impressora
document.querySelector('#printer-form').addEventListener('submit', (event) => {
    Form.submit(event);
});

// Evento: Remover/Editar uma impressora
document.querySelector('#printer-list').addEventListener('click', (event) => {
    // remover
    if (event.target.classList.contains('delete')) {
        Printer.delete(event.target.parentElement.parentElement.firstElementChild.textContent);
        UI.removePrinter(event.target);
        UI.showAlert('Impressora deletada', 'success');
    }

    // editar
    if (event.target.classList.contains('edit')) {
        const serialNumberUI = event.target.parentElement.parentElement.firstElementChild.textContent;

        Modal.open();
        Modal.fillFields(serialNumberUI);

        document.querySelector('#modal-form').addEventListener('submit', (event) => {
            Modal.submit(event, serialNumberUI);
            Modal.close();
        });
    }
});