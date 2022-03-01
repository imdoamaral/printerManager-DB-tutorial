// const { restart } = require('nodemon');
// const { parse } = require('pg-protocol');
const db = require('../config/database');

// Método responsável por CRIAR uma nova Impressora
exports.createPrinter = async (req, res) => {
    const { 
        serialNumber,
        manufacturer,
        model
    } = req.body;

    const { rows } = await db.query(
        `INSERT INTO printers (
            serial_number, 
            manufacturer, 
            model
        ) VALUES ($1, $2, $3)`,
        [
            serialNumber, 
            manufacturer, 
            model
        ]
    );

    res.status(201).send({
        message: "Printer added successfully!",
        body: {
            printer: { 
                serialNumber,
                manufacturer, 
                model
            }
        },
    });
};

// Método responsável por LISTAR todas as impressoras
exports.listAllPrinters = async (req, res) => {
    const response = await db.query('SELECT * FROM printers ORDER BY manufacturer ASC');
    
    res.status(200).send(response.rows);
};

// Método responsável por ATUALIZAR uma Impressora pelo seu ID
exports.updatePrinterById = async (req, res) => {
    const printerId = parseInt(req.params.id);
    const { 
        serialNumber,
        manufacturer,
        model
    } = req.body;

    const response = await db.query(
        `UPDATE printers SET 
            serial_number = $1, 
            manufacturer = $2, 
            model = $3
        WHERE 
            id = $4`,
        [
            serialNumber, 
            manufacturer, 
            model,
            printerId
        ]
    );

    res.status(200).send({ message: "Printer updated successfully!" });
};

// Método responsável por DELETAR uma Impressora pelo seu ID
exports.deletePrinterById = async (req, res) => {
    const printerId = parseInt(req.params.id);
    await db.query(
        "DELETE FROM printers WHERE id = $1",
        [printerId]
    );

    res.status(200).send({ message: 'Printer deleted successfully!' });
};