import fs from 'node:fs';
import path from 'node:path';

// Creamos un archivo stream para escribir de forma continua
const logStream = fs.createWriteStream(path.resolve('./app-logs.txt'), { flags: 'a' });

// Obtenemos una marca de tiempo
const date = new Date().toISOString();
logStream.write(`\n--- INICIANDO SESIÓN: ${date} ---\n`);

// Interceptamos la salida estándar (mensajes normales)
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
process.stdout.write = (chunk, encoding, callback) => {
  logStream.write(chunk); // Lo escribimos en el archivo
  return originalStdoutWrite(chunk, encoding, callback); // Lo mostramos en la consola original
};

// Interceptamos la salida de errores (errores y warnings)
const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stderr.write = (chunk, encoding, callback) => {
  logStream.write(chunk); // Lo escribimos en el archivo
  return originalStderrWrite(chunk, encoding, callback); // Lo mostramos en la consola original
};
