/**
 * Arquivo: server.js
 * Descrição: arquivo responsável por inciar o servidor
 */

 const app = require('./src/app');

 const port = process.env.PORT || 3000;

 app.listen(port, () => {
   console.log('Aplicação executando na porta ', port);
 });